import { useState, useRef, useEffect } from "react";
import { motion as Motion } from "framer-motion";
import { IconButton } from "@/components";
import {
  CheckCircle,
  XCircle,
  ScanLine,
  Ticket,
  ArrowLeft,
} from "lucide-react";

// Simuler Html5Qrcode pour la démo
const Html5Qrcode = {
  getCameras: () =>
    Promise.resolve([{ id: "camera1", label: "Caméra arrière" }]),
};

class MockQrScanner {
  constructor(elementId) {
    this.elementId = elementId;
  }

  start(cameraId, config, onSuccess) {
    // Simuler le scan après 3 secondes
    setTimeout(() => {
      const mockQrCode =
        "TICKET-" + Math.random().toString(36).substr(2, 9).toUpperCase();
      onSuccess(mockQrCode);
    }, 3000);

    return Promise.resolve();
  }

  stop() {
    return Promise.resolve();
  }
}
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

// Composant Dashboard QR Scanner
export default function QrScanner({ onBackToMenu }) {
  const [scanResult, setScanResult] = useState(null);
  const [isScanning, setIsScanning] = useState(false);
  const [recentTickets, setRecentTickets] = useState([]);
  const qrReaderRef = useRef(null);

  const handleStartScan = () => {
    setIsScanning(true);
    setScanResult(null);
  };

  useEffect(() => {
    if (!isScanning) return;

    const html5QrCode = new MockQrScanner("qr-reader");

    Html5Qrcode.getCameras().then((devices) => {
      if (devices && devices.length > 0) {
        html5QrCode
          .start(
            { facingMode: "environment" },
            { fps: 10, qrbox: 250 },
            async (decodedText) => {
              html5QrCode.stop().then(async () => {
                setIsScanning(false);

                // Simuler la validation du ticket
                const isValid = Math.random() > 0.3; // 70% de chance d'être valide

                setScanResult({
                  status: isValid ? "validé" : "refusé",
                  message: isValid
                    ? "Ticket validé avec succès"
                    : "Ticket invalide ou déjà utilisé",
                  date: new Date().toLocaleDateString("fr-FR"),
                  code: decodedText,
                });

                if (isValid) {
                  const newTicket = {
                    index: Date.now(),
                    code: decodedText,
                    type: ["Standard", "VIP", "Premium"][
                      Math.floor(Math.random() * 3)
                    ],
                    modifie_le: Math.floor(Date.now() / 1000) % 86400,
                  };
                  setRecentTickets((prev) => [newTicket, ...prev.slice(0, 4)]);
                }
              });
            }
          )
          .catch((err) => {
            console.error("Erreur démarrage scanner :", err);
            setIsScanning(false);
          });
      }
    });
  }, [isScanning]);

  return (
    <main className="flex flex-col items-center gap-8 max-w-lg mx-auto py-8 px-4">
      <Motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <div className="flex items-center justify-center gap-4 mb-4">
          <IconButton icon={ArrowLeft} onClick={onBackToMenu} color="gray">
            Retour
          </IconButton>
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Scanner QR Code
        </h1>
        <p className="text-gray-600">
          Scanner un ticket QR pour valider l'entrée
        </p>
      </Motion.div>

      {isScanning && (
        <Motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="w-full aspect-square rounded-lg overflow-hidden bg-gray-900 flex items-center justify-center relative"
        >
          <div className="text-white text-center">
            <ScanLine className="w-16 h-16 mx-auto mb-4 animate-pulse" />
            <p>Positionnez le QR code dans le cadre</p>
            <div className="absolute inset-8 border-2 border-white/50 rounded-lg">
              <div className="absolute top-0 left-0 w-6 h-6 border-l-4 border-t-4 border-blue-400 rounded-tl-lg"></div>
              <div className="absolute top-0 right-0 w-6 h-6 border-r-4 border-t-4 border-blue-400 rounded-tr-lg"></div>
              <div className="absolute bottom-0 left-0 w-6 h-6 border-l-4 border-b-4 border-blue-400 rounded-bl-lg"></div>
              <div className="absolute bottom-0 right-0 w-6 h-6 border-r-4 border-b-4 border-blue-400 rounded-br-lg"></div>
            </div>
          </div>
        </Motion.div>
      )}

      {!isScanning && scanResult && (
        <Motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.4 }}
          className={`w-full text-center p-6 rounded-lg shadow-lg ${
            scanResult.status === "validé"
              ? "bg-green-50 border-2 border-green-200"
              : "bg-red-50 border-2 border-red-200"
          }`}
        >
          <div className="flex justify-center mb-4">
            {scanResult.status === "validé" ? (
              <CheckCircle className="w-16 h-16 text-green-500" />
            ) : (
              <XCircle className="w-16 h-16 text-red-500" />
            )}
          </div>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            {scanResult.message}
          </h2>
          <p className="text-gray-600 mb-2">Code: {scanResult.code}</p>
          <p className="text-sm text-gray-500 mb-6">{scanResult.date}</p>

          <IconButton icon={ScanLine} onClick={handleStartScan} color="blue">
            Scanner un autre ticket
          </IconButton>
        </Motion.div>
      )}

      {!isScanning && !scanResult && (
        <Motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-center flex flex-col items-center gap-4"
        >
          <IconButton
            icon={ScanLine}
            onClick={handleStartScan}
            color="blue"
            className="text-lg px-8 py-4"
          >
            Commencer le scan
          </IconButton>

          <div className="w-full max-w-xs flex flex-col items-center gap-3">
            <label
              htmlFor="manual-ticket"
              className="text-gray-700 font-medium mb-1"
            >
              Entrer le numéro du ticket
            </label>
            <input
              id="manual-ticket"
              type="text"
              placeholder="Numéro du ticket"
              className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-400 text-center text-lg transition"
              onKeyDown={(e) => {
                if (e.key === "Enter" && e.target.value.trim()) {
                  const code = e.target.value.trim();
                  const isValid = Math.random() > 0.3;
                  setScanResult({
                    status: isValid ? "validé" : "refusé",
                    message: isValid
                      ? "Ticket validé avec succès"
                      : "Ticket invalide ou déjà utilisé",
                    date: new Date().toLocaleDateString("fr-FR"),
                    code,
                  });
                  if (isValid) {
                    const newTicket = {
                      index: Date.now(),
                      code,
                      type: ["Standard", "VIP", "Premium"][
                        Math.floor(Math.random() * 3)
                      ],
                      modifie_le: Math.floor(Date.now() / 1000) % 86400,
                    };
                    setRecentTickets((prev) => [
                      newTicket,
                      ...prev.slice(0, 4),
                    ]);
                  }
                  e.target.value = "";
                }
              }}
            />
            <span className="text-xs text-gray-400">
              Appuyez sur Entrée pour valider
            </span>
          </div>
        </Motion.div>
      )}

      {recentTickets.length > 0 && (
        <Motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="w-full mt-8 space-y-3"
        >
          <h2 className="text-lg font-semibold text-gray-700 mb-4">
            Derniers tickets scannés
          </h2>

          {recentTickets.map((ticket) => (
            <div
              key={ticket.index}
              className="flex items-center justify-between border-2 border-gray-100 p-4 rounded-lg bg-white shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-center gap-3">
                <div className="bg-blue-100 p-2 rounded-full">
                  <Ticket className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <div className="font-semibold text-gray-800">
                    {ticket.code}
                  </div>
                  <div className="text-sm text-gray-600">
                    Type : <span className="font-medium">{ticket.type}</span>
                  </div>
                  <div className="text-xs text-gray-400">
                    Scanné à : {formatHeure4D(ticket.modifie_le)}
                  </div>
                </div>
              </div>
              <CheckCircle className="h-6 w-6 text-green-500" />
            </div>
          ))}
        </Motion.div>
      )}
    </main>
  );
}
