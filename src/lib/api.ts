export interface SavedPrompt {
  id: number; title: string; style: string; content: string; pageName: string | null; createdAt: string;
}
const json = { "Content-Type": "application/json" };
export async function listPrompts(): Promise<SavedPrompt[]> {
  const r = await fetch("/api/prompts");
  if (!r.ok) throw new Error("Could not load saved prompts");
  return r.json();
}
export async function savePrompt(p: { title: string; style: string; content: string; pageName: string }): Promise<SavedPrompt> {
  const r = await fetch("/api/prompts", { method: "POST", headers: json, body: JSON.stringify(p) });
  if (!r.ok) throw new Error("Could not save prompt");
  return r.json();
}
export async function deletePrompt(id: number): Promise<void> {
  const r = await fetch(`/api/prompts?id=${id}`, { method: "DELETE" });
  if (!r.ok) throw new Error("Could not delete prompt");
}
