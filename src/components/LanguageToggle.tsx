import { useLanguage } from "@/contexts/LanguageContext";

const LanguageToggle = () => {
  const { lang, setLang } = useLanguage();

  return (
    <button
      onClick={() => setLang(lang === "en" ? "am" : "en")}
      className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-card border border-border text-xs font-semibold text-foreground hover:bg-accent transition-colors"
    >
      <span className={lang === "en" ? "text-primary" : "text-muted-foreground"}>EN</span>
      <span className="text-muted-foreground">/</span>
      <span className={lang === "am" ? "text-primary" : "text-muted-foreground"}>አማ</span>
    </button>
  );
};

export default LanguageToggle;
