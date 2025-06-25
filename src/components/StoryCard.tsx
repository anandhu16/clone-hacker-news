interface StoryCardProps {
  id: number;
  title: string;
  by: string;
  score: number;
  timeAgo: string;
  descendants: number;
  url: string;
}

export default function StoryCard({
  id,
  title,
  by,
  score,
  timeAgo,
  descendants,
  url,
}: StoryCardProps) {
  return (
    <div className="flex flex-col items-center mx-auto max-w-screen-md w-full ">
      <div className="flex flex-col w-full">
        <div className="text-lg">{title}</div>
        <div className="text-stone-400 mb-2 flex gap-1 md:max-w-[320px] h-5">
          <span className="flex-1 overflow-ellipsis overflow-hidden line-clamp-1">
            {by}
          </span>
        </div>
        <div className="text-sm text-stone-400 mb-2 flex gap-3 md:max-w-[320px] h-5">
          <span className="flex-1">🔼 {score}</span>
          <span className="flex-1">💬 {descendants}</span>
          <span className="flex-4">🕰️ {timeAgo}</span>
        </div>
        <div className="flex mb-2 gap-2">
          <a className="max-md:flex-1 flex" href={url}>
            <button
              data-slot="button"
              className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg:not([class*='size-'])]:size-4 [&amp;_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive bg-primary text-primary-foreground shadow-xs hover:bg-primary/90 h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5 flex-1">
              Read
            </button>
          </a>
          <a className="max-md:flex-1 flex" href={`/${id}`}>
            <button
              data-slot="button"
              className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg:not([class*='size-'])]:size-4 [&amp;_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50 h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5 flex-1">
              Discuss
            </button>
          </a>
        </div>
      </div>

      <div
        className="
          shrink-0
          h-px w-full
          bg-gray-200
          p-0 m-0
          data-[orientation=vertical]:h-full
          data-[orientation=vertical]:w-px
        "
        data-orientation="horizontal"
        role="none"
        data-slot="separator-root"
      />
    </div>
  );
}
