import { useEffect, useMemo, useState } from "react";
import { STYLES, buildPrompt, type Inputs } from "./lib/prompts";
import { deletePrompt, listPrompts, savePrompt, type SavedPrompt } from "./lib/api";

const field = "w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-base focus:outline-none focus:ring-2 focus:ring-brand";
const btn = "rounded-lg px-3 py-2 text-sm font-semibold transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand";

const defaultInputs: Inputs = {
  pageName: "NextStation26",
  phone: "",
  product: "ইসলামিক ক্রিস্টাল শো-পিস (উচ্চতা: ৩.৫ ইঞ্চি, দৈর্ঘ্য ও প্রস্থ: ১.৫ ইঞ্চি, সম্পূর্ণ ক্রিস্টাল, উজ্জ্বলতা কখনো নষ্ট হবে না)।",
};

function useCopy() {
  const [done, setDone] = useState<string | null>(null);
  const copy = async (key: string, text: string) => {
    try { await navigator.clipboard.writeText(text); } catch {
      const t = document.createElement("textarea"); t.value = text; document.body.appendChild(t); t.select(); document.execCommand("copy"); t.remove();
    }
    setDone(key); setTimeout(() => setDone(null), 1500);
  };
  return { done, copy };
}

export default function App() {
  const [inputs, setInputs] = useState<Inputs>(() => {
    try {
      const stored = localStorage.getItem("fbh-inputs");
      if (stored) {
        const parsed = JSON.parse(stored) as Inputs;
        if (parsed.pageName === "ArdhiMart") {
          parsed.pageName = "NextStation26";
        }
        if (parsed && (parsed.product?.trim() || parsed.pageName?.trim())) {
          return parsed;
        }
      }
    } catch { /* ignore */ }
    return defaultInputs;
  });
  const [tab, setTab] = useState<"generate" | "saved">("generate");
  const [saved, setSaved] = useState<SavedPrompt[]>([]);
  const [msg, setMsg] = useState("");
  const [q, setQ] = useState("");
  const { done, copy } = useCopy();

  useEffect(() => { try { localStorage.setItem("fbh-inputs", JSON.stringify(inputs)); } catch { /* ignore */ } }, [inputs]);
  useEffect(() => { listPrompts().then(setSaved).catch(() => setMsg("Saved prompts load করা যায়নি (DB connection check করুন)")); }, []);

  const set = (k: keyof Inputs) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setInputs({ ...inputs, [k]: e.target.value });
  const ready = inputs.product.trim().length > 0;

  const onSave = async (label: string, style: string, content: string) => {
    try {
      const row = await savePrompt({ title: `${inputs.pageName || "Prompt"} - ${label}`, style, content, pageName: inputs.pageName });
      setSaved([row, ...saved]); setMsg("Saved হয়েছে");
    } catch { setMsg("Save করা যায়নি"); }
    setTimeout(() => setMsg(""), 2500);
  };
  const onDelete = async (id: number) => {
    if (!confirm("এই prompt মুছে ফেলবেন?")) return;
    try { await deletePrompt(id); setSaved(saved.filter((s) => s.id !== id)); } catch { setMsg("Delete করা যায়নি"); }
  };
  const filtered = useMemo(() => saved.filter((s) => (s.title + s.content).toLowerCase().includes(q.toLowerCase())), [saved, q]);

  return (
    <div className="mx-auto max-w-6xl px-4 py-5 sm:px-6 sm:py-8">
      <header className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold sm:text-3xl text-slate-900">FB Post Helper</h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">১০ ধরনের প্রম্পট জেনারেটর • সম্পূর্ণ ইমোজি-মুক্ত ও ক্লিন ফরম্যাট</p>
        </div>
        <nav className="flex rounded-lg bg-white p-1 shadow-sm border border-slate-200" aria-label="Sections">
          {(["generate", "saved"] as const).map((t) => (
            <button key={t} onClick={() => setTab(t)} aria-pressed={tab === t}
              className={`${btn} ${tab === t ? "bg-brand text-white shadow-sm" : "text-slate-600 hover:bg-slate-100"}`}>
              {t === "generate" ? "Prompt বানান (১০টি)" : `Saved (${saved.length})`}
            </button>
          ))}
        </nav>
      </header>
      <p role="status" className="mt-2 min-h-6 text-sm font-medium text-ok">{msg}</p>

      {tab === "generate" ? (
        <div className="mt-2 grid gap-6 lg:grid-cols-[22rem_1fr]">
          <section className="space-y-3 self-start rounded-xl bg-white p-4 shadow-sm border border-slate-100 lg:sticky lg:top-4">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-semibold text-slate-800">পণ্যের তথ্য</h2>
              <div className="flex gap-2 text-xs">
                <button
                  type="button"
                  onClick={() => setInputs(defaultInputs)}
                  className="font-medium text-brand hover:underline cursor-pointer"
                >
                  NextStation26 নমুনা
                </button>
                <span className="text-slate-300">|</span>
                <button
                  type="button"
                  onClick={() => setInputs({ pageName: "", phone: "", product: "" })}
                  className="text-slate-500 hover:text-red-600 hover:underline cursor-pointer"
                >
                  মুছুন
                </button>
              </div>
            </div>

            <label className="block text-sm font-medium text-slate-700">পেজের নাম (Page Name)
              <input className={`${field} mt-1`} value={inputs.pageName} onChange={set("pageName")} placeholder="যেমন: NextStation26" /></label>
            <label className="block text-sm font-medium text-slate-700">মোবাইল নাম্বার (Phone / Order)
              <input className={`${field} mt-1`} inputMode="tel" value={inputs.phone} onChange={set("phone")} placeholder="01XXXXXXXXX" /></label>
            <label className="block text-sm font-medium text-slate-700">পণ্যের বিবরণ (Product raw info)
              <textarea className={`${field} mt-1 min-h-36 leading-relaxed`} value={inputs.product} onChange={set("product")}
                placeholder="নাম, মাপ, উপাদান, বিশেষত্ব, দাম..." /></label>

            <div className="rounded-lg bg-blue-50/70 p-2.5 text-xs text-slate-700 border border-blue-100">
              🛡️ <strong>কঠোর ইমোজি নিষেধাজ্ঞা:</strong> সবকটি প্রম্পটেই কোনো ধরনের ইউনিকোড ইমোজি (যেমন ✨, 🔥, 🚀, ইত্যাদি) ব্যবহার না করার স্পষ্ট শর্ত যুক্ত আছে।
            </div>
          </section>

          <section className="grid gap-4 sm:grid-cols-2">
            {!ready && <p className="rounded-xl border border-dashed border-slate-300 p-6 text-slate-500 sm:col-span-2">বাম পাশে product info লিখলে এখানে ১০ ধরনের prompt তৈরি হবে।</p>}
            {ready && STYLES.map((s) => {
              const text = buildPrompt(s, inputs);
              return (
                <article key={s.id} className="flex flex-col rounded-xl bg-white p-4 shadow-sm border border-slate-100 hover:shadow-md transition">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h2 className="font-semibold text-slate-900">{s.label}</h2>
                      <p className="text-sm text-slate-500">{s.hint}</p>
                    </div>
                    {s.badge && (
                      <span className="shrink-0 rounded bg-blue-50 px-2 py-0.5 text-xs font-semibold text-brand border border-blue-100">
                        {s.badge}
                      </span>
                    )}
                  </div>
                  <pre className="my-3 max-h-56 flex-1 overflow-auto whitespace-pre-wrap break-words rounded-lg bg-paper p-3 font-sans text-xs leading-relaxed text-slate-800 border border-slate-100">{text}</pre>
                  <div className="flex gap-2">
                    <button onClick={() => copy(s.id, text)} className={`${btn} flex-1 bg-brand text-white hover:bg-blue-700 cursor-pointer`}>
                      {done === s.id ? "✓ Copied!" : "Prompt কপি করুন"}
                    </button>
                    <button onClick={() => onSave(s.label, s.id, text)} className={`${btn} border border-ok text-ok hover:bg-green-50 cursor-pointer`}>
                      Save
                    </button>
                  </div>
                </article>
              );
            })}
          </section>
        </div>
      ) : (
        <section className="mt-2">
          <input className={`${field} mb-4 sm:max-w-sm`} value={q} onChange={(e) => setQ(e.target.value)} placeholder="Saved prompt খুঁজুন" aria-label="Search saved prompts" />
          {filtered.length === 0 && <p className="rounded-xl border border-dashed border-slate-300 p-6 text-slate-500">কোনো saved prompt নেই। Prompt বানিয়ে Save চাপুন।</p>}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((s) => (
              <article key={s.id} className="flex flex-col rounded-xl bg-white p-4 shadow-sm border border-slate-100">
                <h2 className="font-semibold text-slate-900">{s.title}</h2>
                <p className="text-xs text-slate-500">{new Date(s.createdAt).toLocaleDateString("bn-BD")}</p>
                <pre className="my-3 max-h-48 flex-1 overflow-auto whitespace-pre-wrap break-words rounded-lg bg-paper p-3 font-sans text-xs leading-relaxed text-slate-800 border border-slate-100">{s.content}</pre>
                <div className="flex gap-2">
                  <button onClick={() => copy(`s${s.id}`, s.content)} className={`${btn} flex-1 bg-brand text-white hover:bg-blue-700 cursor-pointer`}>{done === `s${s.id}` ? "✓ Copied!" : "Copy"}</button>
                  <button onClick={() => onDelete(s.id)} className={`${btn} border border-red-300 text-red-700 hover:bg-red-50 cursor-pointer`}>Delete</button>
                </div>
              </article>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
