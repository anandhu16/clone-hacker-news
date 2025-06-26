"use client";
import Comment from "@/components/Comment";
import PageLayout from "@/components/PageLayout";
import React, { useEffect, useState } from "react";
import { getItem } from "../api/api";
import { daysDiff } from "../utils/utils";

export default function StoryPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = React.use(params);
  const [story, setStory] = useState<any>(null);

  function decodeHTMLEntities(text: string): string {
    const textarea = document.createElement("textarea");
    textarea.innerHTML = text;
    return textarea.value;
  }

  // Load story immediately
  useEffect(() => {
    if (!id) return;
    const storyId = Number(id);

    async function fetchStory() {
      const data = await getItem(storyId);
      console.log(data);

      setStory(data);
    }

    fetchStory();
  }, [id]);

  return (
    <PageLayout>
      <div className="px-3 py-2.5 flex flex-col items-center w-full overflow-y-auto overflow-x-hidden">
        {story && (
          <>
            <div
              data-slot="card"
              className="bg-card text-card-foreground flex flex-col gap-6 rounded-xl border py-6 shadow-sm max-w-screen-md w-full mb-4"
            >
              <div
                data-slot="card-header"
                className="@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-1.5 px-6 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6"
              >
                <div
                  data-slot="card-title"
                  className="leading-none font-semibold"
                >
                  {story?.title}
                </div>
                <div
                  data-slot="card-description"
                  className="text-muted-foreground text-sm flex gap-2 "
                >
                  <div>{`👤 ${story?.by}`}</div>
                  {story?.url && (
                    <a
                      href={story.url}
                      className="underline text-gray-500 text-sm"
                      target="_blank"
                    >
                      {new URL(story.url).origin}
                    </a>
                  )}
                </div>
                {story?.text && (
                  <div
                    data-slot="card-content"
                    className="px-6 markdown-content"
                  >
                    <div
                      dangerouslySetInnerHTML={{
                        __html: decodeHTMLEntities(story?.text),
                      }}
                    />
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-4">
              {story?.kids?.map((c: any) => (
                <Comment key={c} id={c} />
              ))}
            </div>
          </>
        )}
      </div>
    </PageLayout>
  );
}
