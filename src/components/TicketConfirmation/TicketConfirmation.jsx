import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { CheckCircle2, Calendar, Users, AlertCircle } from "lucide-react";
import { format } from "date-fns";
import { fr, id } from "date-fns/locale";
import { IconButton } from "@/components";

export default function TicketConfirmation(props) {
  const [searchParams] = useSearchParams();
  const idopFromUrl = searchParams.get("idop");

  const [email, setEmail] = useState(props.email || "");
  const [date, setDate] = useState(props.date || null);
  const [tickets, setTickets] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [confirmationNumber, setConfirmationNumber] = useState("");
  const [errorCode, setErrorCode] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [idop, setIdop] = useState("");

  const fetchTicketData = async () => {
    try {
      const res = await fetch(`/api/test`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ idOp: idopFromUrl }),
      });

      if (res.status === 422) {
        setErrorCode(422);
        return;
      }
      if (!res.ok) throw new Error("Erreur serveur");

      const data = await res.json();
      setEmail(data.email);
      setDate(new Date(data.date));
      setTickets(data.tickets);
      setTotalPrice(data.total);
      setConfirmationNumber(data.confirmation);
    } catch (error) {
      console.error("Erreur récupération ticket :", error);
      setErrorCode(500);
    }
  };
  useEffect(() => {
    fetchTicketData();
  }, []);

  const handleValidateReservation = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/try-again", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          idOp: idopFromUrl,
        }),
      });

      if (!res.ok) throw new Error("Erreur lors de la validation.");
      const data = await res.json();

      setIdop(data);
      console.log("IDOP récupéré :", data);
    } catch (err) {
      console.error("Erreur :", err);
    } finally {
      setIsLoading(false);
    }
  };

  if (errorCode === 422) {
    return (
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md mx-auto p-6 bg-white shadow border border-red-300 rounded-lg mt-4"
      >
        <div className="text-center ">
          <motion.div
            initial={{ rotate: 0, scale: 0 }}
            animate={{ rotate: [0, -10, 10, -10, 10, 0], scale: 1 }}
            transition={{ duration: 0.6 }}
            className="inline-flex rounded-full bg-red-200 p-2 mb-3"
          >
            <AlertCircle className="h-10 w-10 text-red-700" />
          </motion.div>
          <h2 className="text-xl font-bold">Paiement refusé</h2>
          <p className="mt-2 text-sm">
            Votre paiement a été refusé. Veuillez vérifier votre moyen de
            paiement ou réessayer ultérieurement.
          </p>

          {idop == "" ? (
            <IconButton
              onClick={handleValidateReservation}
              disabled={isLoading}
              isLoading={isLoading}
              color="red"
              className="mt-4"
            >
              Procéder à nouveau au paiement
            </IconButton>
          ) : (
            <IconButton
              onClick={() =>
                window.open(
                  `https://www.payfip.gouv.fr/tpa/paiementws.web?idop=${idop}`,
                  "_blank"
                )
              }
              disabled={isLoading}
              isLoading={isLoading}
              color="green"
              className="mt-4"
            >
              Réessayer le paiement sur Payfip
            </IconButton>
          )}
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="max-w-md mx-auto p-6 bg-white shadow rounded-lg mt-4"
    >
      <div className="text-center mb-6">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{
            delay: 0.2,
            type: "spring",
            stiffness: 200,
            damping: 10,
          }}
          className="inline-flex rounded-full bg-green-100 p-2 mb-4"
        >
          <CheckCircle2 className="h-12 w-12 text-green-600" />
        </motion.div>
        <h2 className="text-2xl font-bold text-gray-900">
          Réservation Confirmée !
        </h2>
        <p className="text-gray-600 mt-2">Vos billets ont bien été réservés.</p>
      </div>

      <div className="border-t border-gray-200 py-4 space-y-4">
        <div className="text-center">
          <span className="text-sm text-gray-500">Numéro de confirmation</span>
          <div className="text-xl font-bold tracking-wide text-gray-800">
            {confirmationNumber}
          </div>
        </div>

        <div className="flex items-start">
          <Calendar className="h-5 w-5 text-blue-500 mr-3 mt-0.5" />
          <div>
            <h3 className="font-medium text-gray-900">Date de visite</h3>
            <p className="text-gray-600">
              {date instanceof Date && !isNaN(date)
                ? format(date, "EEEE d MMMM yyyy", { locale: fr })
                : ""}
            </p>
          </div>
        </div>

        <div className="flex items-start">
          <Users className="h-5 w-5 text-blue-500 mr-3 mt-0.5" />
          <div className="flex-1">
            <h3 className="font-medium text-gray-900">Billets</h3>
            <ul className="mt-1 text-gray-600 space-y-1">
              {Object.entries(
                tickets.reduce((acc, ticket) => {
                  const key = ticket.type;
                  if (!acc[key]) acc[key] = { count: 0, type: ticket.type };
                  acc[key].count++;
                  return acc;
                }, {})
              ).map(([type, { count }]) => (
                <li key={type}>
                  {count} × {type}
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

      <div className="flex justify-end mt-6">
        <button
          onClick={() => console.log("Billet téléchargé")}
          className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700"
        >
          Télécharger les billets
        </button>
      </div>
    </motion.div>
  );
}
