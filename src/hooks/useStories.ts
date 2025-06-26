import { useEffect, useState } from "react";
import { getStoryIds, getItem } from "@/app/api/api";
import { StoryType } from "@/enums/enums";

export function useStories(type: StoryType) {
  const [stories, setStories] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    let isMounted = true;
    async function fetchStories() {
      setLoading(true);
      const ids = await getStoryIds(type);
      const top20 = ids.slice(0, 20);
      const storyPromises = top20.map((id) => getItem(id));
      const results = await Promise.all(storyPromises);
      if (isMounted) {
        setStories(results);
        setLoading(false);
      }
    }
    fetchStories();
    return () => {
      isMounted = false;
    };
  }, [type]);

  return { stories, loading };
}
