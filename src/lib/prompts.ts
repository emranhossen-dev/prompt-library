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

function buildHookSalesPrompt(i: Inputs): string {
  const page = i.pageName.trim() || "[পেজ নাম]";
  const prod = i.product.trim() || "[পণ্যের বিবরণ]";
  const phonePart = i.phone.trim() ? `\nযোগাযোগ/অর্ডার নাম্বার: ${i.phone.trim()}` : "";

  return `পেজ নাম: ${page}
পণ্য: ${prod}${phonePart}

শর্তসমূহ:
১. হুক-বেজড (Hook-based) আকর্ষণীয় ৫টি ফেসবুক সেলস পোস্ট তৈরি করে দাও।
২. কোনো ধরনের ইমোজি (Emoji) ব্যবহার করা যাবে না (যেমন: ✨, 🔥, 🚀 বা কোনো ইউনিকোড ইমোজি সম্পূর্ণ নিষিদ্ধ)।
৩. কোনো বুলেট পয়েন্ট (Bullet point), ড্যাশ (-), স্টার (*) বা বিশেষ ক্যারেক্টার ব্যবহার করা যাবে না।
৪. প্রতিটি পোস্ট আলাদা আলাদা কোড বক্সের (Code block) ভেতরে দিতে হবে, যাতে কপি বাটনে ক্লিক করে সরাসরি কপি করা যায়।
৫. টেক্সট শতভাগ বাংলায় (বাংলা ফন্টে) হতে হবে, কোনো বাংলিশ বা ইংরেজি রাখা যাবে না।
৬. প্যারাগ্রাফ বা সেকশন প্রকাশের জন্য প্রতিটি প্যারার পর বাধ্যতামূলক ২টি নিউ-লাইন (Double Enter Key) দিয়ে ১টি খালি ফাঁকা লাইন বা গ্যাপ রাখতে হবে। এক লাইনের পর পর কোনো সিঙ্গেল নিউ-লাইন দেওয়া যাবে না, সব লাইন একসাথে মিশিয়ে লেখা যাবে না।

কাজের উদাহরণ (ঠিক কীভাবে আউটপুট দিবা):

\`\`\`
[প্যারাগ্রাফ ১ এর লেখা এখানে থাকবে]

[প্যারাগ্রাফ ২ এর লেখা এখানে থাকবে]

[প্যারাগ্রাফ ৩ এর লেখা এখানে থাকবে]
\`\`\`

উপরের নিয়ম ও ফরম্যাট হুবহু মেনে ৫টি পোস্ট তৈরি করে দাও।`;
}

function buildPasSalesPrompt(i: Inputs): string {
  const page = i.pageName.trim() || "[পেজ নাম]";
  const prod = i.product.trim() || "[পণ্যের বিবরণ]";
  const phonePart = i.phone.trim() ? `\nযোগাযোগ/অর্ডার নাম্বার: ${i.phone.trim()}` : "";

  return `পেজ নাম: ${page}
পণ্য: ${prod}${phonePart}

শর্তসমূহ:
১. সমস্যা ও সমাধানভিত্তিক (Problem-Agitate-Solve) আকর্ষণীয় ৫টি ফেসবুক সেলস পোস্ট তৈরি করে দাও (গ্রাহকের বাস্তব সমস্যা তুলে ধরে এই পণ্যের মাধ্যমে নিখুঁত সমাধান দাও)।
২. কোনো ধরনের ইমোজি (Emoji) ব্যবহার করা যাবে না (যেমন: ✨, 🔥, 🚀 বা কোনো ইউনিকোড ইমোজি সম্পূর্ণ নিষিদ্ধ)।
৩. কোনো বুলেট পয়েন্ট (Bullet point), ড্যাশ (-), স্টার (*) বা বিশেষ ক্যারেক্টার ব্যবহার করা যাবে না।
৪. প্রতিটি পোস্ট আলাদা আলাদা কোড বক্সের (Code block) ভেতরে দিতে হবে, যাতে কপি বাটনে ক্লিক করে সরাসরি কপি করা যায়।
৫. টেক্সট শতভাগ বাংলায় (বাংলা ফন্টে) হতে হবে, কোনো বাংলিশ বা ইংরেজি রাখা যাবে না।
৬. প্যারাগ্রাফ বা সেকশন প্রকাশের জন্য প্রতিটি প্যারার পর বাধ্যতামূলক ২টি নিউ-লাইন (Double Enter Key) দিয়ে ১টি খালি ফাঁকা লাইন বা গ্যাপ রাখতে হবে। এক লাইনের পর পর কোনো সিঙ্গেল নিউ-লাইন দেওয়া যাবে না, সব লাইন একসাথে মিশিয়ে লেখা যাবে না।

কাজের উদাহরণ (ঠিক কীভাবে আউটপুট দিবা):

\`\`\`
[প্যারাগ্রাফ ১ এর লেখা এখানে থাকবে - গ্রাহকের দৈনন্দিন সমস্যা ও দ্বিধা]

[প্যারাগ্রাফ ২ এর লেখা এখানে থাকবে - পণ্যের মাধ্যমে নিখুঁত সমাধান ও বিশেষত্ব]

[প্যারাগ্রাফ ৩ এর লেখা এখানে থাকবে - পেজ নাম ও অর্ডার করার নিয়ম]
\`\`\`

উপরের নিয়ম ও ফরম্যাট হুবহু মেনে ৫টি পোস্ট তৈরি করে দাও।`;
}

export const STYLES: Style[] = [
  {
    id: "hook-sales",
    label: "হুক-বেজড সেলস (৫টি পোস্ট)",
    hint: "কোড বক্সে ৫টি আকর্ষণীয় পোস্ট, নো-ইমোজি",
    instruction: "Hook-based high-converting posts inside code blocks with double-spaced paragraphs and zero emojis.",
    badge: "৫টি পোস্ট • কোড বক্স",
    customPrompt: buildHookSalesPrompt,
  },
  {
    id: "pas-sales",
    label: "সমস্যা ও সমাধান (৫টি পোস্ট)",
    hint: "PAS ফর্মুলা, কোড বক্সে ৫টি পোস্ট",
    instruction: "Problem-Agitate-Solve framework inside code blocks with clean spacing and zero emojis.",
    badge: "৫টি পোস্ট • কোড বক্স",
    customPrompt: buildPasSalesPrompt,
  },
  {
    id: "friendly-bn",
    label: "Friendly বাংলা",
    hint: "আপনজনের মতো সহজ ভাষায়",
    instruction: "Write in warm, conversational Bangla, like talking to a friend. Short natural lines, absolutely NO emojis.",
  },
  {
    id: "pro",
    label: "Professional বাংলা",
    hint: "মার্জিত ও নির্ভরযোগ্য টোন",
    instruction: "Write in a polished, professional tone. Clear benefits, trustworthy language, no slang, absolutely NO emojis.",
  },
  {
    id: "offer",
    label: "অফার ও সীমিত সময়",
    hint: "সীমিত স্টক, দ্রুত অর্ডার",
    instruction: "Create urgency: limited stock or time, a strong offer line, and a direct call to order now. Zero emojis.",
  },
  {
    id: "story",
    label: "ইমোশনাল স্টোরিটেলিং",
    hint: "বাস্তব জীবনের ছোট গল্পে প্রোডাক্ট",
    instruction: "Open with a short relatable moment, then introduce the product as the answer. End with a soft call to action. Zero emojis.",
  },
  {
    id: "short",
    label: "Short & Punchy",
    hint: "৩-৪ লাইনে সরাসরি কথা",
    instruction: "Maximum 4 short lines. One hook, one benefit, one call to action. Zero emojis.",
  },
  {
    id: "features",
    label: "ফিচার ও স্পেক্স বিবরণ",
    hint: "মাপ ও কোয়ালিটি বিস্তারিত",
    instruction: "Hook line, then clear specifications and features in clean sentences without bullet points, dashes, asterisks, or emojis, followed by price and order details.",
  },
  {
    id: "hashtags",
    label: "Hashtag-focused",
    hint: "অরগানিক রিচ বাড়ানোর জন্য",
    instruction: "Write a clean engaging post without any emojis, then add 8-12 relevant hashtags in both Bangla and English.",
  },
  {
    id: "en",
    label: "English Clean Copy",
    hint: "Clean English for social media",
    instruction: "Write in natural, engaging English suitable for a Facebook audience. Absolutely zero emojis.",
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
    `Style: ${s.label}`,
    s.instruction,
    "",
    "Product info (raw):",
    product,
    "",
    `Page name: ${page}`,
    phone ? `Order / contact number: ${phone}` : "",
    "",
    "STRICT NEGATIVE CONSTRAINTS (CRITICAL):",
    "1. ABSOLUTELY NO EMOJIS: Do NOT output any unicode emojis or symbols (strictly NO ✨, 🔥, 🚀, 💎, 📌, 👉, 🛒, ❤️, etc.). The output must contain pure plain text with zero emojis.",
    "2. NO BULLET POINTS OR SYMBOLS: Do not use bullet points, asterisks (*), or dashes (-) for listing. Write in clean, smooth sentences.",
    "3. PARAGRAPH SPACING: Separate each paragraph with a double newline (a full empty line between paragraphs). Do not merge everything into a single paragraph.",
    "4. FACTUAL ONLY: Use only the facts given in product info. Do not invent unverified claims or prices.",
    "5. End with the page name" + (phone ? " and contact number." : "."),
  ].filter(Boolean).join("\n");
}
