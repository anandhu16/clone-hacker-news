// lib/api.ts
const BASE = "https://hacker-news.firebaseio.com/v0";

export async function getStoryIds(type: string): Promise<number[]> {
  const map: any = {
    top: "topstories",
    best: "beststories",
    new: "newstories",
  };
  const res = await fetch(`${BASE}/${map[type] || "topstories"}.json`);
  return res.json();
}

export async function getItem(id: number): Promise<any> {
  const res = await fetch(`${BASE}/item/${id}.json`);
  return res.json();
}
