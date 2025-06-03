import { useSearchParams } from "react-router-dom";

export default function FeedbackPayfip() {
  const [searchParams] = useSearchParams();
  const step = searchParams.get("step");
  const idop = searchParams.get("idop");

  return (
    <div className="p-8 max-w-xl mx-auto text-center">
      <h1 className="text-3xl font-bold mb-4">Retour de paiement</h1>

      {idop && (
        <p className="text-md text-gray-700 mb-4">
          ID de l’opération :{" "}
          <code className="bg-gray-100 px-2 py-1 rounded">{idop}</code>
        </p>
      )}

      {step === "5" ? (
        <p className="text-lg text-green-600">✅ Paiement confirmé.</p>
      ) : (
        <p className="text-lg text-red-600">
          ❌ Impossible de confirmer le paiement.
        </p>
      )}
    </div>
  );
}
