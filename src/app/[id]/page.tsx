"use client";
import Comment from "@/components/Comment";
import { useEffect, useState } from "react";
import { getCommentTree, getItem } from "../api/api";
import { daysDiff } from "../utils/utils";
import React from "react";

export default function StoryPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = React.use(params);
  const [story, setStory] = useState<any>(null);
  const [comments, setComments] = useState<any[]>([]);

  useEffect(() => {
    if (!id) return;
    const storyId = Number(id);

    async function fetchStory() {
      const data = await getItem(storyId);
      setStory(data);

      if (data?.kids) {
        const topComments = await Promise.all(data.kids.map(getCommentTree));
        setComments(topComments.filter(Boolean));
      }
    }

    fetchStory();
  }, [id]);

  if (!story) return <p className="p-4">Loading story...</p>;

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h1 className="text-2xl font-semibold mb-1">{story.title}</h1>
      <p className="text-sm text-gray-600 mb-4">
        by {story.by} • {daysDiff(story.time)} • {story.descendants} comments
      </p>
      <a
        href={story.url}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-600 underline">
        Read Original
      </a>

      <hr className="my-6" />

      <h2 className="text-lg font-semibold mb-2">Comments</h2>
      <div className="space-y-4">
        {comments.map((c) => (
          <Comment key={c.id} comment={c} />
        ))}
      </div>
    </div>
  );
}
