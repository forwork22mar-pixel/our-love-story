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
  herName: "MY BABY❤️ ",
  birthdayMessage: "Happy Birthday, MY BABY ",

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
      "CAUSE A BIRTHDAY WISH AND PUTTING YOU ON STORY IS NOT ENOUGH TO SHOW HOW MUCH I LOVE THIS DAY AND HOW MUCH I M BLESSED TO HAVE YOU IN MY LIFE .❤️💕😘🤭",
      "YOU FUCKINGGGGGG MEAN THE WORLD FOR  ME HONEY , A BABY WHOME I WILL TAKE CARE OF , A DUMBO FOR ME (while you are smarter then me still.). ",
    ],
  },

  /* --------------------------------------------------------------- CHAPTER 2 */
  reveal: {
    line1: "Today isn't just another day.",
    line2: "It's your day.",
    line3: "Happy Birthday, MY LOVE ARTI",
  },

  /* --------------------------------------------------------- CHAPTER 3 PHOTOS */
  photos: [
    { src: "/images/photo1.jpg", caption: "HOW YOU ARE EVEN THIS PRETTY🤭😍", shape: "hero", tilt: 0 },
    { src: "/images/photo2.jpg", caption: "FOR THE REEL💕", shape: "tall", tilt: -3, polaroid: true },
    { src: "/images/photo3.jpg", caption: "SWEETEST ONE", shape: "square", tilt: 2 },
    { src: "/images/photo4.jpg", caption: "MY BADDIE ", shape: "wide"},
    { src: "/images/photo5.jpg", caption: "INNOCENT BADDIE",  shape: "tall", tilt: 3 },
    { src: "/images/photo6.jpg", caption: "FUNNY ARTI 😍🤭", shape: "square", tilt: -2, polaroid: true },
    { src: "/images/photo12.png", caption: " PRETTIEST ONE😍", shape: "wide" },
    { src: "/images/photo8.png", caption: "UHMM SILLY ONE 🤭😝" , shape: "tall" },
    { src: "/images/photo9.jpg", caption: "TEASING ONE😏",  shape: "square", tilt: 2 },
    { src: "/images/photo11.png", caption: "MY FAV VIEW ❤️", shape: "hero" , polaroid: true},
    { src: "/images/photo10.png", caption: "JUST YOU EFFORTLESSLY🤭💕", shape: "square", tilt: -3, polaroid: true },
    { src: "/images/photo7.jpg", caption: "RANDOMLY LOOKING CUTE😎",  shape: "tall" },
    // ...keep adding, 20–30 photos look best.
  ] as Photo[],

  /* ----------------------------------------------------- CHAPTER 4 MEMORY MAP */
  memories: [
    { id: "meet", type: "FIRST MEET", title: "THE FIRST TIME WE SAW EACHOTHER!", date: "19th MAY 2026", description: "THE MOEMENT WE SAW EACHOTHER AND THAT MOMENT JUST FREZZED FOR US (FOREVER AND EVER ..)", image: "/images/saw.png", icon: "✦", x: -62, y: -38 },
    { id: "talk", type: "FIRST TALK", title: "THE FIRST TIME I GET TO HEAR YOU!", date: "IN 5th GRADE", description: "i Don't remember it but i know it would be soo cute you taling to the stupid suri in 5 standard .I was lil shy  towards girl but for you hopefully i was this SURI!", icon: "✧", x: -24, y: -66 },
    { id: "hug", type: "FIRST HUG", title: "THE MOMENT YOU SOUL TOUCHED MINE ", date: "19th MAY 2026", description: "[There are some moments you remember without trying. This is one of them. The first time I hugged you, everything somehow felt a little quieter, a little warmer, and a lot more special.]", image: "/images/first-meet.jpg.png", icon: "❤", x: 22, y: -58 },
    { 
  id: "kiss", 
  type: "FIRST KISS", 
  title: "FIRST KISS❤️", 
  date: "20th MAY 2026", 
  description: "The moment your lips touched mine 😭.. All the surrounding was frozen for a min.. We kissed 😭😳for the first time fuckkk it was soo romantic 💞.", 
  image: "/images/kiss.jpg.png", 
  icon: "❤", 
  x: 70, 
  y: 55 
},

{ 
  id: "mall", 
  type: "MALL MEMORY", 
  title: "WE IN THAT MALL!", 
  date: "20th MAY 2026", 
  description: "We went to mall together and making memories. We ate that domino's pizzza and cold coffee combo 😂. Tujhe khatm karna pada tha... And also those kisses 🤭in those lift 💞", 
  image: "/images/mall.jpg.png", 
  icon: "✦", 
  x: -75, 
  y: 55 
},

{ 
  id: "park", 
  type: "PARK MEMORY", 
  title: "JUST WE SITTING IN THE PARK", 
  date: "YOUR DATE HERE", 
  description: "We sat on that bench in that Lodhi garden.. 😭we were just talking.. Staring each other constantly.. Those eye contact 😭💞all  printed in my head for life..", 
  image: "/images/park.jpg.png", 
  icon: "✧", 
  x: 75, 
  y: -55 
},

{ 
  id: "random2", 
  type: "RANDOM MOMENT", 
  title: "YOUR TITLE HERE", 
  date: "YOUR DATE HERE", 
  description: "YOUR DESCRIPTION HERE", 
  image: "/images/random.jpg.png", 
  icon: "◎", 
  x: -75, 
  y: -5 
},

{ 
  id: "confession", 
  type: "CONFESSION", 
  title: "THE CONFESSION DAY ", 
  date: "22th MARCH 2024", 
  description: 'From here everything changed up soo good and fine 😭 the moment you confessed "I like you"... Fuckkk one of the greatest moment of my life.. But yess I love pehle meine bola tha 😋',
  image: "/images/confession.jpg.png", 
  icon: "❤", 
  x: 35, 
  y: -75 
},

    { id: "photo", type: "FIRST PHOTO", title: "The first time that phone captured our moment. ", date: "19th MAY 2026", description: "The beginning of a collection of moments I would never want to forget. And somehow, every picture with you still feels like my favorite one.", image: "/images/thefirstclick.jpg", icon: "◎", x: 60, y: -34 },
    { id: "auto", type: "FIRST AUTO RIDE!", title: "THE AUTO RIDE WITH YOU ", date: "19th MAY 2026", description: "The moment we sat on that auto and have that ride where you hold my arms for the first time and also pinched yourself",image: "/images/auto.jpg.png", icon: "✦", x: 78, y: 6 },
    { id: "call", type: "FIRST CALL", title: "THE FIRST CALL!", description: "The first call... Aah I remember how you weren't able to speak up on the call I tried to talk 😂.. But yesss core memory baby 😋", icon: "☾", x: 56, y: 44 },
  
    { id: " YOUR gift", type: "YOUR FIRST GIFT!", title: "YOUR FIRST GIFT", date: "26th MARCH 2025", description: "The first time I tried to gift you something that Harry Potter box 😭😭aaa.. We had a fight after that but it reached you safely ache se.. 💓😘", icon: "✦", x: -64, y: 34 },
    
    { id: "funniest", type: "FUNNIEST MOMENT", title: "FUNNY MOMENTS ", date: "31st FEB", description: "CAN'T BE ONE NEVER WILL BE .. JAB I HAVE MY COMEDIAN GF WITH ME IT IS IMPODDIBLE TO HAVE ONE FUNNY MOMENT THAT'S WHY 31st  FEB (CAN'T BE DATED.)", icon: "✧", x: -8, y: -22 },
    { id: "random", type: "MOST RANDOM MOMENT", title: "THE RANDOM CLICK ", description: "TO ALL THE HATTERS OF OUR . JO JO NAZAR LAGANE KI KOSHIH KARTE HAI UNKE LIYA HAI YE .",image: "/images/fuck.jpg.png", icon: "✦", x: 34, y: 18 },
   
    { id: "today", type: "TODAY", title: "HAPPIEST BIRTHDAY BABYGIRL❤️😘😘😍😍", date: "4th SEP 2026", description: "THE BITRTHDAY, YOU ENTERED INTO ADULTHOOD ,FINALLY A AUNTY AND HOPEFULLY MY WIFEY ONE DAY YOU WILL BABY, ENJOY YOU DAY I LOVEEEEEEEEE YOUUUU SOOOOOO MUCH😘😘😘 ", icon: "☀", x: 6, y: 40 },
  ] as Memory[],

  /* ------------------------------------------------------- CHAPTER 5 FIRSTS */
  firsts: [
    { title: "Our First Meet", story: "The Story behind the first meet 😭(The struggle we both had). The wait we did to see each other 💞.. The wait I did 😭for that 20-25 mins on that metro aaahh it felt more then the 1.5 year... But the moment I saw you steping out 😭🥺the metro OMGGGGGG fuck I eyes saw you felt soo fuckinggg romantic and happy.. My heart beats so fast when you 😭😭were running towards me you directly hugged me 😭😭😭aahhh ( THE FIRST PERSON TO HUG ME💞 LIKE THAT)..... Fav story to tell anyone (our kids) 😭.." },
    { title: "Our First Conversation", story: "The First conversation would 😋be cute in that 5th standard.. Me who never wanted to talk to any girl 😭in that era.. And you so cutely sitting with me in that desk.. 😭.. Hopefully we were comfortable at that time.. The thing I remember is only that I have you at that time and so I have now 😭😋(WIN HAI JI) ... I CAN IMAGINE TWO KIDS SITTING TOGETHER (us) .. You were also on my shoulders on that  dance class 😭😘..." },
    { title: "Our First Hug", story: "About the first HUG.... From where I start 😭😭🥺I hugged you Before your body touched mine.. I hugged you in my conscious mind when I was being operated.. I hugged you before all those good nights.. 😭💞I hugged you after those morning wishes 💓.. I hugged you on all those calls.. I hugged you when you don't need me 😭😭. I Hugged you the tightest when you need me everytime.. AND.... THE MOMENT YOU RAN AND COME TO ME 😭😭to hug me.. (I m doneeeeee) 😭🥺💓aaaaaa... We fit so perfectly fine.... Ohh mann wanna hug you for hours and we will honey 😘😘.. And yes you are the first person how hugged me 😋So it will Be always  special for me.. 😘" },
    { title: "Our First Photo", story: "The First click 😋 ... Not a  story but yess memorable because two shy ppl (just at the beginning) trying to. Capture a moment together.. 😋💓💓it's special in every way.. The first day we were just watching us.. And trying to capture each other in our eyes and head 😭.. We forget the surroundings just us (lil nervous, but you were there the calmest person for me). IT WILL BE ALWAYS SPECIAL.. IT WILL TELL US HOW MANY DAYS AND MONTHS WE WAITED 😭to see each other.. 😘💞❤", },
    { title: "Our First Call", story: "The FIRST CALL UHMMMMM😂🤭was cute of you... Mam wasn't able to speak up (sweating up pura) 😋but you tried and so I did 😭we had so cute convo.. Still wasn't able to believe that you and me were together 😭...  Also, THE VIDEO CALL 😭.. Tu akele thi ghar par and we had first call you showed me the bookshelf.. And 😭it was soo special I was watching the women whome I will watch my whole life (hellll Fucking Lucky 😭😘😘) .. Bestttttttestttttttttt thing just to see you , way  relaxing 😋😋" },
    { title: "Our First Date", story: "THE FIRST DATE 🤭😭💓... Whome should I consider.. All those 3 days will be my first date.. 😭. The first food we ate together was that ice cream on the first day out of that Lodhi Garden 💓... You had that cone and meine Mango wali li thi.. We had that walk to the metro station 😭😋(was in the bucket list) ... The time when we were entering the metro line (OMMGGGG 😭) The way your hairs were just randomly blowing uffffff.. 😭😭🥺(SO FUCKINGGG ROMANTIC, FULL MOVIE VIBES)...  THE SECOND MEAL.. aaa THAT DOMINO'S PIZZA WITH A COLD COFFEE.. 😭😂bekar combo.. Chuna lagaya diya tha usne.. 😾.. But it to get memorable 🤭😋😋... You had your coke mast mast hogya tha.. 😘.. We also had the Diet Coke  together in the park 😋🤭YEYEYEYYEYEYEY... BEST DATES.. (MORE TO COME ❤😌)" },
    
    { title: "Your First Gift", story: "THAT FIRST GIFT 😂... (The JUKE BOX) It too had a interesting story behind .. ❤😭crazy one...(skip) But it was worth 😭😋doing for MY GIRL (you deserve it all honey) 😌😘UHMMM, THE BANGLES AND THE NECKLACE 💓. It to holds a story 😭😭.. I was in vrindavan and just prayed for us to all the mandir and gods I visited 😭.. The bangles I Was bit confused about the size 😭💓but it perfectly fitted in You (Abb tho aunty ji ko bhi pasand aagyi.. Yeyeyye😌😋).. The necklace 💓... If you ever feel alone or sad  becoz you are all alone over there please remember if there is no one around you.. There is still someones😭😭 hand on your head protecting you always 💞(GOD JI is always with you.) 😭... The way Radha and Krishna ji sticked together forever I will always stand on your side (always will)... Wanna be remembered only 😭😭with your name honey.. Loveeeee youuuuu my RADHA 😭💞💞." },
    { title: 'Our First "I Love You", story: "" },
  ] as FirstMoment[],
 
  /* --------------------------------------------------------------- SONGS */
  songs: [
    { title: "HAAREYA😋", artist: "Arijit Singh", note: "This song reminds me of you because I lost me heart when you confessed me.😭😋", link: "/music/Haareya.mp3", preview: "" },
    { title: "LOVER❤️", artist: "Taylor Swift", note: "You're my, my, my, my Lover", link: "/music/Lover.mp3", preview: "" },
    { title: "TU CHAHIYE🫣", artist: " Atif Aslam", note: "Koi aur duja kyun mujhe Na tere siva chahiye Har safar mai mujhe Tu hi rehnuma chahiye", link: "/music/Tu-Chahiye.mp3", preview: "" },
    { title: "UNTIL I FOUND YOU😭", artist: "Stephen Sanchez ", note: "The Day I Found HERRRRRR( Youuuuuuuu)❤️😭", link: "/music/Until-I-Found-You.mp3", preview: "" },
  ] as Song[],

  /* ---------------------------------------------------------------- QUIZ */
  quiz: {
    title: "Okay… let's see how well you remember us.",
    questions: [
      { question: "When did your lips touched My cheeks for the first Time😘 ?", options: ["At the flat 🤭", "Lodhi garden💕", "The mall😍"], answerIndex: 1 },
      { question: "What was my respose to your confession🫣", options: ["Fuckkkk'😮", "Areh dada💕", "I like you to😍"], answerIndex: 1 },
      { question: 'Who said "I LOVE YOUUU❤️ " first?', options: ["Me", "You", "Neither of us remembers"], answerIndex: 0 },
      { question: "How doy you like me the most in ?", options: ["Bald", "long Hairs", "Short hairs"], answerIndex: 0 },
      { question: "What dish I love to call you?", options: ["Bundi ke Ladoo😝", "Rasgulla🫣 ", "Rasmalai🤤"], answerIndex: 2 },
      { question: "When did I insited the first kiss?", options: ["On the couch", "After the didi call", "In the lift"], answerIndex: 1 },
      { question: "Which song i uploaded on our fisrt story?", options: ["Mein tera Mein tera❤️ ", "You are my soniyo💕", "I like me Better🤭"], answerIndex: 0 },
      { question: "What song it was when you were in my story for the fisrt time?", options: ["I found Her", "Yeh fitoor Mera", "Meri banogi kya"], answerIndex: 1 },
    ] as QuizQuestion[],
    correct: "YOU REMEMBERED ❤",
    wrong: "Close… but I remember it differently 😌",
    resultPerfect: "Okay… you officially know everything about us ❤",
    resultGood: "Not bad… I'll let you keep me 😌",
    resultLow: "We clearly need more memory-making.",
  },

  /* --------------------------------------------------------------- VIDEOS */
  videos: [
    { src: "/video1.mp4", title: "TRENDY💕🤭", caption: "Had to recreate this one with my favorite person. 🥹", poster: "" },
    { src: "/video2.mp4", title: "My girl, my world. ❤️", poster: "" },
    { src: "/video3.mp4", title: "Our little movie, my favorite scene.💕😘", poster: "" },
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
