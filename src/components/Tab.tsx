// components/Tabs.tsx
"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

const tabs = [
  { label: "🔝 Top", path: "/" },
  { label: "📈 Best", path: "/best" },
  { label: "🆕 New", path: "/newest" },
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
              {!minimized && !isMobile && (
                <span>{tab.label.split(" ")[1]}</span>
              )}
            </span>
          </Link>
        );
      })}
    </nav>
  );

  // Hamburger for mobile
  if (isMobile) {
    return (
      <>
        <button
          className="fixed top-4 left-4 z-40 p-2 rounded bg-white shadow-md focus:outline-none"
          onClick={() => setModalOpen(true)}
          aria-label="Open navigation menu">
          <svg width="28" height="28" fill="none" viewBox="0 0 24 24">
            <path
              stroke="#333"
              strokeWidth="2"
              strokeLinecap="round"
              d="M4 7h16M4 12h16M4 17h16"
            />
          </svg>
        </button>
        {/* Modal overlay */}
        <div
          className={`fixed inset-0 z-50 bg-black bg-opacity-40 transition-opacity duration-300 ${
            modalOpen
              ? "opacity-100 pointer-events-auto"
              : "opacity-0 pointer-events-none"
          }`}>
          <div
            ref={modalRef}
            className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg p-4 transition-transform duration-300
              ${modalOpen ? "translate-x-0" : "-translate-x-full"}
            `}
            tabIndex={-1}
            aria-modal="true"
            role="dialog">
            <button
              className="mb-6 p-2 rounded hover:bg-gray-200 focus:outline-none"
              onClick={() => setModalOpen(false)}
              aria-label="Close navigation menu">
              <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
                <path
                  stroke="#333"
                  strokeWidth="2"
                  strokeLinecap="round"
                  d="M6 6l12 12M6 18L18 6"
                />
              </svg>
            </button>
            {navContent}
          </div>
        </div>
      </>
    );
  }

  // Desktop sidebar
  return (
    <div
      className={`${
        isMobile ? "fixed" : "flex"
      } left-0 top-0 h-screen z-30 bg-white border-r shadow-sm flex flex-col transition-all duration-300
        ${minimized ? "w-16" : "w-56"}
      `}>
      <button
        className="mt-4 mb-2 mx-auto p-2 rounded hover:bg-gray-200 focus:outline-none transition-colors"
        onClick={() => setMinimized(!minimized)}
        aria-label={minimized ? "Expand sidebar" : "Minimize sidebar"}>
        {minimized ? (
          <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
            <path
              stroke="#333"
              strokeWidth="2"
              strokeLinecap="round"
              d="M9 6l6 6-6 6"
            />
          </svg>
        ) : (
          <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
            <path
              stroke="#333"
              strokeWidth="2"
              strokeLinecap="round"
              d="M15 6l-6 6 6 6"
            />
          </svg>
        )}
      </button>
      {navContent}
    </div>
  );
}
