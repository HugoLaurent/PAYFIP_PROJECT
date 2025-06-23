import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { motion as Motion } from "framer-motion";
import { ScanLine, ShoppingCart, Ticket } from "lucide-react";
import { IconButton, QrScanner, AgentTicketForm } from "@/components"; // ⬅️ BookingFlow à importer

export default function Dashboard() {
  const { serviceId } = useParams();
  const [currentView, setCurrentView] = useState("menu");
  const [stepAchat, setStepAchat] = useState(0); // ⬅️ pour le flow d’achat
  const [service, setService] = useState(null);

  useEffect(() => {
    const fetchService = async () => {
      try {
        const token = localStorage.getItem("authToken");
        const res = await fetch("/api/test", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        const found = data.services.find((s) => s.id.toString() === serviceId);
        setService(found);
        console.log("Service chargé :", service);
      } catch (err) {
        console.error("Erreur chargement service", err);
      }
    };

    fetchService();
  }, [serviceId]);

  if (!service)
    return <div className="text-center py-20">Chargement du service...</div>;

  if (currentView === "scanner")
    return <QrScanner onBackToMenu={() => setCurrentView("menu")} />;

  if (currentView === "purchase")
    return (
      <div className="max-w-xl mx-auto py-8 px-4">
        <button
          onClick={() => {
            setCurrentView("menu");
            setStepAchat(0);
          }}
          className="text-blue-600 underline mb-4"
        >
          ← Retour au menu
        </button>
        <AgentTicketForm
          tarifs={service?.prix}
          serviceId={service?.id} // ⬅️ nécessaire
          onBack={() => setCurrentView("menu")}
        />
      </div>
    );

  return (
    <main className="flex flex-col items-center gap-8 max-w-lg mx-auto py-8 px-4">
      <Motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <div className="mb-6">
          <div className="text-6xl mb-4">🎫</div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {service.titre}
          </h1>
          <p className="text-gray-600">
            Gérez vos billets et validez les entrées
          </p>
        </div>
      </Motion.div>

      <Motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="w-full space-y-4"
      >
        <IconButton
          icon={ScanLine}
          onClick={() => setCurrentView("scanner")}
          color="blue"
          className="w-full justify-center text-lg py-4"
        >
          Scanner un QR Code
        </IconButton>
        <IconButton
          icon={ShoppingCart}
          onClick={() => setCurrentView("purchase")}
          color="green"
          className="w-full justify-center text-lg py-4"
        >
          Acheter des billets
        </IconButton>
      </Motion.div>

      <Motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="w-full mt-8"
      >
        <div className="grid grid-cols-3 gap-4 text-center">
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <Ticket className="w-8 h-8 text-green-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-green-600">89</div>
            <div className="text-xs text-gray-600">Tickets attendus</div>
          </div>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <ScanLine className="w-8 h-8 text-blue-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-blue-600">154</div>
            <div className="text-xs text-gray-600">Tickets scannés</div>
          </div>
          <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
            <Ticket className="w-8 h-8 text-purple-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-purple-600">182</div>
            <div className="text-xs text-gray-600">Total tickets</div>
          </div>
        </div>
      </Motion.div>
    </main>
  );
}
