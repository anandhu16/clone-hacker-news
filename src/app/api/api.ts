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

// Fetch only top-level comments without recursive replies
export async function getTopLevelComments(
  commentIds: number[]
): Promise<any[]> {
  const comments = await Promise.all(commentIds.map(getItem));
  return comments.filter(
    (comment) => comment && !comment.deleted && !comment.dead
  );
}

//Api for Recursive Call of Comments
export async function getCommentTree(id: number): Promise<any | null> {
  const comment = await getItem(id);
  if (!comment || comment.deleted || comment.dead) return null;

  let replies: any[] = [];
  if (comment.kids && comment.kids.length > 0) {
    replies = await Promise.all(comment.kids.map(getCommentTree));
  }

  return { ...comment, replies: replies.filter(Boolean) };
}
