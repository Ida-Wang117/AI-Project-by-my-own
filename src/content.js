// 这里描述的是近两周的生活状态，不是人格类型或心理诊断。
// 每个维度各 3 题；同一道题的选项按对应维度从低到高排列。
export const questions = [
  {
    id: "energy-morning",
    title: "最近两周，早上醒来，你的电量大概是？",
    aside: "按真实体感选，闹钟没有投票权。",
    dimension: "energy",
    options: [
      { text: "刚开机就弹出低电量提醒", score: 0 },
      { text: "能启动，但先别打开太多程序", score: 1 },
      { text: "缓一缓，日常任务能跑起来", score: 2 },
      { text: "电量够用，还能顺手哼两句", score: 3 },
    ],
  },
  {
    id: "pressure-tasks",
    title: "最近两周，待办事项排队的架势是？",
    aside: "学习、工作、家务，都算人生后台进程。",
    dimension: "pressure",
    options: [
      { text: "队伍不长，基本能慢慢处理", score: 0 },
      { text: "偶尔插队，总体还能安排", score: 1 },
      { text: "刚送走一个，又来三个", score: 2 },
      { text: "像早高峰，每件事都说它急", score: 3 },
    ],
  },
  {
    id: "direction-priority",
    title: "如果问你「眼下什么最重要」，你会？",
    aside: "不用交人生五年计划，先看这一小段。",
    dimension: "direction",
    options: [
      { text: "脑内起雾，导航还在定位", score: 0 },
      { text: "有几个答案，但它们在抢麦", score: 1 },
      { text: "大致知道，只差排个先后", score: 2 },
      { text: "能说出一件，也知道为什么", score: 3 },
    ],
  },
  {
    id: "connection-share",
    title: "最近两周，有点撑不住时，你能找谁说说？",
    aside: "线上线下都算；一个人也能组成小后援团。",
    dimension: "connection",
    options: [
      { text: "暂时想不到能放心说的人", score: 0 },
      { text: "有些人，但开口前要打草稿", score: 1 },
      { text: "有一个人，聊完能松口气", score: 2 },
      { text: "有人接得住，也愿意听我说", score: 3 },
    ],
  },
  {
    id: "energy-recovery",
    title: "忙完一阵之后，你的回血速度怎样？",
    aside: "休息不是隐藏关卡，也是生活的一部分。",
    dimension: "energy",
    options: [
      { text: "休息了，电量还是不太回来", score: 0 },
      { text: "回血比较慢，需要多留点空", score: 1 },
      { text: "认真歇一会儿，能恢复一些", score: 2 },
      { text: "找到合适的休息方式就能续航", score: 3 },
    ],
  },
  {
    id: "pressure-offline",
    title: "空下来时，你脑内的「事情群聊」有多热闹？",
    aside: "群主是生活，暂时还不能把它踢出去。",
    dimension: "pressure",
    options: [
      { text: "大多安静，我能享受这会儿", score: 0 },
      { text: "偶尔冒个消息，能先放一边", score: 1 },
      { text: "经常响，放松也会惦记事情", score: 2 },
      { text: "一直开会，下线按钮不太灵", score: 3 },
    ],
  },
  {
    id: "direction-step",
    title: "面对一件让你发愁的事，你知道下一步吗？",
    aside: "小到发一封邮件、查一个信息，也算一步。",
    dimension: "direction",
    options: [
      { text: "像一团毛线，线头还没找到", score: 0 },
      { text: "知道大概方向，第一步有点虚", score: 1 },
      { text: "能拆出一个小动作，先试试看", score: 2 },
      { text: "下一步清楚，也知道何时调整", score: 3 },
    ],
  },
  {
    id: "connection-needs",
    title: "需要帮助或空间时，你通常能表达出来吗？",
    aside: "需求有声音，也允许先小声一点。",
    dimension: "connection",
    options: [
      { text: "经常吞回去，怕增加麻烦", score: 0 },
      { text: "会暗示一下，效果看缘分", score: 1 },
      { text: "能对熟悉的人说出一部分", score: 2 },
      { text: "能说清楚，也有人尊重我的需要", score: 3 },
    ],
  },
  {
    id: "energy-interest",
    title: "除了必须完成的事，你还剩多少力气给自己？",
    aside: "发呆、散步、追剧，也拥有合法席位。",
    dimension: "energy",
    options: [
      { text: "目前基本没有，先保住日常", score: 0 },
      { text: "偶尔有一点，得挑轻松的", score: 1 },
      { text: "通常还能做一件喜欢的小事", score: 2 },
      { text: "有余力，能给兴趣留些时间", score: 3 },
    ],
  },
  {
    id: "pressure-change",
    title: "计划突然被打乱时，最近的你更接近？",
    aside: "临时任务很会挑时间，礼貌值却常常为零。",
    dimension: "pressure",
    options: [
      { text: "有点烦，但有空间重新安排", score: 0 },
      { text: "需要缓一下，随后能处理", score: 1 },
      { text: "心里一紧，原本就排得挺满", score: 2 },
      { text: "这点变动就能让后台过载", score: 3 },
    ],
  },
  {
    id: "direction-comparison",
    title: "看到别人升职、毕业、赚钱或晒生活时，你会？",
    aside: "朋友圈通常只播预告片，正片各自保管。",
    dimension: "direction",
    options: [
      { text: "很容易怀疑自己的整条路线", score: 0 },
      { text: "会摇摆，得花时间找回节奏", score: 1 },
      { text: "会有点酸，但记得自己的重点", score: 2 },
      { text: "祝福或划走，继续走自己的路", score: 3 },
    ],
  },
  {
    id: "connection-space",
    title: "最近的日常相处，给你的感觉更像？",
    aside: "家人、同学、朋友、同事，选整体感受就好。",
    dimension: "connection",
    options: [
      { text: "经常得绷着，放松的空间很少", score: 0 },
      { text: "大多客气，但还不太能靠近", score: 1 },
      { text: "有些时刻能做自己、被理解", score: 2 },
      { text: "总体安心，累了也能被接住", score: 3 },
    ],
  },
];

export const contextOptions = [
  { id: "student", label: "在读 / 留学", emoji: "🎒" },
  { id: "worker", label: "职场打工", emoji: "💼" },
  { id: "caregiver", label: "照顾家庭", emoji: "🏠" },
  { id: "founder", label: "创业打怪", emoji: "🚀" },
  { id: "explorer", label: "探索下一步", emoji: "🧭" },
];

export const roles = [
  {
    id: "night-owl",
    name: "凌晨脑内放映员",
    en: "The Midnight Projectionist",
    tagline: "白天忙着赶进度，脑子晚上加映续集。",
    description:
      "最近事情的音量偏大，精力库存却偏低。白天往前赶，空下来还惦记没处理完的事，脑内影院很难准时散场。",
    comfort:
      "有些问题今晚没有答案也可以。把它暂存到明天，世界允许你先关灯；人脑没有凌晨 KPI。",
    tags: ["后台有点满", "需要缓冲", "先放过今晚"],
    tinyAction:
      "把最吵的一件事写下来，补上「明天先做什么」，然后把纸合上，留十分钟给休息。",
    color: "#e5def0",
  },
  {
    id: "jellyfish",
    name: "待充电水母",
    en: "The Recharging Jellyfish",
    tagline: "还在漂，已经很努力；插座麻烦往这边递。",
    description:
      "你的精力余量较少，日常任务又还在排队。现在连小事都可能需要更多力气，适合给生活调低一点运行速度。",
    comfort:
      "电量告急的时候，够用就很好。今天的你可以少完成一点，多保留一点给自己。",
    tags: ["电量见底", "轻量运行", "柔软续航"],
    tinyAction:
      "挑一件不急的事延后，给自己留十分钟，喝水、闭眼或安静坐着都可以。",
    color: "#e8dbe2",
  },
  {
    id: "cactus",
    name: "礼貌炸毛仙人掌",
    en: "The Polite Cactus",
    tagline: "嘴上「好的收到」，内心「请保持盆栽距离」。",
    description:
      "最近压力偏高，能安心借力的空间又有限。你可能需要应付很多要求，表达自己的需要却没那么容易，刺也跟着值班了。",
    comfort:
      "你也有自己的容量。温柔可以带着边界，一句「我现在接不住，晚一点再说」已经很有分量。",
    tags: ["负荷偏高", "需要支援", "边界也温柔"],
    tinyAction:
      "给一件新增要求设个小边界：说明能做到的部分，或提供一个自己承受得住的时间。",
    color: "#e1e8d5",
  },
  {
    id: "snail",
    name: "信号漂流小蜗牛",
    en: "The Wandering Snail",
    tagline: "人生导航：正在重新规划路线，请先吃口饭。",
    description:
      "你目前对优先级或下一步还不太确定，也容易被别人的进度带着走。方向信号有点弱，可以先把路线缩小到今天。",
    comfort:
      "人生这张地图还在加载。先试一小步，看看自己的反应；你的方向也可以从尝试里慢慢长出来。",
    tags: ["导航重算中", "小步试探", "允许绕点路"],
    tinyAction:
      "写下一个想了解的问题，用十分钟查一条信息或问一个人，只做这一步。",
    color: "#f0e2ca",
  },
  {
    id: "potato",
    name: "沙发回血土豆",
    en: "The Sofa Potato",
    tagline: "今日营业：躺着蓄力，皮肤管理靠晒太阳。",
    description:
      "眼下的压力相对可控，精力却还没完全回来。你的生活可能正好留出一点空档，适合慢慢恢复自己的节奏。",
    comfort:
      "这段空档可以归你。土豆在土里也有自己的进度，休息可以成为今天认真完成的一件事。",
    tags: ["低速回血", "空档珍贵", "休息有名分"],
    tinyAction:
      "安排一个不追求产出的十五分钟：散步、晒太阳，或安心躺着，把它留在日程里。",
    color: "#e9dfd1",
  },
  {
    id: "cat",
    name: "边界觉醒小猫",
    en: "The Boundary Cat",
    tagline: "可以贴贴，但我的时间表有猫爪认证。",
    description:
      "你还有一些精力，表达需要、获得支持这部分还留着空位。现在适合把自己的容量说得更清楚一点。",
    comfort:
      "你的需要值得有个位置。喜欢一个人、重视一段关系，也可以同时为自己留一块舒服的地盘。",
    tags: ["还有余力", "空间留给自己", "练习说需要"],
    tinyAction:
      "找一个相对安心的人，用一句具体的话表达需要，例如「今天能听我说十分钟吗？」",
    color: "#e5dcea",
  },
  {
    id: "duck",
    name: "表面淡定小鸭",
    en: "The Busy Duck",
    tagline: "水面优雅漂浮，脚下开着八倍速。",
    description:
      "你的任务负荷不低，精力、方向或支持还给你留着一些抓手。能继续往前，也容易把自己安排得太满。",
    comfort:
      "你已经在认真划水了。今天可以划掉一个非必要任务，让水面上的淡定也分一点给水面下的你。",
    tags: ["任务偏多", "仍有抓手", "留一点余量"],
    tinyAction: "把今天的待办缩成三个优先项，给剩下的事项写一个可延后的时间。",
    color: "#f3e8bc",
  },
  {
    id: "sprout",
    name: "慢慢发芽选手",
    en: "The Steady Sprout",
    tagline: "进度条不吵，但已经悄悄长出两片叶子。",
    description:
      "暂时没有一个特定组合占据主场。不同维度仍各有需要照顾的地方，适合先养稳一个小节奏，再看看它会长成什么样。",
    comfort:
      "小进展也有分量。今天留住一件让自己舒服的小事，就给明天多放了一点底气。",
    tags: ["节奏可调整", "小步积累", "继续照顾自己"],
    tinyAction:
      "选一个已经有效的小习惯，给它留五分钟，做完就算今天的一次小小成功。",
    color: "#dbe7d6",
  },
];
