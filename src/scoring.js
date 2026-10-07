import { questions, roles } from "./content.js";
import {
  questions as englishQuestions,
  roles as englishRoles,
} from "./content.en.js";

const dimensions = [
  { key: "energy", label: "精力余量", labelEn: "Energy reserves" },
  { key: "pressure", label: "压力负荷", labelEn: "Pressure load" },
  { key: "direction", label: "方向清晰", labelEn: "Direction clarity" },
  { key: "connection", label: "支持感", labelEn: "Sense of support" },
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
    reasonEn:
      "Your answers suggest a heavier load alongside lower energy reserves. That combination is the main reason for this match.",
    focus: ["pressure", "energy"],
  },
  {
    id: "cactus",
    matches: ({ pressure, connection }) => pressure >= 67 && connection <= 44,
    reason: "这次匹配主要看到了较高的事情负荷，以及暂时有限的支持感。",
    reasonEn:
      "This match mainly reflects a heavier load and a currently limited sense of support.",
    focus: ["pressure", "connection"],
  },
  {
    id: "jellyfish",
    matches: ({ energy, pressure }) => energy <= 33 && pressure > 33,
    reason: "精力余量偏少，而日常负荷还在；因此这次匹配到了人形低电量弹窗。",
    reasonEn:
      "Your energy reserves look low while everyday demands are still there, so this match puts recharging first.",
    focus: ["energy", "pressure"],
  },
  {
    id: "snail",
    matches: ({ direction }) => direction <= 33,
    reason:
      "关于优先级、下一步和自己的路线，你的回答里有较多不确定，这是这次匹配的主要依据。",
    reasonEn:
      "Your answers suggest uncertainty around priorities, next steps, or your own route. That is the main basis for this match.",
    focus: ["direction", "connection"],
  },
  {
    id: "potato",
    matches: ({ energy, pressure }) => energy <= 44 && pressure <= 44,
    reason:
      "精力还需要恢复，但当前事情的负荷相对可控，所以这次匹配到了暂停营业土豆。",
    reasonEn:
      "Your energy could use some recovery, while the current load looks relatively manageable. This match makes room for a slower pace.",
    focus: ["energy", "pressure"],
  },
  {
    id: "cat",
    matches: ({ energy, pressure, connection }) =>
      connection <= 44 && energy >= 56 && pressure <= 56,
    reason:
      "你还有一定精力，当前负荷也留着空间；支持感这部分更值得给自己留个位置。",
    reasonEn:
      "You have some energy available and a little room in your current load. Feeling supported is an area that deserves more space.",
    focus: ["connection", "energy"],
  },
  {
    id: "duck",
    matches: ({ pressure }) => pressure >= 56,
    reason:
      "事情的负荷仍然偏多，同时其他资源还留着抓手，因此这次匹配到了全自动兜底鸭。",
    reasonEn:
      "Your load is still fairly high, while other resources offer some footholds. This match reflects being busy with something to lean on.",
    focus: ["pressure", "direction"],
  },
  {
    id: "sprout",
    matches: () => true,
    reason:
      "暂时没有一个特定组合占据主场；这次会同时看看相对需要照顾的一项和已有的抓手。",
    reasonEn:
      "No particular combination takes centre stage right now. This match looks at both an area that could use care and a resource you already have.",
    focus: ["energy", "direction"],
  },
];

function explainDimension(key, value, language) {
  if (language === "en") {
    const explanations = {
      energy:
        value <= 44
          ? "Energy reserves: Taken together, these answers suggest limited available energy. Leaving yourself some extra recovery room may help."
          : "Energy reserves: Your answers suggest some energy is still available, with a little space for something beyond daily obligations.",
      pressure:
        value >= 56
          ? "Pressure load: Overall, your answers about tasks and changes suggest that demands are taking up quite a bit of mental space."
          : "Pressure load: Your answers suggest some room to adjust tasks and changes, so you can give your own pace a place in the plan.",
      direction:
        value <= 33
          ? "Direction clarity: These answers contain quite a bit of uncertainty. Narrowing things down to one small action could make the next step more concrete."
          : "Direction clarity: You have at least some clues about priorities and next steps. You can keep adjusting as you go.",
      connection:
        value <= 44
          ? "Sense of support: Speaking openly, asking for help, or feeling at ease around others may need a little more room right now."
          : "Sense of support: Your answers include relationships or moments where you can express needs and feel understood. Those connections are worth tending.",
    };
    return explanations[key];
  }

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

export function scoreAnswers(answers, language = "zh") {
  const locale = language === "en" ? "en" : "zh";
  const activeQuestions = locale === "en" ? englishQuestions : questions;
  const activeRoles = locale === "en" ? englishRoles : roles;

  if (!answers || typeof answers !== "object") {
    throw new TypeError(
      locale === "en"
        ? "Please answer all 12 questions first."
        : "请先回答全部 12 道题。",
    );
  }

  const totals = Object.fromEntries(dimensions.map(({ key }) => [key, 0]));
  const maxima = Object.fromEntries(dimensions.map(({ key }) => [key, 0]));

  activeQuestions.forEach((question, index) => {
    const choice = answers[index];
    if (
      !Object.prototype.hasOwnProperty.call(answers, index) ||
      !Number.isInteger(choice) ||
      choice < 0 ||
      choice >= question.options.length
    ) {
      throw new RangeError(
        locale === "en"
          ? `Question ${index + 1} needs a valid answer. Please choose one option.`
          : `第 ${index + 1} 道题还没有有效答案，请选择一个选项。`,
      );
    }
    totals[question.dimension] += question.options[choice].score;
    maxima[question.dimension] += Math.max(
      ...question.options.map(({ score }) => score),
    );
  });

  const metrics = dimensions.map(({ key, label, labelEn }) => ({
    key,
    label: locale === "en" ? labelEn : label,
    value: Math.round((totals[key] / maxima[key]) * 100),
  }));
  const values = Object.fromEntries(
    metrics.map(({ key, value }) => [key, value]),
  );
  const rule = roleRules.find(({ matches }) => matches(values));
  const role = activeRoles.find(({ id }) => id === rule.id);
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
      locale === "en" ? rule.reasonEn : rule.reason,
      ...focus.map((key) => explainDimension(key, values[key], locale)),
    ],
  };
}
