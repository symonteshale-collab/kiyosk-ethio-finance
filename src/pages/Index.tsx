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

const AppShell = () => {
  const { isLoggedIn, hasSeenOnboarding } = useApp();
  const [page, setPage] = useState("home");
  const [showTutorial, setShowTutorial] = useState(false);

  if (!isLoggedIn) return <SignInPage />;
  if (!hasSeenOnboarding || showTutorial) {
    return <OnboardingPage />;
  }

  const renderPage = () => {
    switch (page) {
      case "home": return <DashboardPage />;
      case "scanner": return <ScannerPage />;
      case "customers": return <CustomersPage />;
      case "menu": return <MenuPage onShowTutorial={() => setShowTutorial(true)} />;
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
