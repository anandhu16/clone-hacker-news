import { createContext, useContext } from "react";

interface AppShellContextProps {
  minimized: boolean;
  setMinimized: React.Dispatch<React.SetStateAction<boolean>>;
  modalOpen: boolean;
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isMobile: boolean;
}

export const AppShellContext = createContext<AppShellContextProps | null>(null);

export const useAppShell = () => {
  const context = useContext(AppShellContext);
  if (!context)
    throw new Error("useAppShell must be used within AppShellContext.Provider");
  return context;
};
