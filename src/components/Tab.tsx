// components/Tabs.tsx
"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

const tabs = [
  { label: "🔝 Top Stories", path: "/" },
  { label: "📈 Best Stories", path: "/best" },
  { label: "🆕 Newest Stories", path: "/newest" },
];

interface TabsProps {
  minimized: boolean;
  setMinimized: (minimized: boolean) => void;
  modalOpen: boolean;
  setModalOpen: (open: boolean) => void;
  isMobile: boolean;
}

export default function Tabs({
  minimized,
  setMinimized,
  modalOpen,
  setModalOpen,
  isMobile,
}: TabsProps) {
  const pathname = usePathname();
  const modalRef = useRef<HTMLDivElement>(null);

  // Close modal on outside click or ESC
  useEffect(() => {
    if (!modalOpen) return;
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") setModalOpen(false);
    }
    function handleClick(e: MouseEvent) {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        setModalOpen(false);
      }
    }
    document.addEventListener("keydown", handleKey);
    document.addEventListener("mousedown", handleClick);
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.removeEventListener("mousedown", handleClick);
    };
  }, [modalOpen, setModalOpen]);

  // Sidebar content
  const navContent = (
    <nav className="flex flex-col gap-2 mt-8">
      {tabs.map((tab) => {
        const isActive = pathname === tab.path;
        return (
          <Link
            key={tab.path}
            href={tab.path}
            onClick={() => setModalOpen(false)}>
            <span
              className={`flex items-center gap-2 px-4 py-2 rounded cursor-pointer transition-colors duration-200
                ${
                  isActive
                    ? "font-bold text-blue-500 bg-blue-100"
                    : "hover:bg-gray-100"
                }
                ${minimized && !isMobile ? "justify-center" : ""}
              `}>
              <span className="text-xl">{tab.label.split(" ")[0]}</span>
              {!minimized && <span>{tab.label.split(" ")[1]}</span>}
            </span>
          </Link>
        );
      })}
    </nav>
  );

  

  // --- Sidebar Transitions ---
  // Both sidebars are always rendered, but only one is visible at a time with transitions
  return (
    <>
      {/* Mobile Sidebar (Modal) */}
      <div
        className={`fixed inset-0 z-50 bg-black/40 backdrop-blur transition-opacity duration-300
          ${
            isMobile && modalOpen
              ? "opacity-100 pointer-events-auto"
              : "opacity-0 pointer-events-none"
          }
        `}
        style={{ transitionProperty: "opacity" }}>
        <div
          ref={modalRef}
          className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg transition-transform duration-300
            ${isMobile && modalOpen ? "translate-x-0" : "-translate-x-full"}
          `}
          tabIndex={-1}
          aria-modal="true"
          role="dialog"
          style={{ transitionProperty: "transform" }}>
          <div className="flex text-xl border-b-1 border-gray-200 top-0 left-0 w-full bg-inherit">
            <div className="flex max-w-screen-md p-3 md:px-0 w-full md:mx-auto">
              <div className="border border-gray-300 rounded mr-2 flex justify-center items-center hover:bg-gray-200">
                <button
                  data-slot="sidebar-trigger"
                  className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50 size-7"
                  data-sidebar="trigger"
                  onClick={() =>
                    isMobile
                      ? setModalOpen(!modalOpen)
                      : setMinimized(!minimized)
                  }>
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
          {navContent}
        </div>
      </div>

      {/* Desktop Sidebar */}
      <div
        className={`left-0 top-0 h-screen z-30 bg-white border-r shadow-sm flex flex-col transition-all duration-300
          ${!isMobile ? "flex" : "fixed opacity-0 pointer-events-none"}
          ${minimized ? "w-16" : "w-56"}
        `}
        style={{ transitionProperty: "all" }}>
        {navContent}
      </div>
    </>
  );
}
