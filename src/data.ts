// All site content lives here. Edit this file to update the site.

export const WHATSAPP_NUMBER = "254716205591";
export const PHONE_DISPLAY = "+254 716 205 591";
export const EMAIL = "franklinmuriithi431@gmail.com";
export const CV_URL = "/pdf/cv.pdf";
export const PROFILE_PIC = "/images/profile image.jpeg";
export const YOUTUBE_URL = "https://www.youtube.com/@voidr3am";
export const TIKTOK_URL = "https://www.tiktok.com/@m.frank_lin?_r=1&_t=ZS-9Atul8LEoZo";
export const LOGO = "/images/logo.png";

export const whatsappLink = (message?: string): string =>
  `https://wa.me/${WHATSAPP_NUMBER}${message ? `?text=${encodeURIComponent(message)}` : ""}`;

export const formatKES = (n: number): string => `KES ${n.toLocaleString("en-KE")}`;

export const socialLinks = [
  { label: "GitHub", href: "https://github.com/franklin-mk" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/franklinmuriithi/" },
  { label: "X", href: "https://x.com/mfrank_lin" },
  { label: "YouTube", href: YOUTUBE_URL },
  { label: "Instagram", href: "https://www.instagram.com/_.jus.not.ur_frank/?__pwa=1" },
  { label: "TikTok", href: "https://www.tiktok.com/@m.frank_lin" },
];

/* ------------------------------------------------------------------ */
/* Creatives                                                           */
/* ------------------------------------------------------------------ */

export type CreativeCategory = "Video Reels" | "Photography" | "Graphic Design";
export const creativeTabs = ["All", "Video Reels", "Photography", "Graphic Design"] as const;
export type CreativeTab = (typeof creativeTabs)[number];

export interface CreativeItem {
  id: string;
  category: CreativeCategory;
  title: string;
  description: string;
  /** Put the file in public/ at this path. A placeholder shows until it exists. */
  image: string;
  href?: string;
}

export const creatives: CreativeItem[] = [
  { id: "v1", category: "Video Reels", title: "Short-form Tech Reels", description: "Fast, high-retention vertical edits that explain tech in under a minute.", image: "/images/creatives/short.jpg", href: TIKTOK_URL },
  { id: "v2", category: "Video Reels", title: "Promotional Brand Videos", description: "Clean promo cuts that put a business's products and story front and centre.", image: "/images/creatives/video-2.png", href: TIKTOK_URL },
  { id: "v3", category: "Video Reels", title: "Event Highlight Edits", description: "Event footage cut into shareable highlights with music and captions.", image: "/images/creatives/video-3.png", href: TIKTOK_URL },
  { id: "v4", category: "Video Reels", title: "CapCut Masterclass Project", description: "Work from the In-Depth CapCut Video Editing Masterclass on Skillshare.", image: "/images/creatives/video-4.jpg", href: TIKTOK_URL },
  { id: "p1", category: "Photography", title: "Local Flora", description: "Close-ups of the plants and vegetation around Central Kenya.", image: "/images/creatives/photo-1.jpg" },
  { id: "p2", category: "Photography", title: "Ecosystem Details", description: "The small habitats and textures that make up the local ecosystem.", image: "/images/creatives/photo-2.jpg" },
  { id: "p3", category: "Photography", title: "Mountain Terrain", description: "High-altitude mountain landscapes around Central Kenya.", image: "/images/creatives/photo-3.jpg" },
  { id: "p4", category: "Photography", title: "Natural-light Landscapes", description: "Wide landscape frames shot in natural light.", image: "/images/creatives/photo-4.jpg" },
  { id: "d1", category: "Graphic Design", title: "Social Campaign Posters", description: "Scroll-stopping posters built for social media campaigns.", image: "/images/creatives/MK Poster and Logo design-9 (2).png" },
  { id: "d2", category: "Graphic Design", title: "Logo Systems", description: "Logos designed to work across print, web and social.", image: "/images/creatives/MK LOGO 1-3 (1).png" },
  { id: "d3", category: "Graphic Design", title: "Brand Identity Kits", description: "Colour, type and layout rules that keep a brand consistent.", image: "/images/creatives/Screenshot 2026-10-28 143458.png" },
  { id: "d4", category: "Graphic Design", title: "Digital Product Design", description: "Canva-based digital products from the Create and Design Digital Products course.", image: "/images/creatives/MK Poster and Logo design-14.png" },
];

/* ------------------------------------------------------------------ */
/* Software projects                                                   */
/* ------------------------------------------------------------------ */

export type ProjectCategory = "Full Stack Web" | "M-Pesa / Mobile" | "Database / Networks" | "AI Systems";
export const projectTabs = ["All", "Full Stack Web", "M-Pesa / Mobile", "Database / Networks", "AI Systems"] as const;
export type ProjectTab = (typeof projectTabs)[number];

export interface Project {
  id: string;
  title: string;
  kind: string;
  summary: string;
  highlights: string[];
  stack: string[];
  categories: ProjectCategory[];
  image?: string;
  url?: string;
  urlLabel?: string;
  status: "Live" | "Prototype" | "Case study";
}

export const projects: Project[] = [
  {
    id: "voting",
    title: "DeKUT Online Voting System",
    kind: "Internal Attachment",
    summary: "A secure campus elections platform, from database design to network topology.",
    highlights: [
      "Relational MySQL database schemas",
      "RESTful API backend logic",
      "Cisco Packet Tracer secure campus topology",
      "Figma prototype of the election UI",
    ],
    stack: ["MySQL", "REST API", "Cisco Packet Tracer", "Figma"],
    categories: ["Database / Networks", "Full Stack Web"],
    image: "/images/projects/vote.png",
    status: "Case study",
  },
  {
    id: "studentreg",
    title: "StudentRegistrationApp",
    kind: "Web & Android App",
    summary: "Offline-first student registration with direct M-Pesa till payment.",
    highlights: [
      "Works without a connection, syncs when online",
      "Direct M-Pesa till payment integration",
      "SQLite and Firebase persistence",
    ],
    stack: ["Web", "Android", "SQLite", "Firebase", "M-Pesa"],
    categories: ["M-Pesa / Mobile"],
    image: "/images/projects/course.png",
    url: "https://unit-registration.vercel.app/login",
    urlLabel: "Open live project",
    status: "Live",
  },
  {
    id: "healthcare",
    title: "Intelligent Healthcare Diagnostic Assistant",
    kind: "AI Capstone Project",
    summary: "An AI framework with automated medical report generation.",
    highlights: [
      "Diagnostic assistant workflow",
      "Automated medical reporting",
      "Built as an AI course capstone framework",
    ],
    stack: ["AI", "Prompt workflows", "Report generation"],
    categories: ["AI Systems"],
    image: "/images/projects/aihealth.png",

    status: "Case study",
  },
  {
    id: "eventsimplified",
    title: "EventSimplified",
    kind: "DirectEd Full-Stack Project",
    summary: "Event planning dashboard with task tracking and AI-powered features.",
    highlights: [
      "Figma designs turned into pixel-accurate UI",
      "Gen AI models integrated into the app core",
      "Built with a team and delivered by sprint",
    ],
    stack: ["React", "Node.js", "AWS Amplify"],
    categories: ["Full Stack Web", "AI Systems"],
    image: "/images/projects/eventsimplified.png",
    url: "https://dev.d23xomau6ts39y.amplifyapp.com/dashboard/tasks?event=96a91e24-5aae-498b-8193-ad4612d7fdaa",
    urlLabel: "Open live project",
    status: "Live",
  },
  {
    id: "cafehub",
    title: "Cafe Hub",
    kind: "DirectEd Full-Stack Project",
    summary: "A cafe ordering and menu web app.",
    highlights: ["Responsive menu experience", "Full stack build with Node.js", "Deployed on Render"],
    stack: ["React", "Node.js"],
    categories: ["Full Stack Web"],
    image: "/images/projects/cafehub.png",
    url: "https://mycafe-hub-qog6.onrender.com",
    urlLabel: "Open live project",
    status: "Live",
  },
  {
    id: "lms",
    title: "Learning Management System",
    kind: "DirectEd Full-Stack Project",
    summary: "A learning platform for courses and learners.",
    highlights: ["Course and learner flows", "Responsive interface", "Deployed on Vercel"],
    stack: ["React", "Node.js"],
    categories: ["Full Stack Web"],
    image: "/images/projects/lms.png",
    url: "https://lms1-black.vercel.app",
    urlLabel: "Open live project",
    status: "Live",
  },
  {
    id: "blog",
    title: "Blog Platform",
    kind: "DirectEd Full-Stack Project",
    summary: "A publishing platform with posts and a content backend.",
    highlights: ["Post publishing and reading", "MongoDB-backed API", "Deployed on Render"],
    stack: ["React", "Node.js", "MongoDB"],
    categories: ["Full Stack Web"],
    image: "/images/projects/blog1.png",
    url: "https://blog-app-b0un.onrender.com",
    urlLabel: "Open live project",
    status: "Live",
  },
  {
    id: "mpesafigma",
    title: "M-PESA App Redesign",
    kind: "UI/UX Prototype",
    summary: "A Figma prototype reimagining the M-Pesa mobile experience.",
    highlights: ["Interactive Figma prototype", "Focus on clear payment flows", "Mobile-first layouts"],
    stack: ["Figma", "UI/UX"],
    categories: ["M-Pesa / Mobile"],
    image: "/images/projects/mpesafigma.png",
    url: "https://www.figma.com/proto/h7Wb7LD0OaPVFqUAldTeiN/M-PESA-APP-DESIGN?node-id=0-1&t=DN3HSAyOZiowtdwq-1",
    urlLabel: "Open prototype",
    status: "Prototype",
  },
  {
    id: "moneytrack",
    title: "Money Track",
    kind: "Android App",
    summary: "An expense tracker with custom digital wellbeing charts.",
    highlights: [
      "Native Android UI with Jetpack Compose",
      "Firebase backend and sync",
      "Custom charts for spending and screen-time habits",
    ],
    stack: ["Kotlin", "Jetpack Compose", "Firebase"],
    categories: ["M-Pesa / Mobile"],
    image: "/images/projects/moneytrack.png",
    status: "Case study",
  },
];

/* ------------------------------------------------------------------ */
/* Blog                                                                */
/* ------------------------------------------------------------------ */

export type Block =
  | { t: "p"; text: string }
  | { t: "h"; text: string }
  | { t: "ul"; items: string[] }
  | { t: "code"; text: string };

export interface Article {
  id: string;
  title: string;
  tag: string;
  excerpt: string;
  blocks: Block[];
}

export const articleWordCount = (a: Article): number =>
  a.blocks
    .map((b) => (b.t === "ul" ? b.items.join(" ") : b.text))
    .join(" ")
    .split(/\s+/)
    .filter(Boolean).length;

export const readingMinutes = (a: Article): number => Math.max(1, Math.round(articleWordCount(a) / 200));

export const articles: Article[] = [
  {
    id: "ai-for-smes",
    title: "Building AI for Local SMEs",
    tag: "AI",
    excerpt: "A practical way for a small Kenyan business to start with AI without a big budget or a data team.",
    blocks: [
      { t: "h", text: "Start with one boring, repeated job" },
      { t: "p", text: "The best first AI project for a small business is rarely a flashy chatbot. It is the task someone repeats forty times a day: answering \"how much is...?\" on WhatsApp, writing the same follow-up message, summarising the day's sales, or sorting enquiries. If a task is repetitive, has a clear right answer and eats staff time, it is a good candidate." },
      { t: "h", text: "A simple way to choose" },
      { t: "ul", items: [
        "Write down the three questions customers ask most often.",
        "Time how long staff spend answering them in a normal week.",
        "Pick the one with the clearest answers, such as prices, opening hours, location or booking steps.",
      ] },
      { t: "h", text: "Keep a human in the loop" },
      { t: "p", text: "Let the AI draft and let a person approve, at least in the first weeks. Review the answers it gets wrong, add the missing facts to the instructions you give it, and only then let it reply alone on low-risk questions. Anything involving money, refunds or complaints should always go to a person." },
      { t: "h", text: "Build on existing tools" },
      { t: "p", text: "You rarely need to train a model. A hosted language model, a short set of business facts (prices, hours, policies) and a simple web or WhatsApp front end cover most SME needs. Write the instructions in plain English, add Swahili if your customers use it, and test with real messages from your inbox." },
      { t: "h", text: "Mind customer data" },
      { t: "p", text: "Customer names and phone numbers are personal data. Kenya's Data Protection Act, 2019 applies to businesses that handle it, so collect only what you need, tell customers how it is used, and avoid pasting sensitive details into tools you don't control." },
      { t: "h", text: "Measure something simple" },
      { t: "p", text: "Track hours saved, response time and the number of enquiries that turned into orders. If those numbers don't move after a month, change the task, not the technology." },
    ],
  },
  {
    id: "mpesa-daraja-stk",
    title: "M-Pesa Daraja STK Integration Guide",
    tag: "M-Pesa",
    excerpt: "From credentials to callback: how an STK Push payment flows through your app.",
    blocks: [
      { t: "p", text: "STK Push (Lipa Na M-Pesa Online) lets your app trigger a payment prompt on the customer's phone. They enter their M-Pesa PIN and Safaricom tells your server the result. Here is the flow end to end." },
      { t: "h", text: "1. Get your Daraja credentials" },
      { t: "p", text: "Create an account on the Safaricom Daraja developer portal, add an app with the Lipa Na M-Pesa Sandbox product, and copy the Consumer Key and Consumer Secret. The portal also lists the sandbox shortcode and passkey for testing. Keep all of these in environment variables, never in front-end code." },
      { t: "h", text: "2. Request an access token" },
      { t: "p", text: "Call the OAuth endpoint with your key and secret as HTTP Basic credentials. The token is short-lived (about an hour), so cache it and refresh it when it expires." },
      { t: "code", text: "GET https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials\nAuthorization: Basic base64(consumerKey:consumerSecret)" },
      { t: "h", text: "3. Send the STK Push request" },
      { t: "p", text: "POST to /mpesa/stkpush/v1/processrequest with the Bearer token. The password is the base64 of shortcode + passkey + timestamp, and the timestamp format is YYYYMMDDHHmmss." },
      { t: "code", text: "const timestamp = new Date().toISOString().replace(/\\D/g, \"\").slice(0, 14);\nconst password = Buffer.from(shortcode + passkey + timestamp).toString(\"base64\");\n\nawait fetch(\"https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest\", {\n  method: \"POST\",\n  headers: { Authorization: `Bearer ${token}`, \"Content-Type\": \"application/json\" },\n  body: JSON.stringify({\n    BusinessShortCode: shortcode,\n    Password: password,\n    Timestamp: timestamp,\n    TransactionType: \"CustomerPayBillOnline\",\n    Amount: 1,\n    PartyA: \"2547XXXXXXXX\",\n    PartyB: shortcode,\n    PhoneNumber: \"2547XXXXXXXX\",\n    CallBackURL: \"https://your-domain.com/api/mpesa/callback\",\n    AccountReference: \"Order-1001\",\n    TransactionDesc: \"Payment\",\n  }),\n});" },
      { t: "p", text: "For a till (Buy Goods), the transaction type is CustomerBuyGoodsOnline and the shortcode fields follow your till setup. Check the Daraja documentation for your account type." },
      { t: "h", text: "4. Handle the callback" },
      { t: "p", text: "Daraja posts the result to your CallBackURL, which must be a public HTTPS address (a tunnelling tool works during development). In the body, Body.stkCallback.ResultCode of 0 means success, and CallbackMetadata holds the amount, receipt number and phone number. Any other code means the payment failed or was cancelled." },
      { t: "h", text: "5. Go-live checklist" },
      { t: "ul", items: [
        "Store every request and callback against your own order ID.",
        "Confirm payments from the callback, never from the browser.",
        "Make the callback idempotent so a repeated callback can't credit an order twice.",
        "Swap sandbox URLs and credentials for production ones once Safaricom approves your go-live.",
        "Show customers a clear \"check your phone\" state and a retry option.",
      ] },
    ],
  },
  {
    id: "nyeri-web-presence",
    title: "Why Nyeri Businesses Need Google Maps & Web Presence",
    tag: "Local SEO",
    excerpt: "Customers pick from what Google shows first. Here is how to be on the map and look trustworthy.",
    blocks: [
      { t: "p", text: "When someone in Nyeri searches for \"pharmacy near me\" or \"best nyama choma\", they usually choose from what Google shows first: the map results. If your business isn't there, or the details are wrong, they go to a competitor without ever knowing you exist." },
      { t: "h", text: "Start with a Google Business Profile" },
      { t: "ul", items: [
        "Claim your listing and verify it.",
        "Use your exact name, the right category, phone number and opening hours.",
        "Add real photos of your shopfront, products and interior.",
        "Add a WhatsApp link or phone number so customers can reach you in one tap.",
        "Ask happy customers for reviews and reply to every one.",
      ] },
      { t: "h", text: "Then add a simple website" },
      { t: "p", text: "A profile gets people to find you. A small website helps them trust you and act: your menu or price list, location, a WhatsApp order button and your story. Three pages is often enough. Make sure it loads fast on a mobile connection, because most visitors will be on a phone." },
      { t: "h", text: "Keep it accurate" },
      { t: "p", text: "Public holidays, new hours and moved locations should be updated the same day. Wrong information costs more than no information." },
      { t: "h", text: "Measure" },
      { t: "p", text: "Google Business Profile shows how many people called, asked for directions or visited your website. Check it monthly and note which photos and posts bring the most action." },
    ],
  },
];

/* ------------------------------------------------------------------ */
/* Navigation                                                          */
/* ------------------------------------------------------------------ */

export type NavAction =
  | { kind: "creative"; filter: CreativeTab }
  | { kind: "article"; id: string | null };

export interface NavChild {
  label: string;
  description?: string;
  href: string;
  action?: NavAction;
}

export interface NavItem {
  label: string;
  href: string;
  header?: { label: string; href: string };
  children?: NavChild[];
}

export const navItems: NavItem[] = [
  { label: "Home", href: "#home" },
  {
    label: "Services",
    href: "#services",
    children: [
      { label: "What I Build", description: "Web apps, e-commerce, APIs, databases and more", href: "#services" },
      { label: "Pricing & Packages", description: "Transparent KES pricing and a live estimator", href: "#pricing" },
    ],
  },
  {
    label: "Creatives",
    href: "#creatives",
    children: [
      { label: "Video Editing & Reels", description: "CapCut Masterclass, promo reels, tech edits", href: "#creatives", action: { kind: "creative", filter: "Video Reels" } },
      { label: "Nature & Landscape Photography", description: "Local ecosystem, vegetation, mountain shots", href: "#creatives", action: { kind: "creative", filter: "Photography" } },
      { label: "Graphic Design & Branding", description: "Canva/Adobe posters, logo systems, brand kits", href: "#creatives", action: { kind: "creative", filter: "Graphic Design" } },
    ],
  },
  { label: "Cases", href: "#cases" },
  {
    label: "Blog",
    href: "#blog",
    header: { label: "Return to Portfolio", href: "#home" },
    children: [
      ...articles.map<NavChild>((a) => ({ label: a.title, href: "#blog", action: { kind: "article", id: a.id } })),
      { label: "View All Articles →", href: "#blog", action: { kind: "article", id: null } },
    ],
  },
  { label: "Experience", href: "#experience" },
  {
    label: "About",
    href: "#about",
    children: [
      { label: "My Story", description: "3rd-year DeKUT CS student & tech entrepreneur", href: "#about" },
      { label: "Skills & Stack", description: "React, Node.js, Kotlin, MySQL, Cisco, CapCut, Canva", href: "#skills" },
      { label: "Certifications", description: "Cisco, ICT Authority, Moringa, micro1", href: "#certifications" },
      { label: "Testimonials", description: "What collaborators say about working with me", href: "#testimonials" },
    ],
  },
  { label: "Contact", href: "#contact" },
];

/* ------------------------------------------------------------------ */
/* About / experience                                                  */
/* ------------------------------------------------------------------ */

export const skillGroups = [
  { title: "Web", items: ["React", "Next.js", "TypeScript", "Node.js"] },
  { title: "Mobile", items: ["Kotlin", "Jetpack Compose", "Firebase"] },
  { title: "Data & Networks", items: ["MySQL", "MongoDB", "SQL", "Supabase", "Cisco Packet Tracer", "Python"] },
  { title: "Creative", items: ["CapCut", "Canva", "Adobe", "Figma"] },
];

export const timeline = [
  {
    id: "dekut",
    title: "BSc Computer Science",
    org: "Dedan Kimathi University of Technology (DeKUT)",
    period: "July 2024 – Present · 3rd Year, expected 2028",
    points: [
      "Specializing in cybersecurity alongside software development",
      "Coursework across AI, theory of computing and systems development",
      "Active in tech communities and clubs",
    ],
  },
  {
    id: "voting",
    title: "Internal Attachment: DeKUT Online Voting System",
    org: "Dedan Kimathi University of Technology",
    period: "Internal attachment",
    points: [
      "MySQL relational database schemas and RESTful API backend",
      "Cisco Packet Tracer secure campus topology",
      "Figma UI prototypes for secure campus elections",
    ],
  },
  {
    id: "directed",
    title: "Full-Stack Developer Apprenticeship",
    org: "DirectEd Development Foundation",
    period: "April 2024 – August 2024",
    points: [
      "Built full-stack web apps with React, Next.js and Node.js",
      "Completed with Distinction (2nd Runner-up)",
      "Shipped team projects including EventSimplified",
    ],
  },
];

export const certifications = [
  { issuer: "Directed Development Foundation", 
    title: "Foundations of Full Stack Web Development",
    url: "https://www.linkedin.com/in/franklinmuriithi/overlay/Certifications/1067782958/treasury/?profileId=ACoAAErYlasBS0Miglg3sqLCcqbsXemY4KijOXw" },
  { issuer: "Cisco Networking Academy", 
    title: "Introduction to Cybersecurity",
    url: "https://www.credly.com/badges/462ecab7-d995-44f5-9738-8b1083b00f65/linked_in_profile" },
  { issuer: "ICT Authority (Kenya) & Sigma Digital", 
    title: "Data Analytics Training (Power BI & Excel)",
    url: "https://training.smartacademy.go.ke/certificate-verification/?certificate_id=ICTA-1784709308-7855-44620" },
  { issuer: "ICT Authority (Kenya) & Pathways Technologies", 
    title: "Artificial Intelligence Training",
    url: "https://training.smartacademy.go.ke/certificate-verification/?certificate_id=ICTA-1783345685-7426-44620" },
  { issuer: "Moringa School", 
    title: "AI Essentials for Professionals",
    url: "https://moringa.my.salesforce-sites.com/certificateStatus?id=a0PQ200000XHXxpMAH" },
  { issuer: "Adobe", 
    title: "Design Fundamentals with AI",
    url: "https://www.coursera.org/account/accomplishments/verify/16UYUQUK6O1U" },
  { issuer: "Canva / Coursera", 
    title: "Create and Design Digital Products",
    url: "https://www.coursera.org/account/accomplishments/verify/2FP7N3QT6X9C" },
  { issuer: "Skillshare", 
    title: "In-Depth CapCut Video Editing Masterclass",
    url: "https://www.coursera.org/account/accomplishments/verify/68F3V1BIXAJD" },
  { issuer: "micro1", 
    title: "Certified AI Talent (Outstanding Performance)",
    url: "https://www.linkedin.com/in/franklinmuriithi/overlay/Certifications/1030780073/treasury/?profileId=ACoAAErYlasBS0Miglg3sqLCcqbsXemY4KijOXw" },
];

/* ------------------------------------------------------------------ */
/* Quote calculator                                                    */
/* ------------------------------------------------------------------ */

export const testimonials = [
  {
    name: "Simon Sällström",
    role: "CEO, DirectEd Development",
    quote:
      "Franklin was a standout talent in our full-stack development program. He consistently demonstrated a deep understanding of modern web technologies and an ability to solve complex engineering problems. A highly dedicated developer.",
    image: "/images/clientreviews/simon_sallstrom.jpg",
  },
  {
    name: "Bernard Ngungi",
    role: "UI/UX Designer",
    quote:
      "Collaborating with Franklin on the EventSimplified project was seamless. He has a rare ability to translate my Figma designs into pixel-perfect code without losing the details. A reliable teammate who communicates clearly.",
    image: "/images/clientreviews/Bernard.jpg",
  },
  {
    name: "Vincent Kingatua",
    role: "Generative AI Engineer",
    quote:
      "Integrating Generative AI models into a full-stack app is difficult, but Franklin made it seamless. He handled the backend API logic and frontend rendering perfectly during our group assessments. A technically gifted teammate.",
    image: "/images/clientreviews/Vincent.jpg",
  },
  {
    name: "Michael Moses",
    role: "Gen AI Engineer",
    quote:
      "On the Event Simplified project, I needed a developer who could handle complex AI data streams. Franklin seamlessly integrated my Gen AI models into the application core, ensuring the features were fast, responsive, and scalable.",
    image: "/images/clientreviews/Michael.jpg",
  },
  {
    name: "Kidus Elias",
    role: "Project Manager",
    quote:
      "Managing the development roadmap for Event Simplified was a challenge, but Franklin made it easier. He took ownership of critical features, consistently hit sprint goals, and communicated technical blockers clearly. A dependable engineering partner.",
    image: "/images/clientreviews/Kidus.jpg",
  },
];

export interface QuoteService {
  id: string;
  name: string;
  /** null = quoted individually */
  from: number | null;
  features: string[];
}

export const quoteServices: QuoteService[] = [
  {
    id: "starter",
    name: "Starter SME Web Suite",
    from: 15000,
    features: ["3-page responsive site", "Google Business Profile setup", "WhatsApp ordering integration", "Delivered in 3 days"],
  },
  {
    id: "mpesa",
    name: "M-Pesa & E-Commerce Integration",
    from: 25000,
    features: ["Custom STK Push callbacks", "Dynamic catalog / menu", "Till integration", "Local database setup"],
  },
  {
    id: "custom",
    name: "Custom AI & Full Stack Systems",
    from: 45000,
    features: ["Custom web app (React / Next.js / Node.js)", "Database architecture (MySQL / MongoDB)", "AI chatbot & prompt workflows", "Admin dashboard"],
  },
  {
    id: "video",
    name: "Video Editing & Reels",
    from: null,
    features: ["Short-form tech reels", "Promotional brand videos", "Event edits"],
  },
  {
    id: "design",
    name: "Graphic Design & Branding",
    from: null,
    features: ["Logo design", "Social media campaign posters", "Brand identity kits"],
  },
];

// Estimator add-on prices (edit freely)
export const ESTIMATOR = {
  extraPage: 2000,
  extraFeature: 3500,
  maxPages: 12,
  maxFeatures: 8,
  depositRate: 0.5,
};

/* ------------------------------------------------------------------ */
/* Services & pricing packages                                         */
/* ------------------------------------------------------------------ */

export type ServiceIconKey =
  | "globe"
  | "cart"
  | "plug"
  | "layout"
  | "database"
  | "realtime"
  | "speed"
  | "cms";

export const services: { id: number; title: string; description: string; icon: ServiceIconKey }[] = [
  { id: 1, title: "Web Applications", description: "Tailored web apps built with the latest technologies.", icon: "globe" },
  { id: 2, title: "E-commerce Websites", description: "Secure online stores with user-friendly shopping and payments.", icon: "cart" },
  { id: 3, title: "API Integration", description: "Seamless integration for smooth data sharing and functionality.", icon: "plug" },
  { id: 4, title: "User Interfaces", description: "Engaging, responsive front-end designs for better user experiences.", icon: "layout" },
  { id: 5, title: "Database Solutions", description: "Efficient and scalable database management for your data needs.", icon: "database" },
  { id: 6, title: "Real-Time Features", description: "Add live chat, notifications, and real-time data updates.", icon: "realtime" },
  { id: 7, title: "Speed Optimization", description: "Boost performance with faster load times and optimization.", icon: "speed" },
  { id: 8, title: "Website Management", description: "Easy content management systems with flexible controls.", icon: "cms" },
];

export interface Pkg {
  id: string;
  name: string;
  short: string; // label for the estimator tabs
  from: number;
  blurb: string;
  features: string[];
  popular?: boolean;
}

export const packages: Pkg[] = [
  {
    id: "starter",
    name: "Starter SME Web Suite",
    short: "Starter",
    from: 15000,
    blurb: "Get your business online fast, with customers one tap from WhatsApp.",
    features: [
      "3-page responsive website",
      "Google Business Profile setup",
      "WhatsApp ordering integration",
      "Delivered in 3 days",
    ],
  },
  {
    id: "mpesa",
    name: "M-Pesa & E-Commerce Integration",
    short: "M-Pesa",
    from: 25000,
    blurb: "Take payments the way Kenyan customers actually pay.",
    features: [
      "Custom STK Push callbacks",
      "Dynamic catalog / menu",
      "Till integration",
      "Local database setup",
    ],
    popular: true,
  },
  {
    id: "custom",
    name: "Custom AI & Full Stack Systems",
    short: "Custom AI",
    from: 45000,
    blurb: "Bespoke software for institutions and growing businesses.",
    features: [
      "Custom web app (React / Next.js / Node.js)",
      "Database architecture (MySQL / MongoDB)",
      "AI chatbot & prompt workflows",
      "Admin dashboard",
    ],
  },
];

export const budgetOptions = [
  "Under KES 15,000",
  "KES 15,000 – 25,000",
  "KES 25,000 – 45,000",
  "KES 45,000+",
  "Not sure yet",
];