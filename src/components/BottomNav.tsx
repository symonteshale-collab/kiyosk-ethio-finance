import { Home, Camera, Users, MoreHorizontal } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface BottomNavProps {
  active: string;
  onNavigate: (page: string) => void;
}

const BottomNav = ({ active, onNavigate }: BottomNavProps) => {
  const { t } = useLanguage();

  const items = [
    { id: "home", icon: Home, label: t("home") },
    { id: "scanner", icon: Camera, label: t("scanner") },
    { id: "customers", icon: Users, label: t("customers") },
    { id: "menu", icon: MoreHorizontal, label: t("menu") },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-card border-t border-border safe-bottom z-50">
      <div className="flex items-center justify-around max-w-md mx-auto h-16">
        {items.map((item) => {
          const isActive = active === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`flex flex-col items-center gap-0.5 px-4 py-2 rounded-xl transition-colors ${
                isActive
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <item.icon size={22} strokeWidth={isActive ? 2.5 : 2} />
              <span className="text-[11px] font-medium">{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNav;
