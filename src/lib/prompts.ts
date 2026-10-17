export interface Inputs {
  pageName: string;
  phone: string;
  product: string;
}

export interface Style {
  id: string;
  label: string;
  hint: string;
  instruction: string;
  badge?: string;
  customPrompt?: (i: Inputs) => string;
}

export const STYLES: Style[] = [
  {
    id: "hook-sales",
    label: "হুক-বেজড সেলস",
    hint: "আকর্ষণীয় হুক, ডিরেক্ট সেলস ও হ্যাশট্যাগ",
    instruction: "Write high-converting, hook-based sales copy in Bangla. Start with an irresistible scroll-stopping hook that grabs attention immediately, clearly highlight the core value and appeal, and drive the reader to order.",
    badge: "সেলস ফোকাস",
  },
  {
    id: "pas-sales",
    label: "সমস্যা ও সমাধান (PAS)",
    hint: "কাস্টমারের সমস্যা ও নিখুঁত সমাধান",
    instruction: "Write using the Problem-Agitate-Solve (PAS) formula in Bangla: start with a common customer frustration or daily problem, agitate the pain point, and present this product as the perfect effortless solution.",
    badge: "প্রবলেম সলভিং",
  },
  {
    id: "story",
    label: "ইমোশনাল স্টোরিটেলিং",
    hint: "বাস্তব জীবনের ছোট গল্পে প্রোডাক্ট",
    instruction: "Write an emotional storytelling post in Bangla: open with a short relatable daily moment or scenario, seamlessly introduce the product as an essential part of life, and close with a warm call to action.",
    badge: "স্টোরিটেলিং",
  },
  {
    id: "friendly-bn",
    label: "Friendly বাংলা",
    hint: "আপনজনের মতো সহজ ভাষায়",
    instruction: "Write in warm, conversational Bangla, like talking to a friend. Short natural lines, approachable and sincere tone.",
    badge: "ক্যাজুয়াল",
  },
  {
    id: "pro",
    label: "Professional বাংলা",
    hint: "মার্জিত ও নির্ভরযোগ্য টোন",
    instruction: "Write in a polished, premium, professional tone in Bangla. Focus on trust, reliability, craftsmanship, and clear benefits with elegant phrasing.",
    badge: "প্রফেশনাল",
  },
  {
    id: "offer",
    label: "অফার ও সীমিত সময়",
    hint: "সীমিত স্টক, দ্রুত অর্ডার",
    instruction: "Create strong urgency and scarcity in Bangla: emphasize limited stock or limited-time availability, clear offer value, and an immediate call to order now.",
    badge: "আর্জেন্ট অফার",
  },
  {
    id: "short",
    label: "Short & Punchy",
    hint: "৩-৪ লাইনে সরাসরি কথা",
    instruction: "Maximum 3-4 short, punchy sentences in Bangla: one powerful hook, core benefit, and direct call to action.",
    badge: "সংক্ষিপ্ত",
  },
  {
    id: "features",
    label: "ফিচার ও স্পেক্স বিবরণ",
    hint: "মাপ ও কোয়ালিটি বিস্তারিত",
    instruction: "Hook line in Bangla, then clear specifications, dimensions, materials, and features in clean sentences without bullet points, dashes, asterisks, or emojis, followed by price and order details.",
    badge: "ফিচার ও স্পেক্স",
  },
  {
    id: "hashtags",
    label: "অরগানিক রিচ ও ভাইরাল",
    hint: "সর্বোচ্চ রিচ ও এনগেজমেন্ট",
    instruction: "Write an engaging, share-worthy post in Bangla designed for maximum organic reach and social interaction, optimized for viral discovery.",
    badge: "অরগানিক রিচ",
  },
  {
    id: "en",
    label: "English Clean Copy",
    hint: "Clean English for social media",
    instruction: "Write in natural, engaging, professional English suitable for a modern Facebook audience, with clear value highlights and direct CTA.",
    badge: "English",
  },
];

export function buildPrompt(s: Style, i: Inputs): string {
  if (s.customPrompt) {
    return s.customPrompt(i);
  }

  const page = i.pageName.trim() || "[পেজ নাম]";
  const phone = i.phone.trim();
  const product = i.product.trim() || "[পণ্যের তথ্য]";

  return [
    "You are an expert Facebook copywriter for online sellers in Bangladesh.",
    "Write ready-to-publish Facebook post copy for the product below.",
    "",
    `Perspective / Style: ${s.label}`,
    s.instruction,
    "",
    "Product info (raw):",
    product,
    "",
    `Page name: ${page}`,
    phone ? `Order / contact number: ${phone}` : "",
    "",
    "HASHTAG REQUIREMENTS (MANDATORY):",
    "At the very end of the post, add 8-12 relevant, high-converting hashtags in both Bangla and English (mixing product category keywords, niche tags, and general shopping tags, e.g., #পণ্যনাম #অনলাইনশপিং #Bangladesh #ProductKeyword) to maximize organic search and reach.",
    "",
    "STRICT NEGATIVE CONSTRAINTS (CRITICAL):",
    "1. ABSOLUTELY NO EMOJIS: Do NOT output any unicode emojis or symbols (strictly NO ✨, 🔥, 🚀, 💎, 📌, 👉, 🛒, ❤️, etc.). The output must contain pure plain text with zero emojis.",
    "2. NO CODE BLOCKS: Do NOT put the output inside markdown code blocks or backticks (strictly NO ```). Output directly as clean plain formatted text.",
    "3. NO BULLET POINTS OR SYMBOLS: Do not use bullet points, asterisks (*), or dashes (-) for listing. Write in clean, smooth sentences.",
    "4. PARAGRAPH SPACING: Separate each paragraph with a double newline (a full empty line between paragraphs). Do not merge everything into a single paragraph.",
    "5. FACTUAL ONLY: Use only the facts given in product info. Do not invent unverified claims or prices.",
    "6. End with the page name" + (phone ? " and contact number" : "") + ", followed by the hashtags.",
  ].filter(Boolean).join("\n");
}
