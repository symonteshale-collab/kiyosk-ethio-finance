import { useLanguage } from "@/contexts/LanguageContext";
import { ArrowLeft, Database, Eye, Lock, Shield, UserX, Calendar } from "lucide-react";

interface PrivacyPolicyPageProps {
  onBack: () => void;
}

const Section = ({
  icon: Icon,
  title,
  description,
}: {
  icon: React.ElementType;
  title: string;
  description: string;
}) => (
  <div className="flex gap-4 bg-card rounded-2xl p-5 border border-border mb-3">
    <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center shrink-0">
      <Icon size={22} className="text-primary" />
    </div>
    <div>
      <h2 className="text-sm font-semibold text-foreground mb-1.5">{title}</h2>
      <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
    </div>
  </div>
);

const PrivacyPolicyPage = ({ onBack }: PrivacyPolicyPageProps) => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 bg-background/95 backdrop-blur-sm z-10 border-b border-border">
        <div className="flex items-center gap-3 px-4 h-14 max-w-md mx-auto">
          <button
            onClick={onBack}
            className="w-9 h-9 rounded-xl bg-card border border-border flex items-center justify-center active:scale-95 transition-transform"
          >
            <ArrowLeft size={18} className="text-foreground" />
          </button>
          <h1 className="text-base font-bold text-foreground">{t("privacyPolicy")}</h1>
        </div>
      </div>

      <div className="px-4 pt-4 pb-8 max-w-md mx-auto animate-fade-in">
        <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
          {t("privacyIntro")}
        </p>

        <Section
          icon={Database}
          title={t("dataWeCollect")}
          description={t("dataWeCollectDesc")}
        />
        <Section
          icon={Eye}
          title={t("howWeUse")}
          description={t("howWeUseDesc")}
        />
        <Section
          icon={Lock}
          title={t("storedCredentials")}
          description={t("storedCredentialsDesc")}
        />
        <Section
          icon={Shield}
          title={t("analyticsAndAds")}
          description={t("analyticsAndAdsDesc")}
        />
        <Section
          icon={UserX}
          title={t("yourRights")}
          description={t("yourRightsDesc")}
        />

        <div className="flex items-center justify-center gap-2 mt-6 text-xs text-muted-foreground">
          <Calendar size={14} />
          {t("lastUpdated")}
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicyPage;
