import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useApp } from "@/contexts/AppContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import LanguageToggle from "@/components/LanguageToggle";
import { Phone, Mail } from "lucide-react";

const SignInPage = () => {
  const { t } = useLanguage();
  const { login } = useApp();
  const [mode, setMode] = useState<"phone" | "email">("phone");
  const [isSignUp, setIsSignUp] = useState(false);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 bg-background">
      <div className="absolute top-4 right-4">
        <LanguageToggle />
      </div>

      <div className="w-full max-w-sm animate-fade-in">
        <div className="text-center mb-10">
          <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center mx-auto mb-4">
            <span className="text-primary-foreground font-bold text-2xl">K</span>
          </div>
          <h1 className="text-2xl font-bold text-foreground">{t("appName")}</h1>
          <p className="text-muted-foreground text-sm mt-1">{t("welcome")}</p>
        </div>

        <div className="flex gap-2 mb-6">
          <button
            onClick={() => setMode("phone")}
            className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-medium transition-colors ${
              mode === "phone" ? "bg-primary text-primary-foreground" : "bg-card text-foreground border border-border"
            }`}
          >
            <Phone size={16} />
            {t("phone")}
          </button>
          <button
            onClick={() => setMode("email")}
            className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-medium transition-colors ${
              mode === "email" ? "bg-primary text-primary-foreground" : "bg-card text-foreground border border-border"
            }`}
          >
            <Mail size={16} />
            {t("email")}
          </button>
        </div>

        <div className="space-y-3">
          {mode === "phone" ? (
            <Input
              placeholder="+251 9XX XXX XXXX"
              type="tel"
              className="h-14 text-base rounded-xl bg-card"
            />
          ) : (
            <Input
              placeholder={t("email")}
              type="email"
              className="h-14 text-base rounded-xl bg-card"
            />
          )}
          <Input
            placeholder={t("password")}
            type="password"
            className="h-14 text-base rounded-xl bg-card"
          />
        </div>

        <Button
          onClick={login}
          className="w-full h-14 text-base font-semibold rounded-xl mt-6"
          size="lg"
        >
          {isSignUp ? t("signUp") : t("signIn")}
        </Button>

        <button
          onClick={() => setIsSignUp(!isSignUp)}
          className="w-full text-center text-sm text-primary font-medium mt-4 py-2"
        >
          {isSignUp ? t("signIn") : t("signUp")}
        </button>
      </div>
    </div>
  );
};

export default SignInPage;
