/* =========================================================================
 *  EDIT EVERYTHING HERE.
 *  This single file controls the entire experience: names, photos, videos,
 *  songs, memories, quiz, letter, voice note, reward and final message.
 *
 *  MEDIA:
 *    Put photos in       public/images/     -> reference as "/images/name.jpg"
 *    Put videos in       public/videos/     -> reference as "/videos/name.mp4"
 *    Put audio in        public/music/      -> reference as "/music/our-song.mp3"
 *  Missing files degrade gracefully (an elegant placeholder is shown instead).
 * ========================================================================= */

export type Photo = {
  src: string;
  caption?: string;
  date?: string;
  location?: string;
  description?: string;
  /** "tall" | "wide" | "square" | "hero" — controls the collage shape */
  shape?: "tall" | "wide" | "square" | "hero";
  /** subtle tilt in degrees, e.g. -3 or 2 */
  tilt?: number;
  polaroid?: boolean;
};

export type Memory = {
  id: string;
  type: string;
  title: string;
  date: string;
  description: string;
  image?: string;
  video?: string;
  song?: string;
  icon?: string;
  /** position on the constellation, -100..100 (x) and -100..100 (y) */
  x: number;
  y: number;
};

export type FirstMoment = {
  title: string;
  date?: string;
  story: string;
  image?: string;
  video?: string;
};

export type Song = {
  title: string;
  artist: string;
  note: string;
  link?: string;
  preview?: string;
};

export type QuizQuestion = {
  question: string;
  image?: string;
  options: string[];
  answerIndex: number;
  /** optional line shown after answering */
  afterNote?: string;
};

export type VideoItem = {
  src: string;
  title: string;
  caption?: string;
  poster?: string;
};

export type HiddenSurprise = {
  /** where the star floats, in % of the section it lives in */
  label: string;
  message: string;
  image?: string;
  audio?: string;
  video?: string;
};

export const CONFIG = {
  /* ---------------------------------------------------------------- BASICS */
  herName: "[HER NAME]",
  birthdayMessage: "Happy Birthday, [HER NAME]",

  /* --------------------------------------------------------------- OPENING */
  opening: {
    line1: "For You.",
    line2: "Because a simple Happy Birthday\nwasn't enough.",
    button: "Enter our little universe",
  },

  /* --------------------------------------------------------------- CHAPTER 1 */
  why: {
    title: "Why I made this",
    paragraphs: [
      "[WRITE WHY YOU MADE THIS — a few honest lines.]",
      "[SECOND PARAGRAPH — what she means to you, in your own words.]",
    ],
  },

  /* --------------------------------------------------------------- CHAPTER 2 */
  reveal: {
    line1: "Today isn't just another day.",
    line2: "It's your day.",
    line3: "Happy Birthday, [HER NAME]",
  },

  /* --------------------------------------------------------- CHAPTER 3 PHOTOS */
  photos: [
    { src: "/images/photo1.jpg", caption: "[CAPTION]", date: "[DATE]", location: "[PLACE]", description: "[MEMORY DESCRIPTION]", shape: "hero", tilt: 0 },
    { src: "/images/photo2.jpg", caption: "[CAPTION]", date: "[DATE]", shape: "tall", tilt: -3, polaroid: true },
    { src: "/images/photo3.jpg", caption: "[CAPTION]", date: "[DATE]", shape: "square", tilt: 2 },
    { src: "/images/photo4.jpg", caption: "[CAPTION]", date: "[DATE]", shape: "wide" },
    { src: "/images/photo5.jpg", caption: "[CAPTION]", date: "[DATE]", shape: "tall", tilt: 3 },
    { src: "/images/photo6.jpg", caption: "[CAPTION]", date: "[DATE]", shape: "square", tilt: -2, polaroid: true },
    { src: "/images/photo7.jpg", caption: "[CAPTION]", date: "[DATE]", shape: "wide" },
    { src: "/images/photo8.jpg", caption: "[CAPTION]", date: "[DATE]", shape: "tall" },
    { src: "/images/photo9.jpg", caption: "[CAPTION]", date: "[DATE]", shape: "square", tilt: 2 },
    { src: "/images/photo10.jpg", caption: "[CAPTION]", date: "[DATE]", shape: "hero" },
    { src: "/images/photo11.jpg", caption: "[CAPTION]", date: "[DATE]", shape: "square", tilt: -3, polaroid: true },
    { src: "/images/photo12.jpg", caption: "[CAPTION]", date: "[DATE]", shape: "tall" },
    // ...keep adding, 20–30 photos look best.
  ] as Photo[],

  /* ----------------------------------------------------- CHAPTER 4 MEMORY MAP */
  memories: [
    { id: "meet", type: "FIRST MEET", title: "[TITLE]", date: "[DATE]", description: "[MEMORY DESCRIPTION]", image: "/images/first-meet.jpg", icon: "✦", x: -62, y: -38 },
    { id: "talk", type: "FIRST TALK", title: "[TITLE]", date: "[DATE]", description: "[MEMORY DESCRIPTION]", image: "/images/first-talk.jpg", icon: "✧", x: -24, y: -66 },
    { id: "hug", type: "FIRST HUG", title: "[TITLE]", date: "[DATE]", description: "[MEMORY DESCRIPTION]", image: "/images/first-hug.jpg", icon: "❤", x: 22, y: -58 },
    { id: "photo", type: "FIRST PHOTO", title: "[TITLE]", date: "[DATE]", description: "[MEMORY DESCRIPTION]", image: "/images/first-photo.jpg", icon: "◎", x: 60, y: -34 },
    { id: "date", type: "FIRST DATE", title: "[TITLE]", date: "[DATE]", description: "[MEMORY DESCRIPTION]", icon: "✦", x: 78, y: 6 },
    { id: "call", type: "FIRST CALL", title: "[TITLE]", date: "[DATE]", description: "[MEMORY DESCRIPTION]", icon: "☾", x: 56, y: 44 },
    { id: "laugh", type: "FIRST LAUGH", title: "[TITLE]", date: "[DATE]", description: "[MEMORY DESCRIPTION]", icon: "✧", x: 18, y: 66 },
    { id: "trip", type: "FIRST TRIP", title: "[TITLE]", date: "[DATE]", description: "[MEMORY DESCRIPTION]", icon: "✈", x: -26, y: 62 },
    { id: "gift", type: "FIRST GIFT", title: "[TITLE]", date: "[DATE]", description: "[MEMORY DESCRIPTION]", icon: "✦", x: -64, y: 34 },
    { id: "favorite", type: "FAVORITE MEMORY", title: "[TITLE]", date: "[DATE]", description: "[MEMORY DESCRIPTION]", icon: "★", x: -80, y: -4 },
    { id: "funniest", type: "FUNNIEST MOMENT", title: "[TITLE]", date: "[DATE]", description: "[MEMORY DESCRIPTION]", icon: "✧", x: -8, y: -22 },
    { id: "random", type: "MOST RANDOM MOMENT", title: "[TITLE]", date: "[DATE]", description: "[MEMORY DESCRIPTION]", icon: "✦", x: 34, y: 18 },
    { id: "never-forget", type: "A MOMENT I NEVER WANT TO FORGET", title: "[TITLE]", date: "[DATE]", description: "[MEMORY DESCRIPTION]", icon: "❤", x: -34, y: 14 },
    { id: "today", type: "TODAY", title: "[TITLE]", date: "[DATE]", description: "[MEMORY DESCRIPTION]", icon: "☀", x: 6, y: 40 },
  ] as Memory[],

  /* ------------------------------------------------------- CHAPTER 5 FIRSTS */
  firsts: [
    { title: "Our First Meet", date: "[DATE]", story: "[STORY]", image: "/images/first-meet.jpg" },
    { title: "Our First Conversation", date: "[DATE]", story: "[STORY]" },
    { title: "Our First Hug", date: "[DATE]", story: "[STORY]" },
    { title: "Our First Photo", date: "[DATE]", story: "[STORY]", image: "/images/first-photo.jpg" },
    { title: "Our First Call", date: "[DATE]", story: "[STORY]" },
    { title: "Our First Date", date: "[DATE]", story: "[STORY]" },
    { title: "Our First Trip", date: "[DATE]", story: "[STORY]" },
    { title: "Our First Gift", date: "[DATE]", story: "[STORY]" },
    { title: 'Our First "I Love You"', date: "[DATE]", story: "[STORY]" },
  ] as FirstMoment[],

  /* --------------------------------------------------------------- SONGS */
  songs: [
    { title: "[SONG]", artist: "[ARTIST]", note: "This song reminds me of you because [WHY].", link: "", preview: "" },
    { title: "[SONG]", artist: "[ARTIST]", note: "This song reminds me of you because [WHY].", link: "", preview: "" },
    { title: "[SONG]", artist: "[ARTIST]", note: "This song reminds me of you because [WHY].", link: "", preview: "" },
    { title: "[SONG]", artist: "[ARTIST]", note: "This song reminds me of you because [WHY].", link: "", preview: "" },
  ] as Song[],

  /* ---------------------------------------------------------------- QUIZ */
  quiz: {
    title: "Okay… let's see how well you remember us.",
    questions: [
      { question: "Where did we first meet?", options: ["[OPTION A]", "[OPTION B]", "[OPTION C]"], answerIndex: 0 },
      { question: "What was the first thing we talked about?", options: ["[OPTION A]", "[OPTION B]", "[OPTION C]"], answerIndex: 1 },
      { question: 'Who said "[SOMETHING]" first?', options: ["Me", "You", "Neither of us remembers"], answerIndex: 0 },
      { question: "What was our first photo together?", image: "/images/first-photo.jpg", options: ["[OPTION A]", "[OPTION B]", "[OPTION C]"], answerIndex: 2 },
      { question: "What is our most repeated inside joke?", options: ["[OPTION A]", "[OPTION B]", "[OPTION C]"], answerIndex: 0 },
      { question: "What was the first place we went together?", options: ["[OPTION A]", "[OPTION B]", "[OPTION C]"], answerIndex: 1 },
      { question: "Which song reminds me of that day?", options: ["[OPTION A]", "[OPTION B]", "[OPTION C]"], answerIndex: 0 },
      { question: "[QUIZ QUESTION]", options: ["[OPTION A]", "[OPTION B]", "[OPTION C]"], answerIndex: 2 },
    ] as QuizQuestion[],
    correct: "YOU REMEMBERED ❤",
    wrong: "Close… but I remember it differently 😌",
    resultPerfect: "Okay… you officially know everything about us ❤",
    resultGood: "Not bad… I'll let you keep me 😌",
    resultLow: "We clearly need more memory-making.",
  },

  /* --------------------------------------------------------------- VIDEOS */
  videos: [
    { src: "/videos/memory.mp4", title: "Our little movie", caption: "[CAPTION]", poster: "" },
    { src: "/videos/memory2.mp4", title: "Things I replay in my head", caption: "[CAPTION]", poster: "" },
    { src: "/videos/memory3.mp4", title: "Us being us", caption: "[CAPTION]", poster: "" },
  ] as VideoItem[],

  /* ----------------------------------------------------- HIDDEN SURPRISES */
  hidden: [
    { label: "A hidden photo", message: "[SECRET MESSAGE]", image: "/images/secret1.jpg" },
    { label: "An inside joke", message: "[INSIDE JOKE]" },
    { label: "Something I never said out loud", message: "[SECRET MESSAGE]" },
    { label: "A tiny clip", message: "[SECRET MESSAGE]", video: "/videos/secret.mp4" },
  ] as HiddenSurprise[],

  /* --------------------------------------------------------------- LETTER */
  letter: {
    teaser: "I wrote this instead of trying to say it all.",
    greeting: "Dear [HER NAME],",
    body: [
      "[I don't know if I can fit everything I feel into one page — but here's the attempt.]",
      "[SECOND PARAGRAPH.]",
      "[THIRD PARAGRAPH.]",
    ],
    signature: "— [YOUR NAME]",
  },

  /* ----------------------------------------------------------- VOICE NOTE */
  voiceNote: {
    src: "/music/voice-note.mp3",
    button: "There's something I wanted you to hear.",
    caption: "[ONE LINE ABOUT THE VOICE NOTE]",
  },

  /* --------------------------------------------------------------- REWARD */
  reward: {
    lockedTitle: "REWARD LOCKED",
    lockedNote: "Complete our little journey to unlock this.",
    unlockedTitle: "REWARD UNLOCKED ❤",
    couponTitle: "[REWARD TITLE — e.g. One date night, my treat.]",
    couponBody: "[REWARD DETAILS — redeemable any time, no expiry.]",
    couponCode: "[FOREVER-01]",
  },

  /* ---------------------------------------------------------------- FINAL */
  final: {
    build: ["Okay…", "One last thing.", "You thought that was everything?", "Not even close."],
    line1: "Happy Birthday, [HER NAME].",
    line2: "Thank you for being one of my favorite parts of life.",
    line3: "Here's to all the memories we've already made…",
    line4: "…and all the ones we haven't made yet.",
    replay: "Replay our story",
  },

  /* ---------------------------------------------------------------- MUSIC */
  music: {
    src: "/music/our-song.mp3",
    startAfterEnter: true,
    volume: 0.5,
  },
};

export type ExperienceConfig = typeof CONFIG;
