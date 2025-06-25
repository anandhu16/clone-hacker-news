// components/Comment.tsx

import { daysDiff } from "@/app/utils/utils";

export default function Comment({ comment }: { comment: any }) {
  return (
    <div className="border-l-2 pl-4 ml-2 text-sm">
      <p className="text-gray-700 mb-1">
        <span className="font-medium">{comment.by}</span> •{" "}
        {daysDiff(comment.time)}
      </p>
      <div
        className="mb-2 text-gray-800"
        dangerouslySetInnerHTML={{ __html: comment.text }}
      />

      {comment.replies && comment.replies.length > 0 && (
        <div className="mt-2 space-y-2">
          {comment.replies.map((reply: any) => (
            <Comment key={reply.id} comment={reply} />
          ))}
        </div>
      )}
    </div>
  );
}
