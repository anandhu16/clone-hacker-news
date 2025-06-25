"use client";

import StoryCard from "@/components/StoryCard";
import React from "react";
import { daysDiff } from "../utils/utils";
import { useStories } from "@/hooks/useStories";
import { StoryType } from "../enums/enums";
import PageLayout from "@/components/PageLayout";

export default function page() {
  const { stories, loading } = useStories(StoryType.New);

  console.log(stories);
  return (
    <PageLayout>
      <div className="flex flex-col gap-2.5 p-3 overflow-y-auto">
        {stories.length > 1 &&
          stories.map((item) => (
            <StoryCard
              key={item?.id}
              id={item?.id}
              title={item?.title}
              by={item?.by}
              score={149}
              descendants={item?.descendants}
              timeAgo={daysDiff(item?.time)}
              url={item?.url}
            />
          ))}
      </div>
    </PageLayout>
  );
}
