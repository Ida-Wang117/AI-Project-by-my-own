import * as zhContent from "./content.js";
import * as enContent from "./content.en.js";

export const languageKey = "todays-creature-language";

export function normalizeLanguage(value) {
  return value === "zh" || value === "en" ? value : null;
}

export function readLanguage({
  search = "",
  stored,
  browserLanguage = "en",
} = {}) {
  return (
    normalizeLanguage(new URLSearchParams(search).get("lang")) ||
    normalizeLanguage(stored) ||
    (String(browserLanguage).toLowerCase().startsWith("zh") ? "zh" : "en")
  );
}

export function getContent(language) {
  return language === "en" ? enContent : zhContent;
}

export function createShareUrl(href, language, roleId = null) {
  const url = new URL(href);
  url.search = "";
  url.hash = "";
  url.searchParams.set("lang", normalizeLanguage(language) || "en");
  if (roleId) url.searchParams.set("r", roleId);
  return url.href;
}

const english = {
  "状态已装盒。": "Your state is boxed up.",
  "里面装着近两周的你，附赠一句欠嘴点评。":
    "Your last two weeks, plus one mildly rude observation.",
  拆开看看: "Open my box",
  "按你的回答装盒。开盒只揭晓，不重新抽签。":
    "Packed from your answers. Opening reveals the match; it doesn't reroll it.",
  "今天就做这三步。": "Try these three small moves.",
  "为什么拆到这只？": "Why did I unbox this one?",
  今日物种: "Today's Creature",
  "今日物种 / INTERNAL USE": "TODAY'S CREATURE / INTERNAL USE",
  "今日物种 · 原创状态小测": "Today's Creature · An original status check-in",
  今日物种首页: "Today's Creature home",
  网站导航: "Site navigation",
  切换语言: "Switch language",
  关闭: "Close",
  状态档案: "Status files",
  办理流程: "How it works",
  报告使用说明: "About this report",
  登记我的状态: "Check my status",
  "先查一下后台。": "Check the background apps.",
  "别急着重装整个人生。": "No need to reinstall your life.",
  "今日物种是一份原创的生活状态小测，观察最近两周的精力、压力、方向感和支持感。它不会测出“真正的你”，也没有能力预测职业或诊断心理问题。":
    "Today's Creature is an original check-in about energy, pressure, direction and support over the last two weeks. It cannot uncover the ‘real you’, predict a career or diagnose a mental health condition.",
  "怎么匹配的？": "How does matching work?",
  "12 道题，每个维度 3 道，每个回答按 0–3 分映射。我们优先看高负荷和低余量，再看方向与支持，匹配 8 个状态角色。结果页会展示匹配理由。它是透明的规则匹配，还没有经过心理量表验证。":
    "12 questions, three per dimension, with each answer mapped to 0–3 points. Fixed rules consider high pressure and low reserves first, then direction and support, to match one of eight characters. Your report explains the match. These rules are transparent but have not been validated as a psychological scale.",
  "你的回答去哪儿了？": "Where do my answers go?",
  "答案只留在当前浏览器标签页，方便中途回来继续；不上传、不调用 AI、不需要登录。生成结果后即清除草稿。分享链接只包含角色编号和显示语言，不包含回答、身份或维度数据。只有语言偏好会保存在这台设备上。":
    "Your draft stays in this browser tab so you can return to it. No uploads, AI calls or sign-in. The draft is cleared once your report is ready. Shared links contain only a character ID and the display language, never your answers, life context or dimension scores. Only your language preference is remembered on this device.",
  "梗对准事情，不对准答题的人。": "We roast the workload, not the person.",
  "报告没写到的部分，不必自己补一份检讨。":
    "No need to add a self-criticism appendix.",
  "生活系统 · 非正式状态登记处": "LIFE SYSTEMS · UNOFFICIAL STATUS DESK",
  "人在。": "I'm here.",
  "状态不在。": "Brain isn't.",
  "先把「我没事」放旁边。": "Put ‘I'm fine’ on hold for a minute.",
  "12 道题，查查最近哪个后台在偷跑。":
    "12 questions. Find out what's running in your head.",
  "拆个状态盲盒，看看谁在加班。":
    "Unbox your current state. See who is still clocked in.",
  查一下我的后台: "Check my background apps",
  "约 3 分钟": "About 3 minutes",
  "无需登录，不交周报。": "No login. No weekly report.",
  "草稿没丢，继续上次的状态登记":
    "Your draft survived. Pick up where you left off",
  非绩效考核: "NOT A PERFORMANCE REVIEW",
  "学生 / 职场 / 家庭 / 创业 / 待定，都收。":
    "Students, workers, carers, founders, undecided: all welcome.",
  "复制网站链接，发给后台也很吵的人":
    "Copy the site link for someone with a noisy brain",
  脑内后台故障弹窗与荒诞办公室角色插画:
    "A glitchy task-manager window with deadpan office characters",
  后台会议未正常结束: "Background meeting failed to close",
  "甲方：生活": "Client: life",
  "诉求：再来一件事": "Request: one more thing",
  脑内仍在开会的加班角色: "An owl whose brain is still in a meeting",
  准备礼貌拒收新任务的角色: "A cactus politely refusing another task",
  "人已下班。脑子打卡了吗？": "You clocked out. Did your brain?",
  礼貌缓存不足: "Politeness buffer low",
  反刍刚才那句话: "Replay that one conversation",
  循环中: "On repeat",
  今晚想清楚整个人生: "Solve entire life tonight",
  建议延后: "Please postpone",
  "喝水，先下线": "Water. Then log off",
  可以执行: "Approved",
  "角色档案样例 · 非实时监测": "Sample file · Not live monitoring",
  "暂停不需要三个人审批。": "A pause doesn't need three approvals.",
  "人生后台，也该有个退出按钮。":
    "Even your background apps need a pause button.",
  "谁的后台，": "Who's still ",
  "还在上班？": "working in there?",
  "以下为状态嘴替。": "Characters that say it for you.",
  "请对号入座，暂不追究责任。": "Pick a seat. No blame assigned.",
  "8 份状态档案，按近两周的回答匹配。没有永久编制。":
    "8 status files, based on the last two weeks. No permanent contracts.",
  查看全部状态档案: "Browse all status files",
  "填的是近况。": "It's a check-in.",
  不用写成: "Skip the ",
  "述职报告。": "self-review.",
  "选你最近的真实反应。": "Go with how you've actually felt lately.",
  "「听起来比较像好人」的答案，这次不用。":
    "You can skip the answers that make you sound employable.",
  这份报告怎么生成的: "How this report is made",
  登记后台现状: "Check the background apps",
  "醒来还有多少电？闲下来脑子在干嘛？这里只问生活，不问你未来五年的战略布局。":
    "How much charge do you wake up with? What does your brain do on a break? We're asking about life, not your five-year strategic plan.",
  拆开状态盲盒: "Open your state box",
  "一只盲盒角色，一句欠嘴锐评，三步能动手的建议。":
    "One deadpan toy, one sharp roast and three small moves you can actually try.",
  关掉一个多余后台: "Close one extra background app",
  "不给人生开药方。比如今天少接一件事，或者别在凌晨两点给自己写差评。":
    "One small option: take on one less task, or stop writing your own one-star review at 2 a.m. No life overhaul required.",
  "人生这破系统，": "This buggy life system",
  "至少给个说明书吧。": "could use a manual.",
  "先登记。不用当场修好自己。": "Check in. Repairs are not due on arrival.",
  提交我的近况: "Check in with myself",
  暂时放下: "Pause for now",
  "已回答 {count} 道，共 12 道": "{count} of 12 questions answered",
  "最近的你，": "Which life department",
  "在哪个生活部门？": "are you in these days?",
  "选一个最接近的就好。身份不影响评分，只用来让话说得更贴近你。":
    "Choose the closest fit. This doesn't affect your score; it only labels your life department in the report.",
  "提交，看看后台": "Let's check the background apps",
  "按最近两周的真实感受回答。没有“应该”选的答案。":
    "Answer for the last two weeks. There are no ‘should’ answers.",
  "回答近两周就行。不要开始自我检讨。":
    "THE LAST TWO WEEKS. NO SELF-CRITICISM REQUIRED.",
  上一步: "Back",
  生成我的状态盲盒: "Make my state box",
  下一题: "Next",
  "登记完毕。接下来只讲状态，不评优秀员工。":
    "Check-in done. Up next: a status report, not Employee of the Month.",
  "答案只保留在当前标签页，不会上传。想改随时返回。":
    "Answers stay in this tab and aren't uploaded. Go back to change them anytime.",
  等待报告的临时窗口: "A duck at the temporary report desk",
  "正在整理后台记录。此处没有经理审批。":
    "SORTING BACKGROUND LOGS. NO MANAGER APPROVAL NEEDED.",
  "本人暂离。": "Be right back.",
  "报告马上回来。": "Report incoming.",
  "没有人生建议大会。只有一份近况报告。":
    "No life-advice summit. Just a check-in report.",
  测测我的状态: "Check my own status",
  重新登记: "Check in again",
  "这是朋友拆出的状态盲盒，不包含私人答案。你的盒子，得自己回答问题来拆。":
    "This is a shared state box, with no private answers. Answer the questions to open your own.",
  "有效期：近两周": "WINDOW: LAST 2 WEEKS",
  "仅作状态嘴替，不作绩效证明。":
    "A badge for how things feel. Not a performance certificate.",
  朋友拆出的是: "YOUR FRIEND UNBOXED",
  你拆到的是: "YOU UNBOXED",
  本窗口意见: "A note from this desk",
  "— 本窗口不提供人生 KPI": "— This desk does not issue life KPIs",
  "正在制卡…": "Making your card…",
  保存我的盲盒卡: "Save my box card",
  复制分享链接: "Copy share link",
  "不是凭空开嘴。": "There's a method to the roast.",
  "下面是匹配依据。": "Here's why you matched.",
  "这是回答的规则映射，不是专业量表。":
    "Rules mapped to your answers, not a validated clinical scale.",
  "条形只表示当前选择的倾向，没有好坏排名。":
    "Bars reflect your current selections. No good-or-bad ranking.",
  看看匹配怎么来的: "How the matching works",
  偏低: "Lower",
  居中: "Middle",
  偏高: "Higher",
  "临时处理方案：先少跑一个进程。":
    "Temporary workaround: run one less process.",
  "今日先别：": "Maybe skip this today: ",
  "{department}部门也不用一次处理所有工单。挑一个最便宜的小动作。":
    "{department}: you don't have to clear every ticket at once. Pick the smallest useful step.",
  "这个方案，已暂存": "Workaround saved for now",
  先暂存这个方案: "Keep this workaround",
  "报告到这里。别顺手给自己开个整改大会。":
    "End of report. Please don't schedule a self-improvement hearing.",
  "生活已经够爱开会了。": "Life already holds enough meetings.",
  "生活后台很吵。本窗口替你说两句。":
    "Life's background apps are loud. This desk speaks up for you.",
  "使用说明 · 隐私": "About · Privacy",
  原创状态小测: "An original status check-in",
  使用说明与隐私: "About and privacy",
  完整状态档案: "All status files",
  状态岗位档案: "Background-job files",
  "没有最佳员工。只有最近被生活安排的不同岗位。":
    "No best employee. Just different jobs life has handed out lately.",
  "档案预览 · 尚未登记你的回答": "FILE PREVIEW · NOT BASED ON YOUR ANSWERS",
  "网站链接已复制。后台吵的朋友可以来登记了。":
    "Site link copied. Invite a friend whose brain also has too many tabs.",
  "复制暂不可用，可以从地址栏复制网站地址。":
    "Copy isn't available here. You can copy the site address from the address bar.",
  "链接已复制。只分享物种，不分享你的回答。":
    "Link copied. It shares the character, not your answers.",
  "复制暂不可用，可以直接复制地址栏中的结果链接。":
    "Copy isn't available here. You can copy the result link from the address bar.",
  "盲盒卡已保存。别拿去当绩效证明。":
    "Box card saved. Please do not submit it as a performance review.",
  "盲盒卡导出失败，试试复制分享链接。":
    "The box card could not be saved. Try copying the share link instead.",
  "人在，状态不在。12 道题，拆一盒状态盲盒：短名字、欠嘴锐评、三步具体建议。梗对生活，不对你。":
    "12 questions. One original state box: a short name, a sharp roast and three concrete steps. We roast the workload, not you.",
};

export function translate(language, key, values = {}) {
  const text = language === "en" ? (english[key] ?? key) : key;
  return text.replace(/\{(\w+)\}/g, (match, name) => values[name] ?? match);
}
