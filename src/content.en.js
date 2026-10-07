// A snapshot of the past two weeks, not a personality type or a diagnosis.
// Three questions per dimension; options preserve the Chinese scoring order.
export const questions = [
  {
    id: "energy-morning",
    title: "The alarm goes off. How does your system usually boot up?",
    aside:
      "Think about the past two weeks. The alarm makes noise, not electricity.",
    dimension: "energy",
    options: [
      { text: "I'm awake. My battery didn't show up.", score: 0 },
      { text: "I can boot up. Please hold the notifications.", score: 1 },
      { text: "Give me a little time and I can get going.", score: 2 },
      { text: "Enough charge. Starting up is fairly easy.", score: 3 },
    ],
  },
  {
    id: "pressure-tasks",
    title: "How has life been delivering tasks lately?",
    aside: "Coursework, orders, chores, work: life has more than one manager.",
    dimension: "pressure",
    options: [
      { text: "A short queue. I can take things in order.", score: 0 },
      { text: "An occasional queue-jumper. Still manageable.", score: 1 },
      { text: "Finish one. Get two free. Terrible loyalty scheme.", score: 2 },
      { text: "Everything is urgent and wants to go first.", score: 3 },
    ],
  },
  {
    id: "direction-priority",
    title: "If you could move just one thing forward today, could you pick it?",
    aside: "No ten-year plan required. We aren't accepting slide decks today.",
    dimension: "direction",
    options: [
      { text: "I can't pick. Nobody's directing traffic in here.", score: 0 },
      { text: "A few candidates are fighting for the microphone.", score: 1 },
      { text: "I roughly know. The order needs some sorting.", score: 2 },
      { text: "I have one clear priority and know why it matters.", score: 3 },
    ],
  },
  {
    id: "connection-share",
    title: "When things get too much, who can you be honest with?",
    aside: "Without immediately adding 'lol, I'm fine though.'",
    dimension: "connection",
    options: [
      { text: "I can't think of someone I'd feel safe telling.", score: 0 },
      { text: "Someone comes to mind, but I'd need a draft first.", score: 1 },
      {
        text: "There's one person. Talking helps me breathe easier.",
        score: 2,
      },
      {
        text: "Someone will listen, and I feel able to speak freely.",
        score: 3,
      },
    ],
  },
  {
    id: "energy-recovery",
    title:
      "After a busy stretch, does a break actually bring your charge back?",
    aside: "Check the actual battery, not 'I rested, so surely I'm fine now.'",
    dimension: "energy",
    options: [
      { text: "I rested. The battery bar has declined to comment.", score: 0 },
      { text: "A little comes back, but charging is slow.", score: 1 },
      { text: "A proper break does make a difference.", score: 2 },
      { text: "The right kind of rest gets me going again.", score: 3 },
    ],
  },
  {
    id: "pressure-offline",
    title: "The tasks are on pause. Will your brain clock out?",
    aside:
      "You left the meeting. Is the group chat in your head still tagging everyone?",
    dimension: "pressure",
    options: [
      { text: "Mostly yes. I can enjoy doing something else.", score: 0 },
      { text: "A stray notification, but I can set it aside.", score: 1 },
      { text: "Frequent reruns. The tasks follow me into my break.", score: 2 },
      { text: "Meeting still running. No 'leave' button in sight.", score: 3 },
    ],
  },
  {
    id: "direction-step",
    title: "That thing you've been worrying about: do you know the next step?",
    aside:
      "An email or one useful fact counts. No overnight life transformation required.",
    dimension: "direction",
    options: [
      { text: "It's a knot. I haven't found an end to pull yet.", score: 0 },
      {
        text: "I know the broad direction. Step one is still vague.",
        score: 1,
      },
      { text: "I can pick one small thing to try first.", score: 2 },
      { text: "The next step is clear, including when to adjust.", score: 3 },
    ],
  },
  {
    id: "connection-needs",
    title: "When you need a hand, or a little space, what usually happens?",
    aside: "Does 'I need' automatically come with a three-paragraph apology?",
    dimension: "connection",
    options: [
      { text: "I keep it to myself. I worry about being a bother.", score: 0 },
      { text: "I drop a hint. Whether it lands is anyone's guess.", score: 1 },
      { text: "I can say some of it directly to people I know.", score: 2 },
      {
        text: "I can ask clearly, and someone respects the request.",
        score: 3,
      },
    ],
  },
  {
    id: "energy-interest",
    title: "After the must-do stuff, how much charge is left for you?",
    aside: "Wandering, music, doing nothing: hobbies don't need accreditation.",
    dimension: "energy",
    options: [
      {
        text: "Pretty much none. Keeping daily life going comes first.",
        score: 0,
      },
      { text: "A little sometimes. Low-effort activities only.", score: 1 },
      { text: "Usually enough for one small thing I enjoy.", score: 2 },
      {
        text: "Some spare charge. I can make time for my interests.",
        score: 3,
      },
    ],
  },
  {
    id: "pressure-change",
    title: "One more thing lands unexpectedly. What's your internal pop-up?",
    aside:
      "Surprise tasks arrive suddenly. Their manners disappear just as fast.",
    dimension: "pressure",
    options: [
      {
        text: "Annoying, but there's room to shuffle things around.",
        score: 0,
      },
      { text: "One moment. Let me rearrange the queue.", score: 1 },
      { text: "Another one? The schedule was already packed.", score: 2 },
      { text: "Capacity full. Please stop hitting 'send.'", score: 3 },
    ],
  },
  {
    id: "direction-comparison",
    title:
      "Someone posts a graduation, a pay rise, a big win. What happens to your plan?",
    aside: "The feed is a highlight reel. It rarely includes the error logs.",
    dimension: "direction",
    options: [
      { text: "Full reroute. I wonder if my whole plan is wrong.", score: 0 },
      { text: "I wobble and need time to find my focus again.", score: 1 },
      { text: "A little envy, but I remember what matters to me.", score: 2 },
      { text: "Like or scroll. My original plan stays put.", score: 3 },
    ],
  },
  {
    id: "connection-space",
    title: "How much of the 'I'm fine' act can you drop around other people?",
    aside:
      "Family, friends, classmates, colleagues: go with the overall picture lately.",
    dimension: "connection",
    options: [
      { text: "Hardly at all. I usually have to stay on guard.", score: 0 },
      { text: "We can be polite. Relaxed is still a long way off.", score: 1 },
      { text: "There are moments when I can be myself.", score: 2 },
      { text: "I can mostly relax and say when I'm tired.", score: 3 },
    ],
  },
];

export const contextOptions = [
  { id: "student", label: "Student / abroad · Due soon", emoji: "🎒" },
  { id: "worker", label: "Working · Inbox says hi", emoji: "💼" },
  { id: "caregiver", label: "Caring for family · On duty", emoji: "🏠" },
  { id: "founder", label: "Building a business · All hats", emoji: "🚀" },
  { id: "explorer", label: "Exploring · No rush, please", emoji: "🧭" },
];

export const roles = [
  {
    id: "night-owl",
    name: "Overtime Brain",
    en: "UNPAID NIGHT SHIFT",
    tagline: "You clocked out. The background apps ordered a refill.",
    roast:
      "Life bundles high pressure and low battery as 'just keep going.' Who ordered the unlimited refills?",
    description:
      "Your workload is high and your energy reserves are low. Another self-improvement project would add to the queue.",
    comfort:
      "Parking a problem won't solve it, but you can stop working on it tonight. The task can wait without taking your sleep as a deposit.",
    tags: ["Brain overtime", "Low on fuel", "Request to adjourn"],
    tinyAction:
      "Hand one noisy task over to tomorrow. Three minutes, one note.",
    actionDuration: "3 min",
    actionSteps: [
      {
        title: "Name one thing",
        body: "Take 60 seconds to write the loudest unfinished task in one sentence. Stop there; no full backstory.",
      },
      {
        title: "Give tomorrow a slot",
        body: "Take 60 seconds to fill in: 'Tomorrow at ___, I'll start with ___.' Pick a first step you can begin within ten minutes.",
      },
      {
        title: "Close the meeting",
        body: "Use 60 seconds to set a reminder and turn the note over. New thought? 'Logged. Tomorrow's shift.'",
      },
    ],
    statusCode: "MTG-003",
    systemNotice: "Extension denied. No new facts, no extra debrief.",
    doNot:
      "Finish tomorrow's first-step note, then hold a third life-review meeting tonight.",
    color: "#dce5ff",
  },
  {
    id: "jellyfish",
    name: "Leaky Battery",
    en: "PLEASE CONNECT CHARGER",
    tagline: "Updates paused. The battery is still negotiating.",
    roast:
      "Life wants unlimited service while charging your battery per task. Even a phone company would take notes.",
    description:
      "Your energy reserves are low, but the deliveries keep coming. Even small tasks may be expensive right now.",
    comfort:
      "Moving one non-urgent task leaves a task for later; it won't empty the whole queue. Take ten minutes without adding a rest-efficiency review.",
    tags: ["Battery saver", "Too many tabs", "Charger wanted"],
    tinyAction: "Stop one energy leak, then take ten minutes off.",
    actionDuration: "12 min",
    actionSteps: [
      {
        title: "Find one that can wait",
        body: "Take 60 seconds to pick one non-urgent task: a reply or laundry, for example. Just one.",
      },
      {
        title: "Give it a new time",
        body: "Use 60 seconds to reschedule, or send: 'I'm tied up now; I'll reply by ___.' Only for a non-urgent request.",
      },
      {
        title: "Pause for ten",
        body: "Set a ten-minute timer. Drink water or sit quietly, without checking messages. Decide whether to resume when it rings.",
      },
    ],
    statusCode: "PWR-003",
    systemNotice:
      "No bundled 'while you're at it.' That's another process, not a free extra.",
    doNot:
      "Move one task out of the gap, then fill it with a different 'tiny' task.",
    color: "#ffa788",
  },
  {
    id: "cactus",
    name: "Nope Cactus",
    en: "CAPACITY FULL, THANKS",
    tagline: "Received is a receipt, not a blank cheque.",
    roast:
      "Life's budget assumes your time is free and your manners are unlimited. All overruns come out of your pocket.",
    description:
      "Your task load is high, with less room to speak freely or get backup. New requests need more than an upgrade to your capacity.",
    comfort:
      "A refusal might annoy someone or need another conversation. That's a scheduling cost, not an automatic claim on your overtime.",
    tags: ["Capacity full", "Polite refusal", "No queue-jumping"],
    tinyAction:
      "State what fits, then ask the requester to choose what goes first.",
    actionDuration: "3 min",
    actionSteps: [
      {
        title: "Count the actual room",
        body: "Take 60 seconds to check today's remaining time. Write how much more fits. Zero is an option.",
      },
      {
        title: "Offer a trade-off",
        body: "Use 60 seconds to draft: 'I can do A; B waits until ___. If B is needed today, A moves back.'",
      },
      {
        title: "Hold the price",
        body: "After sending, pause for 60 seconds. No 'I'll try to do it all.' If it's urgent, ask which task should go first.",
      },
    ],
    statusCode: "CAP-429",
    systemNotice:
      "New requests must name the task they displace. Courtesy does not create capacity.",
    doNot:
      "Say 'sure' and sell out your schedule before working out how to cover the cost.",
    color: "#d5fb66",
  },
  {
    id: "snail",
    name: "Lost Snail",
    en: "RECALCULATING, AGAIN",
    tagline: "Destination pending. Please stop selling speed upgrades.",
    roast:
      "Destination unconfirmed, but the success industry is already selling the fast lane. No route, just an annual fee.",
    description:
      "Your answers suggest uncertainty about priorities, the next step, or your own route. Start with one missing piece of information.",
    comfort:
      "One useful fact may not settle the whole direction. Reduce one unknown today, without turning the search into a verdict on your life.",
    tags: ["Signal pending", "Route recalculating", "One question first"],
    tinyAction:
      "Research one question that affects the next step. Ten minutes, then close the page.",
    actionDuration: "12 min",
    actionSteps: [
      {
        title: "Shrink the question",
        body: "Use 60 seconds to replace 'What do I do?' with one question, such as 'How many hours a week would this take?'",
      },
      {
        title: "One search only",
        body: "Open one page or ask one person. Spend at most ten minutes and note one useful fact. No second round.",
      },
      {
        title: "Name the gap and stop",
        body: "Use 60 seconds to write 'Next step: ___' or 'Still missing: ___.' No conclusion? Keep the question and stop for today.",
      },
    ],
    statusCode: "GPS-404",
    systemNotice:
      "Search access limited to one question. Ten people's milestones are not an answer.",
    doNot:
      "Buy a 'reinvent your life' crash course before checking the actual facts.",
    color: "#f8e669",
  },
  {
    id: "potato",
    name: "Standby Spud",
    en: "CLOSED FOR MAINTENANCE",
    tagline: "Standby mode. No deliverables accepted.",
    roast:
      "A gap opens in your day and the to-do list wants rent. Since when did taking a break need a business licence?",
    description:
      "The task load is relatively manageable, but your energy hasn't fully returned. An open slot doesn't have to become more output.",
    comfort:
      "The tasks may still be there in ten minutes, and you may not feel recharged yet. Keep the gap without adding a performance review for your break.",
    tags: ["Closed for now", "Gap reserved", "No deliverables"],
    tinyAction: "Lock the gap. No deliverables for ten minutes.",
    actionDuration: "10 min",
    actionSteps: [
      {
        title: "Open a gap",
        body: "Take 30 seconds to set a ten-minute timer. Choose sitting, a window seat, or a short walk. Pick one.",
      },
      {
        title: "Block the extras",
        body: "If needed: 'I'll be back in ten minutes; I'll look at this then.' Leave the learning materials closed.",
      },
      {
        title: "Skip the review",
        body: "Stop when the timer rings. No rating or reflection essay. Want more rest? Explicitly set aside five more minutes.",
      },
    ],
    statusCode: "BRB-015",
    systemNotice:
      "This gap is not for lease. No productivity courses or performance reviews.",
    doNot:
      "Start a 'how to rest efficiently' tutorial and give yourself homework during the break.",
    color: "#f8e669",
  },
  {
    id: "cat",
    name: "Self-Service Cat",
    en: "SELF-SERVICE, AGAIN",
    tagline: "Transferred to a human. Somehow, it's still you.",
    roast:
      "Your request reaches the desk and life flips the sign to 'self-service.' Advanced system. Same unpaid operator.",
    description:
      "You have some energy and room in the queue, but less space to speak freely, get backup, or relax. Give one request a clear destination.",
    comfort:
      "A polished request can't make someone available or able to help. Say it clearly once; don't turn waiting for a reply into a three-hour defence hearing.",
    tags: ["Less self-service", "Specific requests", "Backup wanted"],
    tinyAction:
      "Write one specific, time-limited request. You don't have to staff both desks.",
    actionDuration: "2 min to set up",
    actionSteps: [
      {
        title: "Choose a contact",
        body: "Take 60 seconds to choose someone you feel fairly safe with. No one comes to mind? Just write the request; no need to send it.",
      },
      {
        title: "Make the ask specific",
        body: "Use 60 seconds: 'Could you listen for ten minutes tonight at ___? No advice needed yet.' Just change the time.",
      },
      {
        title: "Close the waiting tab",
        body: "If sent, don't chase or rewrite for 30 minutes. If unsent, stop here too. Nobody available? Keep it for tomorrow.",
      },
    ],
    statusCode: "MSG-000",
    systemNotice:
      "Awaiting backup is not an invalid request. Three-page apology attachments disabled.",
    doNot:
      "Treat one unanswered request as proof that you shouldn't ask for help.",
    color: "#dce5ff",
  },
  {
    id: "duck",
    name: "Backup Duck",
    en: "ONE DUCK, MANY JOBS",
    tagline: "Looks calm. Paddling at industrial speed.",
    roast:
      "Life sees you can cope, so it stacks another task on top. Funny how 'more responsibility' keeps forgetting the checkout.",
    description:
      "The task load is high, with some energy, direction, or support still available. Being able to cope doesn't create unlimited slots today.",
    comfort:
      "One less task may mean reshuffling or leaving something awkward. That cost isn't automatically yours; state the trade-off before taking it on.",
    tags: ["One duck, many hats", "Looks under control", "Stop auto-accepting"],
    tinyAction: "Circle three priorities. A new task needs an old one to move.",
    actionDuration: "3 min to set up",
    actionSteps: [
      {
        title: "Circle no more than three",
        body: "Use 60 seconds to circle up to three priorities. Don't invent a third. Give everything else a later time.",
      },
      {
        title: "Price the extra",
        body: "Use 60 seconds to prepare: 'Adding this today means ___ moves back. Which would you like first?'",
      },
      {
        title: "Lock one gap",
        body: "Use 60 seconds to reserve 15 minutes: 'New requests: I'll check at ___.' Don't sneak in a fourth task before then.",
      },
    ],
    statusCode: "JOB-008",
    systemNotice:
      "Auto-accept off. Every new task must name the one moving out.",
    doNot:
      "Let 'you're so reliable' buy unlimited capacity and take your break for free.",
    color: "#ffa788",
  },
  {
    id: "sprout",
    name: "Beta Sprout",
    en: "STILL IN BETA",
    tagline: "Still in testing. Perfect-operation requests declined.",
    roast:
      "Life changes the requirements daily, then demands a final draft. The manual is outdated; the inspection form is ready.",
    description:
      "No particular combination dominates this snapshot. Look at one area that could use a tweak alongside one that's already working.",
    comfort:
      "No standout pattern means no need to invent a flaw for the report. Change one thing; if it does not help, do not repeat it. No full-life reinstall.",
    tags: ["Mixed snapshot", "No fixed label", "One change at a time"],
    tinyAction: "Try one small thing for up to five minutes. Stop when done.",
    actionDuration: "Up to 7 min",
    actionSteps: [
      {
        title: "Pick just one",
        body: "Use 60 seconds to pick something already useful: water, a walk, or clearing a hand-sized patch of desk. Just one.",
      },
      {
        title: "Set a start time",
        body: "Use 60 seconds to write: 'Today at ___, I'll do this for up to five minutes.' Don't add a second goal.",
      },
      {
        title: "Clock out at five",
        body: "Try it for up to five minutes; stop sooner if finished. If it doesn't help, don't repeat it. No self-review or extra round.",
      },
    ],
    statusCode: "VER-0.9",
    systemNotice:
      "One change under test. Do not turn one day's status into a permanent label.",
    doNot:
      "Use one good moment to give tomorrow five new tasks and call it 'the new me.'",
    color: "#d5fb66",
  },
];
