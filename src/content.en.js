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
    name: "The 3AM Committee",
    en: "UNPAID NIGHT SHIFT",
    tagline: "You clocked out. Your brain booked another meeting.",
    roast: "An unpaid meeting with no agenda, no minutes, and somehow no exit.",
    description:
      "Your answers suggest a heavy workload and not much fuel left. Unfinished business can keep pulling up a chair when you're trying to rest.",
    comfort:
      "Tonight's unresolved stuff can go on paper, not on your pillow. Tomorrow's problems don't need an overnight shift.",
    tags: ["Brain overtime", "Low on fuel", "Request to adjourn"],
    tinyAction:
      "Write down the loudest unfinished thing and one first step for tomorrow. Put the note away; no extra agenda items for ten minutes.",
    statusCode: "MTG-003",
    systemNotice: "Meeting overran. Life is still adding agenda items.",
    doNot: "Replay every conversation from today in bed.",
    color: "#dce5ff",
  },
  {
    id: "jellyfish",
    name: "Low-Battery Human",
    en: "PLEASE CONNECT CHARGER",
    tagline: "Message received. Processing power currently unavailable.",
    roast: "Life keeps requesting full brightness in battery-saver mode.",
    description:
      "Your available energy is low, but tasks keep arriving. Even small jobs may feel expensive right now.",
    comfort:
      "A non-urgent task can wait, and so can a reply. Reading a message isn't signing a contract for instant responses.",
    tags: ["Battery saver", "Too many tabs", "Charger wanted"],
    tinyAction:
      "Pick one non-urgent task and move it to tomorrow. Use the ten minutes you free up to drink water, close your eyes, or sit quietly.",
    statusCode: "PWR-003",
    systemNotice: "Power-saving mode. Nagging does not create a charging port.",
    doNot: "Squeeze one 'while you're at it' into the charge you have left.",
    color: "#ffa788",
  },
  {
    id: "cactus",
    name: "Capacity-Full Cactus",
    en: "CAPACITY FULL, THANKS",
    tagline: "Message received. That's not a yes.",
    roast: "Life has mistaken your manners for an unlimited service plan.",
    description:
      "Your workload is high, with less room to speak freely or get backup. Requests keep arriving without checking what you can actually take on.",
    comfort:
      "'I can't take this on today' is a complete sentence. No three-page apology attachment required.",
    tags: ["Capacity full", "Polite refusal", "No queue-jumping"],
    tinyAction:
      "Try: 'I can do A today; B will have to wait until Friday.' Choose a deadline you can actually manage.",
    statusCode: "CAP-429",
    systemNotice: "Too many requests. Courtesy is not unlimited capacity.",
    doNot: "Say 'no problem' before checking how much of a problem it is.",
    color: "#d5fb66",
  },
  {
    id: "snail",
    name: "Recalculating Snail",
    en: "RECALCULATING, AGAIN",
    tagline: "Destination: TBD. Estimated arrival: please stop asking.",
    roast:
      "Your life GPS is still loading and already suggesting three detours.",
    description:
      "Your priorities, next step, or route feel less clear in these answers. With so many outside signals, it can be harder to hear your own.",
    comfort:
      "You don't owe anyone a final life plan today. Look up one question, not a stranger's entire CV; the tab bar is already crowded.",
    tags: ["Signal pending", "Route recalculating", "One question first"],
    tinyAction:
      "Write one specific question, such as 'What does this job actually involve?' Spend ten minutes finding one useful fact or asking one person.",
    statusCode: "GPS-404",
    systemNotice:
      "Destination unconfirmed. Your social feed is not a navigation app.",
    doNot:
      "Scrap your entire plan overnight after scrolling other people's updates.",
    color: "#f8e669",
  },
  {
    id: "potato",
    name: "Out-of-Office Potato",
    en: "CLOSED FOR MAINTENANCE",
    tagline: "Output paused. Please leave the potato undisturbed.",
    roast:
      "An empty slot appeared. Productivity culture immediately sent a calendar invite.",
    description:
      "The task load is relatively manageable, but your energy hasn't quite come back. There's a gap in the schedule that your body may want to keep empty.",
    comfort:
      "These fifteen minutes don't need a deliverable or an educational podcast. A break with a progress report is just overtime in sweatpants.",
    tags: ["Closed for now", "Gap reserved", "No deliverables"],
    tinyAction:
      "Keep fifteen minutes free of output: sit, take a short walk, or catch some daylight by a window. No messages on the side.",
    statusCode: "BRB-015",
    systemNotice:
      "Closed for maintenance. 'Just one quick favour' is still a request.",
    doNot: "Turn a break into a seminar on resting more efficiently.",
    color: "#f8e669",
  },
  {
    id: "cat",
    name: "Self-Service Cat",
    en: "SELF-SERVICE, AGAIN",
    tagline: "Asked for a human. Got transferred back to yourself.",
    roast: "Life put your request on hold and made you the hold music.",
    description:
      "You have some energy and room in the task queue, but less space to speak freely, lean on others, or relax. Getting backup can feel suspiciously like being sent to self-service.",
    comfort:
      "Make one request specific; if you've already said it, skip the eighth rewrite. A conversation takes two people, so you don't have to staff both desks.",
    tags: ["Less self-service", "Specific requests", "Backup wanted"],
    tinyAction:
      "Ask someone you feel reasonably safe with: 'Could you listen for ten minutes tonight, without jumping straight to advice?'",
    statusCode: "MSG-000",
    systemNotice:
      "Waiting for backup. Please do not transfer the request back to its sender.",
    doNot:
      "Add three pages of apologies because one request hasn't had a response yet.",
    color: "#dce5ff",
  },
  {
    id: "duck",
    name: "The Backup Duck",
    en: "ONE DUCK, MANY JOBS",
    tagline: "Above water: all good. Below water: industrial-speed paddling.",
    roast: "Life saw 'can cope' and quietly changed your plan to 'unlimited.'",
    description:
      "The task load is high, while energy, direction, or support still give you something to work with. Being able to cope can make the queue assume there's always room for more.",
    comfort:
      "One less task today won't knock the Earth off its axis. If you're responsible for keeping it spinning, at least invoice it for overtime.",
    tags: ["One duck, many hats", "Looks under control", "Stop auto-accepting"],
    tinyAction:
      "Circle just three priorities on today's list. Give the rest a later slot, and keep one gap where you won't take new requests.",
    statusCode: "JOB-008",
    systemNotice:
      "Queue too long. Competence is not an unlimited subscription.",
    doNot: "Volunteer at 'Anyone free?' before looking at your own schedule.",
    color: "#ffa788",
  },
  {
    id: "sprout",
    name: "Beta-Version Sprout",
    en: "STILL IN BETA",
    tagline: "Occasional glitches. Flawless operation not included.",
    roast: "Life keeps changing the brief and still demands a final version.",
    description:
      "Your answers don't put one particular combination in charge. Some parts may need tweaking; others are already giving you something to work with.",
    comfort:
      "A full-life overhaul can wait; keep one habit that already helps. Change every setting at once and nobody knows which button broke the printer.",
    tags: ["Mixed snapshot", "No fixed label", "One change at a time"],
    tinyAction:
      "Pick one small thing that's already useful: a walk, eating on time, or putting your phone down before bed. Keep just that one today.",
    statusCode: "VER-0.9",
    systemNotice:
      "Beta versions can fluctuate. Perfect-operation requests declined.",
    doNot: "Use one good day as a reason to load tomorrow with five new goals.",
    color: "#d5fb66",
  },
];
