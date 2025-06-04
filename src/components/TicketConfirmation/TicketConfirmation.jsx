import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { CheckCircle2, Calendar, Users } from "lucide-react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";

export default function TicketConfirmation(props) {
  const [searchParams] = useSearchParams();
  const idopFromUrl = searchParams.get("idop");
  const stepFromUrl = searchParams.get("step");
  const isFromRedirect = stepFromUrl === "5" && idopFromUrl;

  const [email, setEmail] = useState(props.email || "");
  const [date, setDate] = useState(props.date || null);
  const [tickets, setTickets] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [confirmationNumber, setConfirmationNumber] = useState("");

  const mockData = {
    email: "jean.dupont@example.com",
    date: new Date("2025-07-14"),
    formData: {
      nb_adulte: 2,
      nb_enfant: 1,
      nb_etudiant: 0,
    },
    data: {
      prix: {
        adulte: 10,
        enfant: 5,
        etudiant: 7,
      },
    },
  };

  useEffect(() => {
    if (isFromRedirect) {
      const fetchTicketData = async () => {
        try {
          const res = await fetch(`/api/test`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ idOp: idopFromUrl }),
          });
          if (!res.ok) throw new Error("Erreur serveur");
          const data = await res.json();
          setEmail(data.email);
          setDate(new Date(data.date));
          setTickets(data.tickets);
          setTotalPrice(data.total);
          setConfirmationNumber(data.confirmation);
        } catch (error) {
          console.error("Erreur récupération ticket :", error);
        }
      };
      fetchTicketData();
    } else {
      const propsTickets = Object.entries(props.formData || {})
        .filter(([, qty]) => qty > 0)
        .map(([key, qty]) => {
          const type = key.replace("nb_", "");
          return {
            type,
            quantity: qty,
            price: props.data?.prix?.[type] || 0,
          };
        });

      const total = propsTickets.reduce(
        (acc, t) => acc + t.price * t.quantity,
        0
      );

      setTickets(propsTickets);
      setTotalPrice(total);
      setConfirmationNumber(
        Math.random().toString(36).substring(2, 8).toUpperCase()
      );
    }
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="max-w-md mx-auto p-6 bg-white shadow rounded-lg"
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
