import { useState } from "react";

import {
  EmailVerification,
  TicketSelection,
  DateSelection,
  TicketConfirmation,
} from "@/components";

export default function BookingFlow({ step, setStep, data }) {
  const [formData, setFormData] = useState(
    Object.fromEntries(Object.keys(data).map((key) => [`nb_${key}`, 0]))
  );
  const [email, setEmail] = useState("");
  const [date, setDate] = useState("");

  return (
    <div>
      {step === 0 && (
        <EmailVerification
          onVerified={(userEmail) => {
            setEmail(userEmail);
            setStep(1);
          }}
        />
      )}

      {step === 1 && (
        <TicketSelection
          data={data}
          formData={formData}
          setFormData={setFormData}
          setStep={setStep}
        />
      )}

      {step === 2 && (
        <DateSelection
          date={date}
          setDate={setDate}
          onContinue={() => setStep(3)}
          onBack={() => setStep(1)}
        />
      )}

      {step === 3 && (
        <TicketConfirmation
          email={email}
          date={date}
          formData={formData}
          data={data}
          onReset={() => {
            setStep(0);
            setFormData(
              Object.fromEntries(
                Object.keys(data).map((key) => [`nb_${key}`, 0])
              )
            );
            setDate("");
            setEmail("");
          }}
        />
      )}

      {/* Navigation */}
    </div>
  );
}
