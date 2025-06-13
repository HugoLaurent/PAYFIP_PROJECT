import { useState } from "react";
import { motion as Motion } from "framer-motion";
import {
  CheckCircle,
  Calendar,
  MapPin,
  ShoppingCart,
  CreditCard,
  ArrowLeft,
} from "lucide-react";
import { IconButton } from "@/components";
// Types de billets et événements
const evenements = [
  {
    id: 1,
    nom: "Concert Rock Festival",
    date: "2025-07-15",
    lieu: "Stade de France",
    image: "🎸",
    billets: [
      { type: "Standard", prix: 45, description: "Accès général" },
      { type: "VIP", prix: 85, description: "Accès VIP + boissons" },
      {
        type: "Premium",
        prix: 120,
        description: "Première rangée + backstage",
      },
    ],
  },
  {
    id: 2,
    nom: "Spectacle de Danse",
    date: "2025-07-22",
    lieu: "Opéra de Paris",
    image: "🩰",
    billets: [
      { type: "Balcon", prix: 25, description: "Vue balcon" },
      { type: "Orchestre", prix: 55, description: "Places orchestre" },
      { type: "Loge", prix: 95, description: "Loge privée" },
    ],
  },
  {
    id: 3,
    nom: "Match de Football",
    date: "2025-08-05",
    lieu: "Parc des Princes",
    image: "⚽",
    billets: [
      { type: "Tribune", prix: 35, description: "Tribune populaire" },
      { type: "Carré VIP", prix: 75, description: "Carré VIP" },
      { type: "Loge", prix: 150, description: "Loge premium" },
    ],
  },
];
export default function TicketByAgent({ onBackToMenu }) {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [purchaseStep, setPurchaseStep] = useState("events"); // 'events', 'tickets', 'checkout', 'success'
  const [customerInfo, setCustomerInfo] = useState({
    nom: "",
    email: "",
    telephone: "",
  });

  const handleEventSelect = (event) => {
    setSelectedEvent(event);
    setPurchaseStep("tickets");
  };

  const handleTicketSelect = (ticket) => {
    setSelectedTicket(ticket);
    setPurchaseStep("checkout");
  };

  const handlePurchase = () => {
    // Simuler l'achat
    setTimeout(() => {
      setPurchaseStep("success");
    }, 2000);
  };

  const resetPurchase = () => {
    setSelectedEvent(null);
    setSelectedTicket(null);
    setQuantity(1);
    setPurchaseStep("events");
    setCustomerInfo({ nom: "", email: "", telephone: "" });
  };

  if (purchaseStep === "success") {
    return (
      <main className="flex flex-col items-center gap-8 max-w-lg mx-auto py-8 px-4">
        <Motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center bg-green-50 border-2 border-green-200 p-8 rounded-lg w-full"
        >
          <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Achat réussi !
          </h1>
          <p className="text-gray-600 mb-4">
            Vos billets ont été envoyés par email
          </p>
          <div className="bg-white border border-gray-200 rounded-lg p-4 mb-6">
            <p className="font-semibold">{selectedEvent?.nom}</p>
            <p className="text-sm text-gray-600">
              {selectedTicket?.type} × {quantity}
            </p>
            <p className="text-lg font-bold text-green-600">
              Total: {(selectedTicket?.prix * quantity).toFixed(2)} €
            </p>
          </div>
          <div className="space-y-3">
            <IconButton
              icon={ShoppingCart}
              onClick={resetPurchase}
              color="blue"
              className="w-full justify-center"
            >
              Acheter d'autres billets
            </IconButton>
            <IconButton
              icon={ArrowLeft}
              onClick={onBackToMenu}
              color="gray"
              className="w-full justify-center"
            >
              Retour au menu
            </IconButton>
          </div>
        </Motion.div>
      </main>
    );
  }

  return (
    <main className="flex flex-col gap-6 max-w-lg mx-auto py-8 px-4">
      <Motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <div className="flex items-center justify-between mb-4">
          <IconButton
            icon={ArrowLeft}
            onClick={
              purchaseStep === "events"
                ? onBackToMenu
                : () => {
                    if (purchaseStep === "tickets") setPurchaseStep("events");
                    else if (purchaseStep === "checkout")
                      setPurchaseStep("tickets");
                  }
            }
            color="gray"
          >
            Retour
          </IconButton>
          <h1 className="text-2xl font-bold text-gray-900">
            {purchaseStep === "events" && "Choisir un événement"}
            {purchaseStep === "tickets" && "Choisir vos billets"}
            {purchaseStep === "checkout" && "Finaliser l'achat"}
          </h1>
          <div className="w-20"></div>
        </div>
      </Motion.div>

      {purchaseStep === "events" && (
        <Motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="space-y-4"
        >
          {evenements.map((event) => (
            <div
              key={event.id}
              onClick={() => handleEventSelect(event)}
              className="border-2 border-gray-200 rounded-lg p-4 bg-white hover:border-blue-300 hover:shadow-md transition-all cursor-pointer"
            >
              <div className="flex items-start gap-4">
                <div className="text-4xl">{event.image}</div>
                <div className="flex-1">
                  <h3 className="font-bold text-lg text-gray-900">
                    {event.nom}
                  </h3>
                  <div className="flex items-center gap-2 text-gray-600 mb-1">
                    <Calendar className="w-4 h-4" />
                    <span className="text-sm">
                      {new Date(event.date).toLocaleDateString("fr-FR")}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <MapPin className="w-4 h-4" />
                    <span className="text-sm">{event.lieu}</span>
                  </div>
                  <div className="mt-2 text-sm text-blue-600 font-medium">
                    À partir de {Math.min(...event.billets.map((b) => b.prix))}{" "}
                    €
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Motion.div>
      )}

      {purchaseStep === "tickets" && selectedEvent && (
        <Motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="space-y-4"
        >
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-6">
            <h2 className="font-bold text-lg">{selectedEvent.nom}</h2>
            <p className="text-gray-600 flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              {new Date(selectedEvent.date).toLocaleDateString("fr-FR")}
            </p>
          </div>

          {selectedEvent.billets.map((ticket, index) => (
            <div
              key={index}
              onClick={() => handleTicketSelect(ticket)}
              className="border-2 border-gray-200 rounded-lg p-4 bg-white hover:border-blue-300 hover:shadow-md transition-all cursor-pointer"
            >
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-bold text-gray-900">{ticket.type}</h3>
                  <p className="text-sm text-gray-600">{ticket.description}</p>
                </div>
                <div className="text-right">
                  <div className="text-xl font-bold text-blue-600">
                    {ticket.prix} €
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Motion.div>
      )}

      {purchaseStep === "checkout" && selectedEvent && selectedTicket && (
        <Motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="space-y-6"
        >
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <h2 className="font-bold">{selectedEvent.nom}</h2>
            <p className="text-sm text-gray-600">
              {selectedTicket.type} - {selectedTicket.description}
            </p>
            <div className="flex items-center justify-between mt-2">
              <div className="flex items-center gap-3">
                <label className="text-sm font-medium">Quantité:</label>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center"
                  >
                    -
                  </button>
                  <span className="w-8 text-center font-medium">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center"
                  >
                    +
                  </button>
                </div>
              </div>
              <div className="text-xl font-bold text-blue-600">
                {(selectedTicket.prix * quantity).toFixed(2)} €
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-bold text-gray-900">
              Informations personnelles
            </h3>
            <input
              type="text"
              placeholder="Nom complet"
              value={customerInfo.nom}
              onChange={(e) =>
                setCustomerInfo({ ...customerInfo, nom: e.target.value })
              }
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <input
              type="email"
              placeholder="Email"
              value={customerInfo.email}
              onChange={(e) =>
                setCustomerInfo({ ...customerInfo, email: e.target.value })
              }
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <input
              type="tel"
              placeholder="Téléphone"
              value={customerInfo.telephone}
              onChange={(e) =>
                setCustomerInfo({ ...customerInfo, telephone: e.target.value })
              }
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <IconButton
            icon={CreditCard}
            onClick={handlePurchase}
            color="green"
            className="w-full justify-center text-lg py-4"
            disabled={!customerInfo.nom || !customerInfo.email}
          >
            Payer {(selectedTicket.prix * quantity).toFixed(2)} €
          </IconButton>
        </Motion.div>
      )}
    </main>
  );
}
