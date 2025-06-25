import Tabs from "@/components/Tab";

interface SidebarProps {
  minimized: boolean;
  setMinimized: (minimized: boolean) => void;
  modalOpen: boolean;
  setModalOpen: (open: boolean) => void;
  isMobile: boolean;
}

export default function Sidebar(props: SidebarProps) {
  return <Tabs {...props} />;
}
