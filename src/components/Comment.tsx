// components/Comment.tsx

import { getItem } from "@/app/api/api";
import { formatTime } from "@/app/utils/utils";
import { useEffect, useState } from "react";

export default function Comment({ id }: { id: number }) {
  const [comment, setComment] = useState<any>();
  const [isLoadingComment, setIsLoadingComment] = useState(true);
  const [showReplies, setShowReplies] = useState(false);
  function decodeHTMLEntities(text: string): string {
    const textarea = document.createElement("textarea");
    textarea.innerHTML = text;
    return textarea.value;
  }
  useEffect(() => {
    setIsLoadingComment(true);
    async function fetchComment() {
      if (id) {
        const comment = await getItem(id);
        // console.log(comment);
        setComment(comment);
        setIsLoadingComment(false);
      }
    }

    fetchComment();
  }, []);
  return (
    <>
      {isLoadingComment ? (
        <div className="py-3 w-full max-w-screen-md animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-1/4 mb-2 mx-2" />
          <div className="h-3 bg-gray-100 rounded w-1/2 mb-2 mx-2" />
          <div className="h-3 bg-gray-100 rounded w-3/4 mb-2 mx-2" />
          <div className="h-8 bg-gray-200 rounded w-32 mb-4 mx-2" />
          <div className="border-b border-gray-200 w-full h-px"></div>
        </div>
      ) : (
        <div className="py-3 w-full max-w-screen-md">
          <div className="text-xs text-muted-foreground mb-1 flex justify-between px-2">
            <span>{comment?.by}</span>
            <span>{formatTime(comment?.time)}</span>
          </div>
          {comment?.title && (
            <div className="prose mb-2 px-2 font-semibold">
              {comment?.title}
            </div>
          )}
          <div className="prose mb-2 px-2">
            <div
              dangerouslySetInnerHTML={{
                __html: decodeHTMLEntities(comment?.text),
              }}
            />
          </div>

          {comment?.kids?.length && (
            <button
              className="inline-flex items-center rounded-md text-sm font-medium border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2 mb-4 ml-0"
              onClick={() => {
                setShowReplies(!showReplies);
              }}
            >
              {showReplies ? "Hide" : "Show"} replies ({comment?.kids?.length})
            </button>
          )}

          <div className="border-b border-gray-200 w-full h-px"></div>

          <div className="pl-2">
            {showReplies && comment.kids && comment.kids.length > 0 && (
              <div className="space-y-2">
                {comment.kids.map((kid: number) => (
                  <Comment key={kid} id={kid} />
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
