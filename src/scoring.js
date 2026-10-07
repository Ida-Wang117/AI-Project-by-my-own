import { questions, roles } from "./content.js";

const dimensions = [
  { key: "energy", label: "精力余量" },
  { key: "pressure", label: "压力负荷" },
  { key: "direction", label: "方向清晰" },
  { key: "connection", label: "支持感" },
];

// 这是一套透明的产品匹配规则，未经临床验证，不用于诊断。
// 每维 3 题、每题 0–3 分：总分 / 9 × 100，四舍五入。
// 压力越高表示负荷越大；其他维度越高表示该项资源越充足。
// 重叠时按下面顺序取第一个匹配项，优先照顾压力与精力的组合：
// 1. 脑内开会机：压力 >= 67，精力 <= 44。
// 2. 仙人掌：压力 >= 67，支持 <= 44。
// 3. 水母：精力 <= 33，压力 > 33（低压的低精力可匹配土豆）。
// 4. 蜗牛：方向 <= 33。
// 5. 土豆：精力 <= 44，压力 <= 44。
// 6. 小猫：支持 <= 44，精力 >= 56，压力 <= 56。
// 7. 小鸭：压力 >= 56。
// 8. 发芽：其余组合。每一种角色均存在可达的答案组合。
const roleRules = [
  {
    id: "night-owl",
    matches: ({ energy, pressure }) => pressure >= 67 && energy <= 44,
    reason:
      "你的回答里，事情的负荷偏高，精力余量偏少；这两项一起决定了这次匹配。",
    focus: ["pressure", "energy"],
  },
  {
    id: "cactus",
    matches: ({ pressure, connection }) => pressure >= 67 && connection <= 44,
    reason: "这次匹配主要看到了较高的事情负荷，以及暂时有限的支持感。",
    focus: ["pressure", "connection"],
  },
  {
    id: "jellyfish",
    matches: ({ energy, pressure }) => energy <= 33 && pressure > 33,
    reason: "精力余量偏少，而日常负荷还在；因此这次匹配到了人形低电量弹窗。",
    focus: ["energy", "pressure"],
  },
  {
    id: "snail",
    matches: ({ direction }) => direction <= 33,
    reason:
      "关于优先级、下一步和自己的路线，你的回答里有较多不确定，这是这次匹配的主要依据。",
    focus: ["direction", "connection"],
  },
  {
    id: "potato",
    matches: ({ energy, pressure }) => energy <= 44 && pressure <= 44,
    reason:
      "精力还需要恢复，但当前事情的负荷相对可控，所以这次匹配到了暂停营业土豆。",
    focus: ["energy", "pressure"],
  },
  {
    id: "cat",
    matches: ({ energy, pressure, connection }) =>
      connection <= 44 && energy >= 56 && pressure <= 56,
    reason:
      "你还有一定精力，当前负荷也留着空间；支持感这部分更值得给自己留个位置。",
    focus: ["connection", "energy"],
  },
  {
    id: "duck",
    matches: ({ pressure }) => pressure >= 56,
    reason:
      "事情的负荷仍然偏多，同时其他资源还留着抓手，因此这次匹配到了全自动兜底鸭。",
    focus: ["pressure", "direction"],
  },
  {
    id: "sprout",
    matches: () => true,
    reason:
      "暂时没有一个特定组合占据主场；这次会同时看看相对需要照顾的一项和已有的抓手。",
    focus: ["energy", "direction"],
  },
];

function explainDimension(key, value) {
  const explanations = {
    energy:
      value <= 44
        ? "精力余量：这组回答整体提示可用电量相对有限，最近可以为自己的续航多留一些缓冲。"
        : "精力余量：你的回答里仍有一些可用电量，可以给日常之外的小事留一点空间。",
    pressure:
      value >= 56
        ? "压力负荷：关于任务和变化的回答，整体提示事情占用了你不少心力。"
        : "压力负荷：最近的任务和变化整体还有调整空间，可以按自己的节奏安排。",
    direction:
      value <= 33
        ? "方向清晰：这组回答里有较多不确定，先缩小到一个可尝试的小动作会更具体。"
        : "方向清晰：你至少有一些关于重点和下一步的线索，可以继续边走边调整。",
    connection:
      value <= 44
        ? "支持感：放心表达、寻求帮助或在关系里放松，目前可能还需要更多空间。"
        : "支持感：你的回答里有能表达需要、获得理解的关系或时刻，可以继续照顾这些连接。",
  };
  return explanations[key];
}

export function scoreAnswers(answers) {
  if (!answers || typeof answers !== "object") {
    throw new TypeError("请先回答全部 12 道题。");
  }

  const totals = Object.fromEntries(dimensions.map(({ key }) => [key, 0]));
  const maxima = Object.fromEntries(dimensions.map(({ key }) => [key, 0]));

  questions.forEach((question, index) => {
    const choice = answers[index];
    if (
      !Object.prototype.hasOwnProperty.call(answers, index) ||
      !Number.isInteger(choice) ||
      choice < 0 ||
      choice >= question.options.length
    ) {
      throw new RangeError(
        `第 ${index + 1} 道题还没有有效答案，请选择一个选项。`,
      );
    }
    totals[question.dimension] += question.options[choice].score;
    maxima[question.dimension] += Math.max(
      ...question.options.map(({ score }) => score),
    );
  });

  const metrics = dimensions.map(({ key, label }) => ({
    key,
    label,
    value: Math.round((totals[key] / maxima[key]) * 100),
  }));
  const values = Object.fromEntries(
    metrics.map(({ key, value }) => [key, value]),
  );
  const rule = roleRules.find(({ matches }) => matches(values));
  const role = roles.find(({ id }) => id === rule.id);
  // 发芽是混合状态的兜底项，按这次回答选择解释维度。
  // 压力反向换算仅用于比较可用资源，不修改展示的压力负荷分数。
  const resourceRanking = dimensions
    .map(({ key }) => ({
      key,
      value: key === "pressure" ? 100 - values[key] : values[key],
    }))
    .sort((a, b) => a.value - b.value);
  const focus =
    rule.id === "sprout"
      ? [
          resourceRanking[0].key,
          resourceRanking[resourceRanking.length - 1].key,
        ]
      : rule.focus;

  return {
    role: { ...role, tags: [...role.tags] },
    metrics,
    evidence: [
      rule.reason,
      ...focus.map((key) => explainDimension(key, values[key])),
    ],
  };
}
