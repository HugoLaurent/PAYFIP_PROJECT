import { useState } from "react";
import { motion as Motion } from "framer-motion";
import { ProgressBar, BookingFlow } from "@/components";

export default function Booking({ data }) {
  const { description } = data;

  const [step, setStep] = useState(0);
  const steps = ["Email", "Tickets", "Date", "Paiement", "Confirmation"];

  return (
    <main className="flex flex-col gap-8 max-w-lg mx-auto py-8">
      <Motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-4"
      >
        <h1 className="text-3xl font-bold text-gray-900 mb-3">{description}</h1>
        <p className="text-gray-600 max-w-md mx-auto">
          Réservez vos billets pour la base de loisirs grâce à notre processus
          de réservation simple et sécurisé.
        </p>
      </Motion.div>

      {/* ProgressBar rendue ici */}
      {step !== 4 && (
        <ProgressBar currentStep={step + 1} steps={steps} statusTitre={false} />
      )}

      {/* BookingFlow contrôlé */}
      <BookingFlow step={step} setStep={setStep} data={data} />
    </main>
  );
}
