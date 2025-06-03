import { useState } from "react";
import { CheckCircle, Mail, Lock, LogIn, RefreshCcw } from "lucide-react";
import { IconButton, CodeInput } from "@/components";
import { motion as Motion } from "framer-motion";
import { useNavigate } from "react-router";

export default function LoginForm() {
  const Navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [step, setStep] = useState(0); // 0: envoi code, 1: vérification code, 2: mot de passe
  const [generatedCode, setGeneratedCode] = useState("");
  const [codeInput, setCodeInput] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const sendCode = async () => {
    setError("");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Adresse email invalide");
      return;
    }

    setIsSending(true);
    try {
      const res = await fetch("/api/send-mail", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: 0, email }),
      });

      if (!res.ok) throw new Error();

      // pour démo
      const fakeCode = Math.floor(100000 + Math.random() * 900000).toString();
      setGeneratedCode(fakeCode);
      setStep(1);
    } catch (err) {
      setError("Erreur lors de l'envoi. Réessayez.");
    } finally {
      setIsSending(false);
    }
  };

  const verifyCode = async () => {
    setIsVerifying(true);
    setError("");

    try {
      const res = await fetch("/api/check-mail", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, code: codeInput }),
      });

      if (res.ok) {
        setStep(2);
      } else {
        const data = await res.json();
        setError(data.error || "Code invalide.");
      }
    } catch (err) {
      setError("Erreur de vérification.");
    } finally {
      setIsVerifying(false);
    }
  };

  const handleLogin = async () => {
    setIsSubmitting(true);
    setError("");

    try {
      const res = await fetch("/api/connexion", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mail: email, password }),
      });

      if (res.ok) {
        Navigate("/dashboard");
        setSuccess(true);
      } else {
        const data = await res.json();
        setError(data.error || "Mot de passe incorrect.");
      }
    } catch (err) {
      setError("Erreur de connexion.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="flex flex-col gap-8 max-w-lg mx-auto py-8">
      <Motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-4"
      >
        <h1 className="text-3xl font-bold text-gray-900 mb-3">Connexion</h1>
        <p className="text-gray-600 max-w-md mx-auto">
          Accédez à votre espace personnel en vous connectant avec vos
          identifiants.
        </p>
      </Motion.div>

      <div className="w-full mx-auto p-4 rounded shadow-sm bg-white">
        {step === 0 && (
          <>
            <h2 className="text-xl font-bold text-center mb-2">
              Votre adresse email
            </h2>
            <p className="text-sm text-gray-600 text-center mb-4">
              Entrez votre adresse email pour recevoir un code de vérification.
            </p>
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
              Envoyer le code
            </IconButton>
          </>
        )}

        {step === 1 && (
          <>
            <p className="text-sm text-gray-600 text-center mb-4">
              Un code a été envoyé à <strong>{email}</strong>.
            </p>
            <CodeInput onComplete={(value) => setCodeInput(value)} />
            {error && <p className="text-sm text-red-600 mt-2">{error}</p>}
            <IconButton
              onClick={verifyCode}
              icon={CheckCircle}
              color="green"
              isLoading={isVerifying}
            >
              Vérifier le code
            </IconButton>

            <div className="text-center mt-3">
              <IconButton
                onClick={() => {
                  setStep(0);
                  setCodeInput("");
                  setError("");
                }}
                icon={RefreshCcw}
                color="transparent"
              >
                Changer d'email
              </IconButton>
            </div>
          </>
        )}

        {step === 2 && (
          <>
            <p className="text-sm text-gray-600 text-center mb-4">
              Adresse vérifiée : <strong>{email}</strong>
            </p>
            <label className="text-sm text-gray-700">Mot de passe</label>
            <input
              type="password"
              className="w-full border px-3 py-2 rounded mb-4"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {error && <p className="text-sm text-red-600 mb-2">{error}</p>}
            <IconButton
              onClick={handleLogin}
              icon={Lock}
              color="blue"
              isLoading={isSubmitting}
            >
              Se connecter
            </IconButton>
          </>
        )}
      </div>
    </main>
  );
}
