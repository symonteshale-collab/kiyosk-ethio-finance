import React, { createContext, useContext, useState } from "react";

type Lang = "en" | "am";

const translations: Record<string, Record<Lang, string>> = {
  appName: { en: "Kiyosk", am: "ኪዮስክ" },
  home: { en: "Home", am: "መነሻ" },
  scanner: { en: "Scanner", am: "ስካነር" },
  customers: { en: "Customers", am: "ደንበኞች" },
  menu: { en: "Menu", am: "ምናሌ" },
  dashboard: { en: "Dashboard", am: "ዳሽቦርድ" },
  totalIncome: { en: "Total Income", am: "ጠቅላላ ገቢ" },
  totalExpenses: { en: "Total Expenses", am: "ጠቅላላ ወጪ" },
  outstandingDebts: { en: "Outstanding Debts", am: "ያልተከፈለ ዕዳ" },
  addTransaction: { en: "Add Transaction", am: "ግብይት ጨምር" },
  income: { en: "Income", am: "ገቢ" },
  expense: { en: "Expense", am: "ወጪ" },
  amount: { en: "Amount", am: "መጠን" },
  category: { en: "Category", am: "ምድብ" },
  date: { en: "Date", am: "ቀን" },
  description: { en: "Description", am: "መግለጫ" },
  save: { en: "Save", am: "አስቀምጥ" },
  cancel: { en: "Cancel", am: "ሰርዝ" },
  scanReceipt: { en: "Scan Receipt", am: "ደረሰኝ ስካን" },
  takePhoto: { en: "Take Photo", am: "ፎቶ አንሳ" },
  customerName: { en: "Customer Name", am: "የደንበኛ ስም" },
  amountOwed: { en: "Amount Owed", am: "የሚከፈል መጠን" },
  markPaid: { en: "Mark as Paid", am: "ተከፍሏል" },
  addCustomer: { en: "Add Customer", am: "ደንበኛ ጨምር" },
  tutorial: { en: "Tutorial", am: "መማሪያ" },
  language: { en: "Language", am: "ቋንቋ" },
  settings: { en: "Settings", am: "ቅንብሮች" },
  help: { en: "Help", am: "እርዳታ" },
  signIn: { en: "Sign In", am: "ግባ" },
  signUp: { en: "Sign Up", am: "ተመዝገብ" },
  phone: { en: "Phone Number", am: "ስልክ ቁጥር" },
  email: { en: "Email", am: "ኢሜይል" },
  password: { en: "Password", am: "የይለፍ ቃል" },
  welcome: { en: "Welcome to Kiyosk", am: "እንኳን ወደ ኪዮስክ በደህና መጡ" },
  getStarted: { en: "Get Started", am: "ጀምር" },
  next: { en: "Next", am: "ቀጣይ" },
  skip: { en: "Skip", am: "ዝለል" },
  recentTransactions: { en: "Recent Transactions", am: "የቅርብ ግብይቶች" },
  noTransactions: { en: "No transactions yet", am: "ገና ምንም ግብይት የለም" },
  noCustomers: { en: "No customers yet", am: "ገና ምንም ደንበኛ የለም" },
  birr: { en: "ETB", am: "ብር" },
  sales: { en: "Sales", am: "ሽያጭ" },
  services: { en: "Services", am: "አገልግሎት" },
  rent: { en: "Rent", am: "ኪራይ" },
  supplies: { en: "Supplies", am: "ቁሳቁስ" },
  transport: { en: "Transport", am: "ትራንስፖርት" },
  food: { en: "Food", am: "ምግብ" },
  other: { en: "Other", am: "ሌላ" },
  onboard1Title: { en: "Track Your Money", am: "ገንዘብዎን ይከታተሉ" },
  onboard1Desc: { en: "Easily record income and expenses with just a few taps", am: "ገቢ እና ወጪን በቀላሉ ይመዝግቡ" },
  onboard2Title: { en: "Scan Receipts", am: "ደረሰኞችን ይቃኙ" },
  onboard2Desc: { en: "Take photos of receipts to keep digital records", am: "ዲጂታል መዝገብ ለመያዝ የደረሰኝ ፎቶ ያንሱ" },
  onboard3Title: { en: "Track Customer Debts", am: "የደንበኛ ዕዳ ይከታተሉ" },
  onboard3Desc: { en: "Never forget who owes you money", am: "ማን እዳ እንዳለበት አይርሱ" },
  onboard4Title: { en: "See Your Progress", am: "እድገትዎን ይመልከቱ" },
  onboard4Desc: { en: "Dashboard shows your business health at a glance", am: "ዳሽቦርድ የንግድ ጤንነትዎን ያሳያል" },
  savedReceipts: { en: "Saved Receipts", am: "የተቀመጡ ደረሰኞች" },
  noReceipts: { en: "No receipts saved yet", am: "ገና ምንም ደረሰኝ አልተቀመጠም" },
  today: { en: "Today", am: "ዛሬ" },
  signOut: { en: "Sign Out", am: "ውጣ" },
};

interface LanguageContextType {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType>({
  lang: "en",
  setLang: () => {},
  t: (k) => k,
});

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lang, setLang] = useState<Lang>(() => (localStorage.getItem("kiyosk-lang") as Lang) || "en");

  const changeLang = (l: Lang) => {
    setLang(l);
    localStorage.setItem("kiyosk-lang", l);
  };

  const t = (key: string) => translations[key]?.[lang] || key;

  return (
    <LanguageContext.Provider value={{ lang, setLang: changeLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
