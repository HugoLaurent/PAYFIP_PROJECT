import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion as Motion } from "framer-motion";
import { Html5Qrcode } from "html5-qrcode";
import { CheckCircle, XCircle, ScanLine, Ticket } from "lucide-react";
import { IconButton } from "@/components";
import { useAuth } from "../../hooks";

// Convertit un nombre 4D (secondes depuis minuit) en HH:MM:SS
function formatHeure4D(seconds) {
  if (!seconds || seconds === 0) return "Non renseigné";
  const date = new Date(0, 0, 0, 0, 0, seconds);
  return date.toLocaleTimeString("fr-FR", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
}

export default function Dashboard() {
  const { isAuthenticated, loading } = useAuth();
  const navigate = useNavigate();

  const [scanResult, setScanResult] = useState(null);
  const [isScanning, setIsScanning] = useState(false);
  const [recentTickets, setRecentTickets] = useState([]);
  const qrReaderRef = useRef(null);

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      navigate("/login");
    }
  }, [loading, isAuthenticated]);

  const handleStartScan = () => {
    setIsScanning(true);
    setScanResult(null);
  };

  useEffect(() => {
    if (!isScanning) return;

    const html5QrCode = new Html5Qrcode("qr-reader");

    Html5Qrcode.getCameras().then((devices) => {
      if (devices && devices.length > 0) {
        html5QrCode
          .start(
            { facingMode: "environment" },
            { fps: 10, qrbox: 250 },
            async (decodedText) => {
              html5QrCode.stop().then(async () => {
                setIsScanning(false);

                try {
                  const response = await fetch("/api/validate-ticket", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ code_unique: decodedText }),
                  });

                  const result = await response.json();

                  setScanResult({
                    status: response.ok ? "validé" : "refusé",
                    message:
                      result.message ||
                      result.erreur ||
                      "Ticket validé avec succès",
                    date: result.date || new Date().toLocaleDateString(),
                  });

                  const ticketsArray = Object.keys(result.tickets || {}).map(
                    (key) => ({
                      ...result.tickets[key],
                      index: key,
                    })
                  );

                  setRecentTickets(ticketsArray);
                } catch (error) {
                  setScanResult({
                    status: "refusé",
                    message: "Erreur serveur",
                    date: new Date().toLocaleDateString(),
                  });
                }
              });
            }
          )
          .catch((err) => {
            console.error("Erreur démarrage scanner :", err);
            setIsScanning(false);
          });
      } else {
        alert("Aucune caméra détectée.");
        setIsScanning(false);
      }
    });
  }, [isScanning]);

  if (loading || !isAuthenticated) return null;

  return (
    <main className="flex flex-col items-center gap-8 max-w-lg mx-auto py-8">
      <Motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Tableau de bord
        </h1>
        <p className="text-gray-600">
          Scanner un ticket QR pour valider l’entrée
        </p>
      </Motion.div>

      {isScanning && (
        <div
          id="qr-reader"
          ref={qrReaderRef}
          className="w-full aspect-square rounded overflow-hidden"
        />
      )}

      {!isScanning && scanResult && (
        <Motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.4 }}
          className={`w-full text-center p-6 rounded-md shadow-md ${
            scanResult.status === "validé" ? "bg-green-50" : "bg-red-50"
          }`}
        >
          <div className="flex justify-center mb-4">
            {scanResult.status === "validé" ? (
              <CheckCircle className="w-12 h-12 text-green-500" />
            ) : (
              <XCircle className="w-12 h-12 text-red-500" />
            )}
          </div>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            {scanResult.message}
          </h2>
          {scanResult.status === "validé" && (
            <p className="text-sm text-gray-500">{scanResult.date}</p>
          )}

          <div className="mt-6">
            <IconButton icon={ScanLine} onClick={handleStartScan} color="blue">
              Scanner un autre ticket
            </IconButton>
          </div>
        </Motion.div>
      )}

      {!isScanning && !scanResult && (
        <IconButton icon={ScanLine} onClick={handleStartScan} color="blue">
          Scanner un QR Code
        </IconButton>
      )}

      {recentTickets.length > 0 && (
        <div className="w-full mt-8 space-y-3">
          <h2 className="text-lg font-semibold text-gray-700 mb-2">
            Derniers tickets scannés
          </h2>

          {recentTickets.map((ticket) => (
            <div
              key={ticket.index}
              className="flex items-center justify-between border p-3 rounded-md bg-white shadow-sm"
            >
              <div className="flex items-center gap-3">
                <Ticket className="h-5 w-5 text-blue-500" />
                <div>
                  <div className="font-medium text-gray-800">
                    Ticket #{ticket.code}
                  </div>
                  <div className="text-sm text-gray-600">
                    Type : <strong>{ticket.type || "?"}</strong>
                  </div>
                  <div className="text-xs text-gray-400">
                    Heure scan : {formatHeure4D(ticket.modifie_le)}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
