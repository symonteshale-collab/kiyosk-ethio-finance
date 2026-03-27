import React, { createContext, useContext, useState, useEffect } from "react";

export interface Transaction {
  id: string;
  type: "income" | "expense";
  amount: number;
  category: string;
  description: string;
  date: string;
}

export interface Customer {
  id: string;
  name: string;
  amountOwed: number;
  paid: boolean;
}

export interface Receipt {
  id: string;
  date: string;
  imageData: string;
}

interface AppState {
  transactions: Transaction[];
  customers: Customer[];
  receipts: Receipt[];
  isLoggedIn: boolean;
  hasSeenOnboarding: boolean;
}

interface AppContextType extends AppState {
  addTransaction: (t: Omit<Transaction, "id">) => void;
  addCustomer: (c: Omit<Customer, "id" | "paid">) => void;
  toggleCustomerPaid: (id: string) => void;
  addReceipt: (r: Omit<Receipt, "id">) => void;
  login: () => void;
  logout: () => void;
  completeOnboarding: () => void;
  totalIncome: number;
  totalExpenses: number;
  totalDebts: number;
}

const AppContext = createContext<AppContextType>({} as AppContextType);

const loadState = (): AppState => {
  try {
    const saved = localStorage.getItem("kiyosk-data");
    if (saved) return JSON.parse(saved);
  } catch {}
  return {
    transactions: [],
    customers: [],
    receipts: [],
    isLoggedIn: false,
    hasSeenOnboarding: false,
  };
};

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<AppState>(loadState);

  useEffect(() => {
    localStorage.setItem("kiyosk-data", JSON.stringify(state));
  }, [state]);

  const addTransaction = (t: Omit<Transaction, "id">) => {
    setState((s) => ({ ...s, transactions: [{ ...t, id: crypto.randomUUID() }, ...s.transactions] }));
  };

  const addCustomer = (c: Omit<Customer, "id" | "paid">) => {
    setState((s) => ({ ...s, customers: [{ ...c, id: crypto.randomUUID(), paid: false }, ...s.customers] }));
  };

  const toggleCustomerPaid = (id: string) => {
    setState((s) => ({
      ...s,
      customers: s.customers.map((c) => (c.id === id ? { ...c, paid: !c.paid } : c)),
    }));
  };

  const addReceipt = (r: Omit<Receipt, "id">) => {
    setState((s) => ({ ...s, receipts: [{ ...r, id: crypto.randomUUID() }, ...s.receipts] }));
  };

  const login = () => setState((s) => ({ ...s, isLoggedIn: true }));
  const logout = () => setState((s) => ({ ...s, isLoggedIn: false }));
  const completeOnboarding = () => setState((s) => ({ ...s, hasSeenOnboarding: true }));

  const totalIncome = state.transactions.filter((t) => t.type === "income").reduce((a, t) => a + t.amount, 0);
  const totalExpenses = state.transactions.filter((t) => t.type === "expense").reduce((a, t) => a + t.amount, 0);
  const totalDebts = state.customers.filter((c) => !c.paid).reduce((a, c) => a + c.amountOwed, 0);

  return (
    <AppContext.Provider
      value={{
        ...state,
        addTransaction,
        addCustomer,
        toggleCustomerPaid,
        addReceipt,
        login,
        logout,
        completeOnboarding,
        totalIncome,
        totalExpenses,
        totalDebts,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
