import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useApp } from "@/contexts/AppContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import LanguageToggle from "@/components/LanguageToggle";
import { TrendingUp, TrendingDown, AlertCircle, Plus, ArrowUpRight, ArrowDownRight } from "lucide-react";
import { motion } from "framer-motion";

const DashboardPage = () => {
  const { t } = useLanguage();
  const { totalIncome, totalExpenses, totalDebts, transactions, addTransaction } = useApp();
  const [showForm, setShowForm] = useState(false);
  const [type, setType] = useState<"income" | "expense">("income");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");

  const categories = {
    income: ["sales", "services", "other"],
    expense: ["rent", "supplies", "transport", "food", "other"],
  };

  const handleSubmit = () => {
    if (!amount || !category) return;
    addTransaction({
      type,
      amount: parseFloat(amount),
      category,
      description,
      date: new Date().toISOString().split("T")[0],
    });
    setAmount("");
    setCategory("");
    setDescription("");
    setShowForm(false);
  };

  const fmt = (n: number) => n.toLocaleString();

  return (
    <div className="pb-20 px-4 pt-4 max-w-md mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-lg font-bold text-foreground">{t("dashboard")}</h1>
        <LanguageToggle />
      </div>

      <div className="grid grid-cols-1 gap-3 mb-6">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-card rounded-2xl p-4 border border-border">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center">
              <TrendingUp size={20} className="text-income" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">{t("totalIncome")}</p>
              <p className="text-xl font-bold text-foreground">{fmt(totalIncome)} <span className="text-sm font-normal text-muted-foreground">{t("birr")}</span></p>
            </div>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-card rounded-2xl p-4 border border-border">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center">
              <TrendingDown size={20} className="text-expense" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">{t("totalExpenses")}</p>
              <p className="text-xl font-bold text-foreground">{fmt(totalExpenses)} <span className="text-sm font-normal text-muted-foreground">{t("birr")}</span></p>
            </div>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-card rounded-2xl p-4 border border-border">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center">
              <AlertCircle size={20} className="text-debt" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">{t("outstandingDebts")}</p>
              <p className="text-xl font-bold text-foreground">{fmt(totalDebts)} <span className="text-sm font-normal text-muted-foreground">{t("birr")}</span></p>
            </div>
          </div>
        </motion.div>
      </div>

      <Button onClick={() => setShowForm(!showForm)} className="w-full h-14 rounded-xl text-base font-semibold mb-6" size="lg">
        <Plus size={20} className="mr-2" />
        {t("addTransaction")}
      </Button>

      {showForm && (
        <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="bg-card rounded-2xl p-4 border border-border mb-6 space-y-3">
          <div className="flex gap-2">
            <button
              onClick={() => setType("income")}
              className={`flex-1 py-3 rounded-xl text-sm font-medium transition-colors ${
                type === "income" ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground"
              }`}
            >
              {t("income")}
            </button>
            <button
              onClick={() => setType("expense")}
              className={`flex-1 py-3 rounded-xl text-sm font-medium transition-colors ${
                type === "expense" ? "bg-destructive text-destructive-foreground" : "bg-secondary text-secondary-foreground"
              }`}
            >
              {t("expense")}
            </button>
          </div>
          <Input value={amount} onChange={(e) => setAmount(e.target.value)} placeholder={t("amount")} type="number" className="h-12 rounded-xl bg-background" />
          <div className="flex flex-wrap gap-2">
            {categories[type].map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`px-3 py-2 rounded-xl text-xs font-medium transition-colors ${
                  category === cat ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground"
                }`}
              >
                {t(cat)}
              </button>
            ))}
          </div>
          <Input value={description} onChange={(e) => setDescription(e.target.value)} placeholder={t("description")} className="h-12 rounded-xl bg-background" />
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => setShowForm(false)} className="flex-1 h-12 rounded-xl">{t("cancel")}</Button>
            <Button onClick={handleSubmit} className="flex-1 h-12 rounded-xl">{t("save")}</Button>
          </div>
        </motion.div>
      )}

      <div>
        <h2 className="text-sm font-semibold text-foreground mb-3">{t("recentTransactions")}</h2>
        {transactions.length === 0 ? (
          <p className="text-sm text-muted-foreground text-center py-8">{t("noTransactions")}</p>
        ) : (
          <div className="space-y-2">
            {transactions.slice(0, 10).map((tx) => (
              <div key={tx.id} className="flex items-center justify-between bg-card rounded-xl p-3 border border-border">
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${tx.type === "income" ? "bg-secondary" : "bg-destructive/10"}`}>
                    {tx.type === "income" ? <ArrowUpRight size={16} className="text-income" /> : <ArrowDownRight size={16} className="text-expense" />}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">{t(tx.category)}</p>
                    <p className="text-xs text-muted-foreground">{tx.date}</p>
                  </div>
                </div>
                <span className={`text-sm font-semibold ${tx.type === "income" ? "text-income" : "text-expense"}`}>
                  {tx.type === "income" ? "+" : "-"}{fmt(tx.amount)}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardPage;
