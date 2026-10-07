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
    name: "加班脑",
    en: "UNPAID NIGHT SHIFT",
    tagline: "本人下班，后台还想续杯。",
    roast: "生活把高负荷、低电量打包成「再坚持一下」。这免费续杯，谁替你点的？",
    description:
      "事情负荷偏高，精力余量偏少。眼下再加一个自律项目，只会继续占后台。",
    comfort:
      "暂存不会替你解决问题，但今晚可以先不继续解题。待办明天还在，睡眠没必要跟着垫账。",
    tags: ["脑内加班", "电量欠费", "散会申请"],
    tinyAction: "把脑内夜班移交给明天，限写三分钟。",
    actionDuration: "3 分钟",
    actionSteps: [
      {
        title: "只列一件",
        body: "计时60秒，只写最吵的一件事；写到一句就停，不复盘来龙去脉。",
      },
      {
        title: "给明天排一格",
        body: "用60秒填：「明天___点，我先做___。」只写10分钟内能开始的第一步。",
      },
      {
        title: "封存会议",
        body: "再用60秒设提醒，把纸翻面。新念头只回一句：「已登记，明天处理。」",
      },
    ],
    statusCode: "MTG-003",
    systemNotice: "续会申请驳回。没有新事实，就别加一场复盘。",
    doNot: "写好明天第一步后，今晚又开第三轮人生答辩。",
    color: "#dce5ff",
  },
  {
    id: "jellyfish",
    name: "漏电怪",
    en: "PLEASE CONNECT CHARGER",
    tagline: "别催更新，电量还在讨价还价。",
    roast: "生活按包月用你，电量却按每件事扣。这个资费，运营商看了都得拜师。",
    description:
      "精力余量偏低，任务还在持续派送。连小事都可能开始费电，先少开一个后台。",
    comfort:
      "延后一件非急事，会留下一点待办，不会清空生活。先少漏十分钟电，别再替休息附赠效率考核。",
    tags: ["省电运行", "后台太多", "禁止催电"],
    tinyAction: "关一个漏电口，只减一件事，再停十分钟。",
    actionDuration: "12 分钟",
    actionSteps: [
      {
        title: "挑个能等的",
        body: "用60秒找一件非急事：晚回消息、晚洗衣服都算；只选一件。",
      },
      {
        title: "明确改期",
        body: "再用60秒写新时间，或发：「我现在没空，___点前回复。」只用于非急事。",
      },
      {
        title: "停十分钟",
        body: "设10分钟倒计时，喝水或静坐；不顺手开消息。到点再决定要不要恢复。",
      },
    ],
    statusCode: "PWR-003",
    systemNotice: "省电期间禁止捆绑「顺便」。一个顺便，也是一个进程。",
    doNot: "刚延后一件事，立刻用另一件「小事」填上空档。",
    color: "#ffa788",
  },
  {
    id: "cactus",
    name: "拒收掌",
    en: "CAPACITY FULL, THANKS",
    tagline: "收到是回执，不是无限接单。",
    roast:
      "生活挺会做预算：你的时间免费，你的客气无限。超出的成本，全让你自己消化。",
    description:
      "事情负荷偏高，能表达或借力的空间有限。新增要求不能只靠你扩容来解决。",
    comfort:
      "拒绝可能让对方不爽，也可能需要再协商。那是分配问题，别默认用你加班把差额填平。",
    tags: ["容量已满", "礼貌拒收", "停止加塞"],
    tinyAction: "把能接的量说清楚，请加塞的人一起排优先级。",
    actionDuration: "3 分钟",
    actionSteps: [
      {
        title: "算实际容量",
        body: "用60秒看今天剩下的时间，写下还能接多少；0 件也算答案。",
      },
      {
        title: "给出可选项",
        body: "用60秒改句：「我能做A，B要到___；今天加B，就把A往后排。」",
      },
      {
        title: "别自动打折",
        body: "发出后停60秒，不追加「我尽量全做」。对方急，就请他选先做哪件。",
      },
    ],
    statusCode: "CAP-429",
    systemNotice: "新增任务请附带让位的旧任务。容量不支持靠客气扩容。",
    doNot: "一句「好的」先把档期卖光，再独自研究怎么赔付。",
    color: "#d5fb66",
  },
  {
    id: "snail",
    name: "迷路蜗",
    en: "RECALCULATING, AGAIN",
    tagline: "目的地未定，加速包先别推。",
    roast:
      "目的地还没选好，成功学已经开始卖加速包。路线没给你，年费倒是算得很清楚。",
    description:
      "关于重点、下一步或自己的路线，回答里有较多不确定。先处理一个信息缺口，比一次规划整个人生更具体。",
    comfort:
      "查到一条信息，未必就能定方向。今天先减少一个不知道，别一边查资料一边给整个人生判卷。",
    tags: ["信号待定", "路线重算", "先查一项"],
    tinyAction: "查一个会影响下一步的问题，十分钟到点关页。",
    actionDuration: "12 分钟",
    actionSteps: [
      {
        title: "把大题缩小",
        body: "用60秒把「怎么办」改成一个问题，如：「这个选择每周要花几小时？」",
      },
      {
        title: "只查一轮",
        body: "只开一个网页或只问一个人，最多10分钟；记一条可用信息，不开第二轮。",
      },
      {
        title: "写下缺口就停",
        body: "用60秒写「下一步___」或「还缺___」。没结论就保留问题，今天停在这里。",
      },
    ],
    statusCode: "GPS-404",
    systemNotice: "搜索权限暂限一题。禁止用十个人的进度替代一个问题的答案。",
    doNot: "资料还没查明白，先报一门「逆袭人生」速成课。",
    color: "#f8e669",
  },
  {
    id: "potato",
    name: "待机薯",
    en: "CLOSED FOR MAINTENANCE",
    tagline: "待机期间，不接受成果验收。",
    roast:
      "好不容易空出一格，待办又想来收租。休息还要交成果，谁给它批的营业执照？",
    description:
      "事情负荷相对可控，精力还没有完全回来。日程留下的空档，暂时可以不拿去换产出。",
    comfort:
      "十分钟后，事情可能还在，电量也未必立刻回来。先保住空档，别额外加一场「休息有没有用」的考核。",
    tags: ["暂停营业", "空档保留", "不交成果"],
    tinyAction: "给空档上锁，十分钟内不交成果。",
    actionDuration: "10 分钟",
    actionSteps: [
      {
        title: "开个空档",
        body: "用30秒设10分钟闹钟，选坐着、靠窗或走一小圈；只挑一种。",
      },
      {
        title: "挡住加塞",
        body: "需要时说：「我十分钟后回来，这件事到时候再看。」不打开学习材料。",
      },
      {
        title: "到点不加考核",
        body: "闹钟响就结束。不打分、不补心得；想继续休息，就明确再留5分钟。",
      },
    ],
    statusCode: "BRB-015",
    systemNotice: "本空档不招商，不接效率课，不接受成果评审。",
    doNot: "一边休息，一边点开《如何高效休息》给自己布置作业。",
    color: "#f8e669",
  },
  {
    id: "cat",
    name: "自助喵",
    en: "SELF-SERVICE, AGAIN",
    tagline: "想转人工，接通了还是我。",
    roast:
      "你的需求刚排到窗口，生活就挂上「请自助」。系统挺先进，人工始终由你兼任。",
    description:
      "还有一些精力和任务空间，但放心表达、借力或放松的空间偏少。先让一个请求有明确的接收点。",
    comfort:
      "请求写得再漂亮，也不能保证对方有空或接得住。说清一次就够用，别把等回复变成三小时的自我答辩。",
    tags: ["少点自助", "请求具体", "需要接应"],
    tinyAction: "写一个有时限的具体请求，别包办两边的客服。",
    actionDuration: "2 分钟准备",
    actionSteps: [
      {
        title: "挑个接应点",
        body: "用60秒选一个相对安心的人；暂时没人选，就只写下请求，不强行发送。",
      },
      {
        title: "把请求说具体",
        body: "用60秒写：「今晚___点能听我说10分钟吗？先不用给建议。」只改时间。",
      },
      {
        title: "关掉等待页",
        body: "发送后30分钟不催、不重写。没发也到此为止；没人有空，就把请求留到明天。",
      },
    ],
    statusCode: "MSG-000",
    systemNotice: "等待接应不等于请求无效。禁止自动生成三页道歉附件。",
    doNot: "一个请求暂时没人接，就立刻给自己改判「不该麻烦人」。",
    color: "#dce5ff",
  },
  {
    id: "duck",
    name: "兜底鸭",
    en: "ONE DUCK, MANY JOBS",
    tagline: "表面稳住，水下脚已冒烟。",
    roast:
      "生活看你还能顶，就把下一份也摞上来。这里的「能者多劳」，熟练地漏掉了结账环节。",
    description:
      "任务负荷不低，精力、方向或支持还给你留着抓手。能应付，不代表今天还空着无限个位置。",
    comfort:
      "少接一件，可能得重新协调，也可能留下一点麻烦。那份麻烦别默认归你，接单之前先把交换条件摆出来。",
    tags: ["一鸭多用", "表面稳住", "停止自动接单"],
    tinyAction: "圈三件优先项，新任务要进来，就请旧任务让位。",
    actionDuration: "3 分钟准备",
    actionSteps: [
      {
        title: "只圈三件",
        body: "用60秒圈今天最多三件优先项；不够三件就别凑，剩下的写个延期时间。",
      },
      {
        title: "给加塞定价",
        body: "用60秒备一句：「今天加这件，就得延后___；你希望先做哪一个？」",
      },
      {
        title: "锁住一段空档",
        body: "用60秒圈一个15分钟空档，写「___点再看新请求」。到点前不顺手加第四件。",
      },
    ],
    statusCode: "JOB-008",
    systemNotice: "自动接单已停。新增一件，必须说明哪一件让位。",
    doNot: "听见「就你靠谱」就免费扩容，把自己的空档顺手送人。",
    color: "#ffa788",
  },
  {
    id: "sprout",
    name: "测试苗",
    en: "STILL IN BETA",
    tagline: "本苗测试中，完美需求请撤回。",
    roast:
      "人生系统天天改需求，还想让你一次交最终稿。说明书没更新，先把验收表递过来。",
    description:
      "这次没有一个特定组合占据主场。可以同时看看需要微调的一项，和已经好使的一项。",
    comfort:
      "没突出组合，就不必为了配合报告凭空找毛病。只动一处，没效果就别再加码，不开整个人生重装项目。",
    tags: ["混合状态", "暂不定型", "只改一处"],
    tinyAction: "只试一件小事，最多五分钟，做完就停。",
    actionDuration: "最多7分钟",
    actionSteps: [
      {
        title: "只挑一项",
        body: "用60秒选一个已经有用的小动作：喝水、走动、桌面清出一掌宽；只选一项。",
      },
      {
        title: "写好开始时间",
        body: "用60秒定：「今天___点，最多做5分钟。」不顺手增加第二个目标。",
      },
      {
        title: "五分钟就收工",
        body: "最多做5分钟，完成可提前停。没帮助就不再重复，不写反省、不再加码。",
      },
    ],
    statusCode: "VER-0.9",
    systemNotice: "单项试运行中。禁止把一天状态升级成永久标签。",
    doNot: "因为一时状态好，给明天加五条任务，还叫它「新的自己」。",
    color: "#d5fb66",
  },
];
