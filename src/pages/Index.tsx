import { useState } from "react";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { AppProvider, useApp } from "@/contexts/AppContext";
import BottomNav from "@/components/BottomNav";
import SignInPage from "./SignInPage";
import OnboardingPage from "./OnboardingPage";
import DashboardPage from "./DashboardPage";
import ScannerPage from "./ScannerPage";
import CustomersPage from "./CustomersPage";
import MenuPage from "./MenuPage";
import PrivacyPolicyPage from "./PrivacyPolicyPage";

const AppShell = () => {
  const { isLoggedIn, hasSeenOnboarding } = useApp();
  const [page, setPage] = useState("home");
  const [showTutorial, setShowTutorial] = useState(false);
  const [showPrivacy, setShowPrivacy] = useState(false);

  if (!isLoggedIn) return <SignInPage />;
  if (!hasSeenOnboarding || showTutorial) {
    return <OnboardingPage onComplete={() => setShowTutorial(false)} />;
  }

  if (showPrivacy) {
    return <PrivacyPolicyPage onBack={() => setShowPrivacy(false)} />;
  }

  const renderPage = () => {
    switch (page) {
      case "home": return <DashboardPage />;
      case "scanner": return <ScannerPage />;
      case "customers": return <CustomersPage />;
      case "menu": return <MenuPage onShowTutorial={() => setShowTutorial(true)} onShowPrivacy={() => setShowPrivacy(true)} />;
      default: return <DashboardPage />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {renderPage()}
      <BottomNav active={page} onNavigate={setPage} />
    </div>
  );
};

const Index = () => (
  <LanguageProvider>
    <AppProvider>
      <AppShell />
    </AppProvider>
  </LanguageProvider>
);

export default Index;
