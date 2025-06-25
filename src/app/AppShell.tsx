"use client";
import { useState, useEffect } from "react";
import Sidebar from "@/components/Sidebar";
import { AppShellContext } from "./AppShellContext";

export default function AppShell({ children }: { children: React.ReactNode }) {
  const [minimized, setMinimized] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 850);
      setMinimized(false);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <AppShellContext.Provider
      value={{ minimized, setMinimized, modalOpen, setModalOpen, isMobile }}>
      <div className="flex full h-screen w-screen font-[family-name:var(--font-geist-sans)]">
        <Sidebar
          minimized={minimized}
          setMinimized={setMinimized}
          modalOpen={modalOpen}
          setModalOpen={setModalOpen}
          isMobile={isMobile}
        />

        {children}
      </div>
    </AppShellContext.Provider>
  );
}
