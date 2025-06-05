import { useEffect, useState } from "react";
import {
  EmailVerification,
  TicketSelection,
  DateSelection,
  TicketConfirmation,
  WaitingForPayment,
  PayfipStep,
} from "@/components";

export default function BookingFlow({ step, setStep, data }) {
  const [formData, setFormData] = useState(
    Object.fromEntries(Object.keys(data).map((key) => [`nb_${key}`, 0]))
  );

  const [email, setEmail] = useState("");
  const [date, setDate] = useState(null);
  const [idop, setIdop] = useState(null);

  // Lancer polling une fois idop dispo et à l'étape 3
  useEffect(() => {
    if (!idop || step !== 3) return;
    setStep(4);
    const interval = setInterval(async () => {
      try {
        const res = await fetch(`/api/payment-status/${idop}`);
        if (res.status === 200) {
          clearInterval(interval);
        }
      } catch (err) {
        console.error("Erreur polling :", err);
      }
    }, 5000);
    return () => clearInterval(interval);
  }, [idop, step]);

  return (
    <div>
      {step === 0 && (
        <EmailVerification
          data={data}
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
        <PayfipStep
          data={data}
          email={email}
          date={date}
          tickets={Object.entries(formData)
            .filter(([, qty]) => qty > 0)
            .map(([key, qty]) => {
              const type = key.replace("nb_", "");
              const rawPrice = data.prix[type];
              const price = parseFloat(rawPrice);
              return {
                type,
                quantity: qty,
                price: isNaN(price) ? 0 : price,
              };
            })}
          totalPrice={Object.entries(formData).reduce((acc, [key, qty]) => {
            const type = key.replace("nb_", "");
            const price = parseFloat(data.prix[type]);
            return acc + (isNaN(price) ? 0 : price * qty);
          }, 0)}
          onBack={() => setStep(2)}
          onReadyToPay={(receivedIdop) => setIdop(receivedIdop)}
        />
      )}

      {step === 4 && idop && (
        <WaitingForPayment idop={idop} onSuccess={() => setStep(5)} />
      )}

      {step === 5 && (
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
            setIdop(null);
          }}
        />
      )}
    </div>
  );
}
