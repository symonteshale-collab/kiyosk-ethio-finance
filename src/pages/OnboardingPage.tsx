import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useApp } from "@/contexts/AppContext";
import { Button } from "@/components/ui/button";
import { TrendingUp, Camera, Users, BarChart3 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const OnboardingPage = ({ onComplete }: { onComplete?: () => void }) => {
  const { t } = useLanguage();
  const { completeOnboarding } = useApp();

  const finish = () => {
    completeOnboarding();
    onComplete?.();
  };
  const [step, setStep] = useState(0);

  const steps = [
    { icon: TrendingUp, title: t("onboard1Title"), desc: t("onboard1Desc"), color: "text-income" },
    { icon: Camera, title: t("onboard2Title"), desc: t("onboard2Desc"), color: "text-primary" },
    { icon: Users, title: t("onboard3Title"), desc: t("onboard3Desc"), color: "text-debt" },
    { icon: BarChart3, title: t("onboard4Title"), desc: t("onboard4Desc"), color: "text-primary" },
  ];

  const current = steps[step];

  return (
    <div className="min-h-screen flex flex-col items-center justify-between px-6 py-12 bg-background">
      <button onClick={finish} className="self-end text-sm text-muted-foreground font-medium">
        {t("skip")}
      </button>

      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -40 }}
          transition={{ duration: 0.3 }}
          className="flex flex-col items-center text-center flex-1 justify-center"
        >
          <div className="w-24 h-24 rounded-3xl bg-card border border-border flex items-center justify-center mb-8">
            <current.icon size={40} className={current.color} />
          </div>
          <h2 className="text-xl font-bold text-foreground mb-3">{current.title}</h2>
          <p className="text-muted-foreground text-sm max-w-xs">{current.desc}</p>
        </motion.div>
      </AnimatePresence>

      <div className="w-full max-w-sm space-y-4">
        <div className="flex justify-center gap-2">
          {steps.map((_, i) => (
            <div
              key={i}
              className={`h-1.5 rounded-full transition-all ${
                i === step ? "w-8 bg-primary" : "w-2 bg-border"
              }`}
            />
          ))}
        </div>
        <Button
          onClick={() => (step < steps.length - 1 ? setStep(step + 1) : completeOnboarding())}
          className="w-full h-14 text-base font-semibold rounded-xl"
          size="lg"
        >
          {step < steps.length - 1 ? t("next") : t("getStarted")}
        </Button>
      </div>
    </div>
  );
};

export default OnboardingPage;
