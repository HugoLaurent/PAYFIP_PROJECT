import { useState } from "react";
import { CheckCircle, Mail, RefreshCcw } from "lucide-react";

import { CodeInput, IconButton } from "@/components";

export default function EmailVerification({ onVerified }) {
  const [email, setEmail] = useState("");
  const [codeSent, setCodeSent] = useState(false);
  const [codeInput, setCodeInput] = useState("");
  const [generatedCode, setGeneratedCode] = useState("");
  const [error, setError] = useState("");
  const [verified, setVerified] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);

  const sendCode = () => {
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Adresse email invalide");
      return;
    }
    setIsSending(true);
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    setTimeout(() => {
      setGeneratedCode(code);
      setCodeSent(true);
      setError("");
      console.log("Code envoyé (démo) :", code);
      setIsSending(false);
    }, 1000);
  };

  const verifyCode = () => {
    setIsVerifying(true);
    setTimeout(() => {
      if (codeInput === generatedCode) {
        setVerified(true);
        setTimeout(() => {
          onVerified?.(email);
        }, 1000);
      } else {
        setError("Code incorrect");
      }
      setIsVerifying(false);
    }, 800);
  };

  if (verified) {
    return (
      <div className="flex flex-col items-center p-6 text-center">
        <CheckCircle className="w-12 h-12 text-green-500 mb-2" />
        <h2 className="text-xl font-bold text-gray-900">Email vérifié !</h2>
        <p className="text-gray-600 mt-2">Merci, votre email a été confirmé.</p>
      </div>
    );
  }

  return (
    <div className="w-full mx-auto p-4 rounded shadow-sm bg-white">
      {!codeSent ? (
        <>
          <h2 className="text-xl font-bold text-center mb-2">
            Votre adresse email
          </h2>
          <p className="text-sm text-gray-600 text-center mb-4">
            Entrez votre adresse email pour recevoir un code de vérification.
          </p>
          <div className="px-4">
            <label className="text-sm text-gray-700">Email</label>
            <input
              type="email"
              className="w-full border px-3 py-2 rounded mb-4"
              placeholder="exemple@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {error && <p className="text-sm text-red-600 mb-2">{error}</p>}
            <IconButton
              onClick={sendCode}
              icon={Mail}
              color="blue"
              isLoading={isSending}
            >
              Continuer
            </IconButton>
          </div>
        </>
      ) : (
        <>
          <h2 className="text-xl font-bold text-center mb-2">
            Code de vérification
          </h2>
          <p className="text-sm text-gray-600 text-center mb-4">
            Un code a été envoyé à <strong>{email}</strong>.
          </p>
          <CodeInput onComplete={(enteredCode) => setCodeInput(enteredCode)} />
          {error && <p className="text-sm text-red-600 mb-2">{error}</p>}
          <IconButton
            onClick={verifyCode}
            icon={null}
            color="green"
            isLoading={isVerifying}
          >
            Vérifier le code
          </IconButton>
          <p className="text-xs text-gray-500 mt-3 text-center flex items-center justify-center">
            <Mail className="w-4 h-4 mr-1" /> Code pour démo : {generatedCode}
          </p>
          <div className="text-center mt-3">
            <IconButton
              onClick={() => {
                setCodeSent(false);
                setCodeInput("");
              }}
              icon={RefreshCcw}
              color="transparent"
              isLoading={false}
            >
              Utiliser un autre email
            </IconButton>
          </div>
        </>
      )}
    </div>
  );
}
