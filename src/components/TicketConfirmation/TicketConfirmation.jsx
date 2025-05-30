import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, Calendar, Users, Download } from "lucide-react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { PDFDownloadLink } from "@react-pdf/renderer";
import PDFTicket from "./../../lib/PDFTIcket";
import { useQrCode } from "@/hooks";

export default function TicketConfirmation({
  email,
  date,
  formData,
  data,
  onReset,
}) {
  const [confirmationNumber, setConfirmationNumber] = useState("");
  const hasSent = useRef(false);

  const tickets = Object.entries(formData)
    .filter(([, qty]) => qty > 0)
    .map(([key, qty]) => {
      const type = key.replace("nb_", "");
      return {
        type,
        quantity: qty,
        price: data.prix[type] || 0,
      };
    });

  const totalTickets = tickets.reduce((acc, t) => acc + t.quantity, 0);
  const totalPrice = tickets.reduce((acc, t) => acc + t.price * t.quantity, 0);

  useEffect(() => {
    const randomConfirmation = Math.random()
      .toString(36)
      .substring(2, 8)
      .toUpperCase();
    setConfirmationNumber(randomConfirmation);
  }, []);

  const qrContent = JSON.stringify({
    confirmationNumber,
    email,
    date: format(date, "yyyy-MM-dd"),
    tickets,
    total: totalPrice,
  });

  const qrCodeUrl = useQrCode(qrContent);

  useEffect(() => {
    if (!qrCodeUrl || hasSent.current) return;
    hasSent.current = true;

    const sendTicketToBackend = async () => {
      const response = await fetch(qrCodeUrl);
      const blob = await response.blob();
      const reader = new FileReader();

      reader.onloadend = async () => {
        const base64QrCode = reader.result;

        const billetsText = tickets
          .map(
            (ticket) =>
              `${ticket.quantity} × ${ticket.type} — ${(
                ticket.price * ticket.quantity
              ).toFixed(2)} €`
          )
          .join("<br>");

        try {
          await fetch("/api/send-ticket", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              dataId: data.id,
              email,
              confirmation: confirmationNumber,
              date_visite: format(date, "EEEE d MMMM yyyy", { locale: fr }),
              billets: billetsText,
              total: totalPrice.toFixed(2),
              qr_code_base64: base64QrCode,
            }),
          });
        } catch (error) {
          console.error("Erreur d'envoi au backend :", error);
        }
      };

      reader.readAsDataURL(blob);
    };

    sendTicketToBackend();
  }, [qrCodeUrl]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="max-w-md mx-auto p-6 bg-white shadow rounded-lg"
    >
      <div id="ticket-to-download" className="text-center mb-6">
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
              {format(date, "EEEE d MMMM yyyy", { locale: fr })}
            </p>
          </div>
        </div>

        <div className="flex items-start">
          <Users className="h-5 w-5 text-blue-500 mr-3 mt-0.5" />
          <div className="flex-1">
            <h3 className="font-medium text-gray-900">Billets</h3>
            <div className="space-y-2 mt-1">
              {tickets.map((ticket) => (
                <div
                  key={ticket.type}
                  className="flex justify-between text-gray-600"
                >
                  <span>
                    {ticket.quantity} × {ticket.type}
                  </span>
                  <span>
                    {new Intl.NumberFormat("fr-FR", {
                      style: "currency",
                      currency: "EUR",
                    }).format(ticket.price * ticket.quantity)}
                  </span>
                </div>
              ))}
              <div className="flex justify-between font-medium text-gray-900 pt-2 border-t border-gray-200">
                <span>
                  Total ({totalTickets}{" "}
                  {totalTickets === 1 ? "billet" : "billets"})
                </span>
                <span>
                  {new Intl.NumberFormat("fr-FR", {
                    style: "currency",
                    currency: "EUR",
                  }).format(totalPrice)}
                </span>
              </div>
            </div>
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

      {qrCodeUrl && (
        <div className="flex justify-center mt-6">
          <img
            src={qrCodeUrl}
            alt="QR Code"
            className="w-60 h-60 border rounded-lg"
          />
        </div>
      )}

      <div className="flex flex-col sm:flex-row justify-between gap-3 mt-6">
        <PDFDownloadLink
          document={
            <PDFTicket
              email={email}
              date={date}
              tickets={tickets}
              confirmationNumber={confirmationNumber}
              totalPrice={totalPrice}
              qrCodeUrl={qrCodeUrl}
            />
          }
          fileName="ticket.pdf"
          className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md text-sm text-gray-700 hover:bg-gray-100"
        >
          {({ loading }) => (
            <>
              <Download className="h-4 w-4 mr-2" />
              {loading ? "Préparation..." : "Télécharger les billets"}
            </>
          )}
        </PDFDownloadLink>
        <button
          onClick={onReset}
          className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700"
        >
          Réserver à nouveau
        </button>
      </div>
    </motion.div>
  );
}
