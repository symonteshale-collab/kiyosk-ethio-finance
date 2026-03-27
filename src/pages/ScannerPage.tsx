import { useLanguage } from "@/contexts/LanguageContext";
import { useApp } from "@/contexts/AppContext";
import { Button } from "@/components/ui/button";
import { Camera, Image } from "lucide-react";
import { useRef } from "react";

const ScannerPage = () => {
  const { t } = useLanguage();
  const { receipts, addReceipt } = useApp();
  const fileRef = useRef<HTMLInputElement>(null);

  const handleCapture = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      addReceipt({
        date: new Date().toISOString().split("T")[0],
        imageData: reader.result as string,
      });
    };
    reader.readAsDataURL(file);
    e.target.value = "";
  };

  return (
    <div className="pb-20 px-4 pt-4 max-w-md mx-auto">
      <h1 className="text-lg font-bold text-foreground mb-6">{t("scanReceipt")}</h1>

      <input ref={fileRef} type="file" accept="image/*" capture="environment" className="hidden" onChange={handleCapture} />

      <Button onClick={() => fileRef.current?.click()} className="w-full h-32 rounded-2xl text-base font-semibold flex-col gap-3" size="lg">
        <Camera size={32} />
        {t("takePhoto")}
      </Button>

      <div className="mt-8">
        <h2 className="text-sm font-semibold text-foreground mb-3">{t("savedReceipts")}</h2>
        {receipts.length === 0 ? (
          <div className="text-center py-12">
            <Image size={40} className="mx-auto text-muted-foreground mb-3" />
            <p className="text-sm text-muted-foreground">{t("noReceipts")}</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3">
            {receipts.map((r) => (
              <div key={r.id} className="bg-card rounded-xl border border-border overflow-hidden">
                <img src={r.imageData} alt="Receipt" className="w-full h-32 object-cover" />
                <p className="text-xs text-muted-foreground p-2">{r.date}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ScannerPage;
