// 描述近两周的生活状态，不是人格类型或心理诊断。
// 每个维度各 3 题；同一道题的选项按对应维度从低到高排列。
export const questions = [
  {
    id: "energy-morning",
    title: "闹钟响了，你本人通常是什么开机状态？",
    aside: "最近两周的体感。闹钟只负责响，不负责供电。",
    dimension: "energy",
    options: [
      { text: "人醒了，电量坚持不来上班", score: 0 },
      { text: "能开机，先别给我弹消息", score: 1 },
      { text: "缓一缓，日常任务能运转", score: 2 },
      { text: "电量够用，开机基本不费劲", score: 3 },
    ],
  },
  {
    id: "pressure-tasks",
    title: "最近，待办事项是怎么往你这里投递的？",
    aside: "论文、订单、家务、工作，都算。人生不止一个甲方。",
    dimension: "pressure",
    options: [
      { text: "队伍不长，能按顺序处理", score: 0 },
      { text: "偶尔加塞，还能安排得过来", score: 1 },
      { text: "完成一项，自动续杯两项", score: 2 },
      { text: "全员加急，而且都想排第一", score: 3 },
    ],
  },
  {
    id: "direction-priority",
    title: "如果今天只能推进一件事，你选得出来吗？",
    aside: "不用回答十年规划。那份 PPT 今天不收。",
    dimension: "direction",
    options: [
      { text: "选不出，脑内目前没有导购", score: 0 },
      { text: "有几个候选，正在互相抢麦", score: 1 },
      { text: "大致知道，先后顺序还要捋", score: 2 },
      { text: "有明确的一件，也知道为什么", score: 3 },
    ],
  },
  {
    id: "connection-share",
    title: "快撑不住时，你能找谁讲真话？",
    aside: "那种不用自动补一句「哈哈我没事」的真话。",
    dimension: "connection",
    options: [
      { text: "暂时想不到能放心说的人", score: 0 },
      { text: "有人选，开口前得先打草稿", score: 1 },
      { text: "有一个人，聊完能松口气", score: 2 },
      { text: "有人愿意听，我也能放心讲", score: 3 },
    ],
  },
  {
    id: "energy-recovery",
    title: "忙完歇一会儿，电量有没有真的回来？",
    aside: "请查实际电量，不查「我都休息了应该好了吧」。",
    dimension: "energy",
    options: [
      { text: "歇过了，电量条还是装死", score: 0 },
      { text: "能回来一点，但充得很慢", score: 1 },
      { text: "好好歇一会儿，确实有用", score: 2 },
      { text: "找到合适的休息方式就能续航", score: 3 },
    ],
  },
  {
    id: "pressure-offline",
    title: "事情暂停了，脑子肯下班吗？",
    aside: "人已经离场，脑内群聊有没有继续 @ 全体成员？",
    dimension: "pressure",
    options: [
      { text: "大多肯，能安心干点别的", score: 0 },
      { text: "偶尔弹消息，能先放一边", score: 1 },
      { text: "经常回放，休息也惦记事情", score: 2 },
      { text: "一直开会，找不到散会按钮", score: 3 },
    ],
  },
  {
    id: "direction-step",
    title: "那件一直让你发愁的事，下一步是什么？",
    aside: "发一封邮件、查一条信息也算，不要求原地改变命运。",
    dimension: "direction",
    options: [
      { text: "一团毛线，暂时摸不到线头", score: 0 },
      { text: "知道大方向，第一步还很虚", score: 1 },
      { text: "能拆出一个小动作先试试", score: 2 },
      { text: "下一步清楚，也知道何时调整", score: 3 },
    ],
  },
  {
    id: "connection-needs",
    title: "想找人搭把手，或想先清静一下时，你通常？",
    aside: "「我需要」后面，有没有自动生成三段道歉？",
    dimension: "connection",
    options: [
      { text: "吞回去，怕给别人添麻烦", score: 0 },
      { text: "暗示一下，能否收到看缘分", score: 1 },
      { text: "能跟熟悉的人直说一部分", score: 2 },
      { text: "能讲清楚，也有人尊重我的需要", score: 3 },
    ],
  },
  {
    id: "energy-interest",
    title: "必须做的都做完后，你还剩多少电给自己？",
    aside: "瞎逛、听歌、发呆都算。爱好不需要先拿个证。",
    dimension: "energy",
    options: [
      { text: "基本见底，先把日常维持住", score: 0 },
      { text: "偶尔剩一点，只能搞轻松的", score: 1 },
      { text: "通常还能做一件喜欢的小事", score: 2 },
      { text: "有余电，能给兴趣留些时间", score: 3 },
    ],
  },
  {
    id: "pressure-change",
    title: "突然又来一件事，你的内心弹窗写着什么？",
    aside: "临时任务出现得很突然，礼貌也突然消失。",
    dimension: "pressure",
    options: [
      { text: "有点烦，但还有空间挪一挪", score: 0 },
      { text: "稍等，让我重新排一下队", score: 1 },
      { text: "又来？原来的已经很满了", score: 2 },
      { text: "容量已满，请勿重复投递", score: 3 },
    ],
  },
  {
    id: "direction-comparison",
    title: "刷到别人毕业、涨薪、赚到钱，你的路线会？",
    aside: "朋友圈是成果展，通常不附赠失败的后台日志。",
    dimension: "direction",
    options: [
      { text: "直接重算，怀疑自己全走错了", score: 0 },
      { text: "晃一阵，得花时间找回重点", score: 1 },
      { text: "酸一下，但还记得自己要什么", score: 2 },
      { text: "点赞或划走，原计划照常", score: 3 },
    ],
  },
  {
    id: "connection-space",
    title: "跟周围的人相处，能卸载多少「体面插件」？",
    aside: "家人、朋友、同学、同事，按最近的整体感觉选。",
    dimension: "connection",
    options: [
      { text: "基本卸不掉，一直得绷着", score: 0 },
      { text: "能客气相处，离放松还远点", score: 1 },
      { text: "有些时候能露出真实的自己", score: 2 },
      { text: "大多能放松，累了也能直说", score: 3 },
    ],
  },
];

export const contextOptions = [
  { id: "student", label: "在读 / 留学 · 作业追我", emoji: "🎒" },
  { id: "worker", label: "职场 · 消息追我", emoji: "💼" },
  { id: "caregiver", label: "照顾家庭 · 家务追我", emoji: "🏠" },
  { id: "founder", label: "创业 · 万事找我", emoji: "🚀" },
  { id: "explorer", label: "探索中 · 先别催我", emoji: "🧭" },
];

export const roles = [
  {
    id: "night-owl",
    name: "凌晨脑内开会机",
    en: "UNPAID NIGHT SHIFT",
    tagline: "本人已下班，大脑私自续了场。",
    roast: "这场脑内会议，没人发工资，还不让你散会。",
    description:
      "你的回答里，事情负荷偏高，精力已经不太够用。人想休息，没处理完的事却总来抢麦。",
    comfort:
      "今晚可以把没结论的事留在纸上，不用在枕头上答辩。明天再看，至少不用加付一晚睡眠费。",
    tags: ["脑内加班", "电量欠费", "散会申请"],
    tinyAction:
      "写下最吵的一件事和明天能做的第一步，合上纸，十分钟内不再补充会议材料。",
    statusCode: "MTG-003",
    systemNotice: "会议已超时，生活还在追加议题。",
    doNot: "今晚躺在床上重演今天的每一次对话。",
    color: "#dce5ff",
  },
  {
    id: "jellyfish",
    name: "人形低电量弹窗",
    en: "PLEASE CONNECT CHARGER",
    tagline: "消息已收到，本人暂不提供算力。",
    roast: "生活以为你接着电源，实际你只剩 3%。",
    description:
      "精力余量偏低，日常任务却还在持续派送。连小事都开始费电，再开几个后台可能就卡住了。",
    comfort:
      "今天可以省掉一件不急的事，回复也可以晚一点。收到消息不等于签下即时响应协议。",
    tags: ["省电运行", "后台太多", "禁止催电"],
    tinyAction:
      "挑一件不急的事，明确改到明天；把省下来的十分钟拿来喝水、闭眼或静坐。",
    statusCode: "PWR-003",
    systemNotice: "正在省电。再催也不会凭空长出充电口。",
    doNot: "在剩下的电量里硬塞一个「顺便」。",
    color: "#ffa788",
  },
  {
    id: "cactus",
    name: "礼貌拒收仙人掌",
    en: "CAPACITY FULL, THANKS",
    tagline: "收到归收到，同意是另一个按钮。",
    roast: "生活把你当万能插座，插满了还问怎么不通电。",
    description:
      "事情负荷偏高，能放心表达和借力的空间却有限。很多要求都往你这里来，你自己的容量反而没人问。",
    comfort:
      "「这件事我今天接不了」可以独立成句，不用附赠三页检讨。拒收一件任务，关系也不必当场进入年审。",
    tags: ["容量已满", "礼貌拒收", "停止加塞"],
    tinyAction:
      "对一件新增要求回复：「我今天能做 A，B 要到周五。」换成你确实承受得住的时间。",
    statusCode: "CAP-429",
    systemNotice: "请求过多，请勿将客气误读为无限容量。",
    doNot: "先说「没问题」，再一个人研究怎么有问题。",
    color: "#d5fb66",
  },
  {
    id: "snail",
    name: "人生导航加载中",
    en: "RECALCULATING, AGAIN",
    tagline: "目的地：再看看。途经：别人都好厉害。",
    roast: "人生导航一边加载，一边弹出「要不换条路？」。",
    description:
      "优先级、下一步或自己的路线，还没有足够清楚的线索。外面的进度很多，自己的目的地容易被挤到屏幕外。",
    comfort:
      "今天不用提交人生最终版。先查一个问题，别顺手查完别人二十年的履历；浏览器已经够多标签页了。",
    tags: ["信号待定", "路线重算", "先查一项"],
    tinyAction:
      "写下一个具体问题，比如「这份工作每天做什么」，花十分钟找一条信息或问一个人。",
    statusCode: "GPS-404",
    systemNotice: "目的地未确认，请勿把朋友圈设为导航。",
    doNot: "在刷完别人近况之后，连夜推翻自己全部计划。",
    color: "#f8e669",
  },
  {
    id: "potato",
    name: "暂停营业土豆",
    en: "CLOSED FOR MAINTENANCE",
    tagline: "今日暂停产出。别催，土豆也需要静置。",
    roast: "生活终于空出一点位置，脑子却想往里塞张待办。",
    description:
      "眼下的事情负荷相对可控，精力还没有完全回来。日程有空档，身体暂时想把它留空。",
    comfort:
      "这十五分钟可以没有成果，也不用拿来听知识播客。休息再配一张进步报表，多少有点挂羊头卖加班。",
    tags: ["暂停营业", "空档保留", "不交成果"],
    tinyAction:
      "留十五分钟不追求产出：坐着、走一小圈或靠窗晒会儿太阳，不顺手处理消息。",
    statusCode: "BRB-015",
    systemNotice: "维护期间暂停服务，不接「顺便帮一下」。",
    doNot: "把一段休息改造成「高效休息提升课程」。",
    color: "#f8e669",
  },
  {
    id: "cat",
    name: "自助客服当班猫",
    en: "SELF-SERVICE, AGAIN",
    tagline: "想转接个人工，接通了还是我。",
    roast: "生活的客服挺忙，轮到你的需求，就开始播放等待音乐。",
    description:
      "你还有一些精力，当前任务也留着空间，但放心表达、借力或放松还不太够。想借点力的时候，生活却常把你转去自助服务。",
    comfort:
      "今天把一个需要说具体，已经说过的就别重写八遍。能不能接住是两个人的事，别一个人包办客服绩效。",
    tags: ["少点自助", "请求具体", "需要接应"],
    tinyAction:
      "找一个相对安心的人，发送一句具体请求，比如「今晚能听我说十分钟，先别给建议吗？」",
    statusCode: "MSG-000",
    systemNotice: "接应窗口待响应，请勿自动转回本人。",
    doNot: "一个请求暂时没人接，就给自己追加三页道歉和说明。",
    color: "#dce5ff",
  },
  {
    id: "duck",
    name: "全自动兜底鸭",
    en: "ONE DUCK, MANY JOBS",
    tagline: "水面：问题不大。水下：脚都抡冒烟了。",
    roast: "生活把你的「还能应付」擅自升级成了「无限供应」。",
    description:
      "任务负荷不低，精力、方向或支持还给你留着一些抓手。能继续撑住，也容易让新增任务误以为这里永远有空位。",
    comfort:
      "今天少接一件，也不会让地球停转。真要靠你一个人维持自转，地球至少应该先结清加班费。",
    tags: ["一鸭多用", "表面稳住", "停止自动接单"],
    tinyAction:
      "把今天的待办只圈出三件优先项，给其他事项写个延后时间，留一个不接单的空档。",
    statusCode: "JOB-008",
    systemNotice: "任务队列过长，请关闭「能者无限多劳」。",
    doNot: "听到「谁方便」就抢答，连自己的日程都不看。",
    color: "#ffa788",
  },
  {
    id: "sprout",
    name: "人间测试版绿植",
    en: "STILL IN BETA",
    tagline: "状态偶尔抽风，暂不提供完美运行承诺。",
    roast: "需求天天改，生活还好意思让你交最终版。",
    description:
      "这次回答是个混合状态，没有一种组合占据主场。有些部分够用，有些还要调整，暂时不必给自己盖一个永久章。",
    comfort:
      "今天保留一个对你确实有用的小习惯就行，暂时别打包升级整个人生。一次更新太多，回头连哪儿好使都找不着。",
    tags: ["混合状态", "暂不定型", "只改一处"],
    tinyAction:
      "挑一件已经有用的小事，散步、按时吃饭或睡前放下手机，今天只保留这一项。",
    statusCode: "VER-0.9",
    systemNotice: "测试版允许波动，暂不接受完美运行需求。",
    doNot: "因为今天状态不错，给明天额外塞满五项新目标。",
    color: "#d5fb66",
  },
];
