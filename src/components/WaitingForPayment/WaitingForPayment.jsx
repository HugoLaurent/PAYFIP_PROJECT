import { useEffect } from "react";
import { IconButton } from "@/components";

export default function WaitingForPayment({ idop, onSuccess }) {
  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        const res = await fetch(`/api/payment-status/${idop}`);
        if (res.status === 200) {
          clearInterval(interval);
          onSuccess();
        }
      } catch (err) {
        console.error("Erreur polling:", err);
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [idop, onSuccess]);

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow rounded-lg text-center">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">
        Paiement en cours
      </h2>
      <p className="text-gray-600 mb-6">
        Vous allez être redirigé vers PayFIP. Cette page détectera
        automatiquement le paiement.
      </p>
      <IconButton isLoading disabled color="gray">
        En attente de votre paiement...
      </IconButton>
    </div>
  );
}
