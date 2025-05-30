import { useState } from "react";
import { Calendar, Users } from "lucide-react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { IconButton } from "@/components";

export default function PayfipStep({
  data,
  email,
  date,
  tickets,
  totalPrice,
  onBack,
  onReadyToPay,
}) {
  const [step, setStep] = useState(0); // 0: prêt, 1: bouton paiement, 2: redirection
  const [isLoading, setIsLoading] = useState(false);
  const [idop, setIdop] = useState(null);

  const handleValidateReservation = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/check-ticket", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          dataId: data.id,
          email: email,
          total: parseFloat(totalPrice.toFixed(2)),
          dateEntree: format(date, "yyyy-MM-dd"),
          tickets: tickets,
        }),
      });

      if (!res.ok) throw new Error("Erreur lors de la validation.");
      const { idOp } = await res.json();
      setIdop(idOp);
      setStep(1);
    } catch (err) {
      console.error("Erreur :", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRedirectToPayfip = () => {
    setStep(4); // on passe à WaitingForPayment
    onReadyToPay(idop);
    window.open(
      `https://www.payfip.gouv.fr/tpa/paiementws.web?idop=${idop}`,
      "_blank"
    );
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow rounded-lg">
      <h2 className="text-2xl font-bold text-center text-gray-900 mb-4">
        Résumé de votre réservation
      </h2>

      <div className="space-y-4 border-t border-gray-200 pt-4">
        <div className="flex items-start">
          <Calendar className="h-5 w-5 text-blue-500 mr-3 mt-0.5" />
          <div>
            <h3 className="font-medium text-gray-900">Date de visite</h3>
            <p className="text-gray-600">
              {format(date, "EEEE d MMMM yyyy", { locale: fr })}
            </p>
          </div>
        </div>

        <div className="flex items-start">
          <Users className="h-5 w-5 text-blue-500 mr-3 mt-0.5" />
          <div className="flex-1">
            <h3 className="font-medium text-gray-900">Billets</h3>
            <ul className="mt-1 text-gray-600 space-y-1">
              {tickets.map((ticket) => (
                <li key={ticket.type}>
                  {ticket.quantity} × {ticket.type} —{" "}
                  {Number(ticket.price).toFixed(2)} €
                </li>
              ))}
              <li className="font-medium text-gray-900 border-t border-gray-200 pt-2">
                Total : {totalPrice.toFixed(2)} €
              </li>
            </ul>
          </div>
        </div>

        <div className="flex items-start">
          <Users className="h-5 w-5 text-blue-500 mr-3 mt-0.5" />
          <div>
            <h3 className="font-medium text-gray-900">Email</h3>
            <p className="text-gray-600">{email}</p>
          </div>
        </div>
      </div>

      <div className="mt-6 space-y-3">
        {step === 0 && (
          <IconButton
            onClick={handleValidateReservation}
            isLoading={isLoading}
            color="blue"
          >
            Valider la réservation
          </IconButton>
        )}

        {step === 1 && (
          <IconButton onClick={handleRedirectToPayfip} color="green">
            Payer avec PayFIP
          </IconButton>
        )}

        {step === 2 && (
          <IconButton isLoading disabled color="gray">
            En attente de payfip...
          </IconButton>
        )}

        <button
          onClick={onBack}
          className="w-full mt-2 text-sm text-blue-600 hover:underline"
        >
          ← Retour
        </button>
      </div>
    </div>
  );
}
