import { useLanguage } from "@/contexts/LanguageContext";
import { useApp } from "@/contexts/AppContext";
import { BookOpen, Globe, Settings, HelpCircle, LogOut } from "lucide-react";

interface MenuPageProps {
  onShowTutorial: () => void;
}

const MenuPage = ({ onShowTutorial }: MenuPageProps) => {
  const { t, lang, setLang } = useLanguage();
  const { logout } = useApp();

  const items = [
    { icon: BookOpen, label: t("tutorial"), action: onShowTutorial },
    { icon: Globe, label: t("language"), action: () => setLang(lang === "en" ? "am" : "en"), extra: lang === "en" ? "English → አማርኛ" : "አማርኛ → English" },
    { icon: Settings, label: t("settings"), action: () => {} },
    { icon: HelpCircle, label: t("help"), action: () => {} },
    { icon: LogOut, label: t("signOut"), action: logout, destructive: true },
  ];

  return (
    <div className="pb-20 px-4 pt-4 max-w-md mx-auto">
      <h1 className="text-lg font-bold text-foreground mb-6">{t("menu")}</h1>

      <div className="space-y-2">
        {items.map((item, i) => (
          <button
            key={i}
            onClick={item.action}
            className={`w-full flex items-center gap-4 bg-card rounded-xl p-4 border border-border text-left transition-colors hover:bg-accent ${
              item.destructive ? "text-expense" : "text-foreground"
            }`}
          >
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${item.destructive ? "bg-destructive/10" : "bg-secondary"}`}>
              <item.icon size={20} />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium">{item.label}</p>
              {item.extra && <p className="text-xs text-muted-foreground">{item.extra}</p>}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default MenuPage;
