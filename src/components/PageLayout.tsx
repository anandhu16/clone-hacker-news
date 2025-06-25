import React from "react";

export default function PageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col flex-1 bg-inherit overflow-y-hidden h-screen">
      <div className="flex text-xl border-b-1 border-gray-200 top-0 left-0 w-full bg-inherit">
        <div className="flex max-w-screen-md p-3 md:px-0 w-full md:mx-auto">
          <div className="border border-gray-300 rounded mr-2 flex justify-center items-center hover:bg-gray-200">
            <button
              data-slot="sidebar-trigger"
              className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg:not([class*='size-'])]:size-4 shrink-0 [&amp;_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50 size-7"
              data-sidebar="trigger">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-panel-left"
                aria-hidden="true">
                <rect width="18" height="18" x="3" y="3" rx="2"></rect>
                <path d="M9 3v18"></path>
              </svg>
              <span className="sr-only">Toggle Sidebar</span>
            </button>
          </div>
          CloneHN
        </div>
      </div>
      <>{children}</>
    </div>
  );
}
