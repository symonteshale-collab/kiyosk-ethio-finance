import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useApp } from "@/contexts/AppContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, UserPlus, Check, Users } from "lucide-react";
import { motion } from "framer-motion";

const CustomersPage = () => {
  const { t } = useLanguage();
  const { customers, addCustomer, toggleCustomerPaid } = useApp();
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");

  const handleAdd = () => {
    if (!name || !amount) return;
    addCustomer({ name, amountOwed: parseFloat(amount) });
    setName("");
    setAmount("");
    setShowForm(false);
  };

  const fmt = (n: number) => n.toLocaleString();

  return (
    <div className="pb-20 px-4 pt-4 max-w-md mx-auto">
      <h1 className="text-lg font-bold text-foreground mb-6">{t("customers")}</h1>

      <Button onClick={() => setShowForm(!showForm)} className="w-full h-14 rounded-xl text-base font-semibold mb-6" size="lg">
        <UserPlus size={20} className="mr-2" />
        {t("addCustomer")}
      </Button>

      {showForm && (
        <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="bg-card rounded-2xl p-4 border border-border mb-6 space-y-3">
          <Input value={name} onChange={(e) => setName(e.target.value)} placeholder={t("customerName")} className="h-12 rounded-xl bg-background" />
          <Input value={amount} onChange={(e) => setAmount(e.target.value)} placeholder={t("amountOwed")} type="number" className="h-12 rounded-xl bg-background" />
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => setShowForm(false)} className="flex-1 h-12 rounded-xl">{t("cancel")}</Button>
            <Button onClick={handleAdd} className="flex-1 h-12 rounded-xl">{t("save")}</Button>
          </div>
        </motion.div>
      )}

      {customers.length === 0 ? (
        <div className="text-center py-12">
          <Users size={40} className="mx-auto text-muted-foreground mb-3" />
          <p className="text-sm text-muted-foreground">{t("noCustomers")}</p>
        </div>
      ) : (
        <div className="space-y-2">
          {customers.map((c) => (
            <div key={c.id} className={`flex items-center justify-between bg-card rounded-xl p-4 border border-border ${c.paid ? "opacity-60" : ""}`}>
              <div>
                <p className="text-sm font-medium text-foreground">{c.name}</p>
                <p className={`text-lg font-bold ${c.paid ? "text-muted-foreground line-through" : "text-debt"}`}>
                  {fmt(c.amountOwed)} <span className="text-xs font-normal">{t("birr")}</span>
                </p>
              </div>
              <button
                onClick={() => toggleCustomerPaid(c.id)}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold transition-colors ${
                  c.paid
                    ? "bg-secondary text-secondary-foreground"
                    : "bg-primary text-primary-foreground"
                }`}
              >
                <Check size={14} />
                {t("markPaid")}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CustomersPage;
