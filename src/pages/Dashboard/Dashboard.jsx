import { useState, useRef, useEffect } from "react";
import { motion as Motion } from "framer-motion";
import { ScanLine, Ticket, RefreshCcw } from "lucide-react";
import { Html5Qrcode } from "html5-qrcode";
import { IconButton } from "@/components";

export default function Dashboard() {
  const [lastScanned, setLastScanned] = useState([
    { code: "ABC123", date: "2025-06-01", email: "jane@example.com" },
    { code: "DEF456", date: "2025-05-31", email: "john@example.com" },
    { code: "GHI789", date: "2025-05-30", email: "lucy@example.com" },
  ]);
  const [isScanning, setIsScanning] = useState(false);
  const qrRegionRef = useRef(null);

  const handleScanQRCode = () => {
    setIsScanning(true);
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
            (decodedText) => {
              html5QrCode.stop().then(() => {
                setIsScanning(false);
                setLastScanned((prev) => [
                  {
                    code: decodedText,
                    date: new Date().toISOString().slice(0, 10),
                    email: "?",
                  },
                  ...prev.slice(0, 9),
                ]);
              });
            }
          )
          .catch((err) => {
            console.error("Erreur lors du démarrage du scanner :", err);
            setIsScanning(false);
          });
      } else {
        alert("Aucune caméra détectée.");
        setIsScanning(false);
      }
    });
  }, [isScanning]);

  return (
    <main className="flex flex-col gap-8 max-w-lg mx-auto py-8">
      <Motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-4"
      >
        <h1 className="text-3xl font-bold text-gray-900 mb-3">
          Tableau de bord
        </h1>
        <p className="text-gray-600 max-w-md mx-auto">
          Suivi des entrées par QR code – Derniers billets scannés
        </p>
      </Motion.div>

      <div className="w-full mx-auto p-4 rounded shadow-sm bg-white">
        <div className="flex justify-between gap-3 items-center mb-4">
          <IconButton
            onClick={() =>
              isScanning ? setIsScanning(false) : handleScanQRCode()
            }
            icon={ScanLine}
            color={isScanning ? "red" : "blue"}
          >
            {isScanning ? "Arrêter le scan" : "Scanner un QR Code"}
          </IconButton>
        </div>

        {isScanning && (
          <div
            id="qr-reader"
            ref={qrRegionRef}
            className="mb-4 w-full aspect-square rounded overflow-hidden"
          />
        )}

        <div className="space-y-3">
          {lastScanned.map((ticket, idx) => (
            <div
              key={ticket.code + idx}
              className="flex items-center justify-between border p-3 rounded-md"
            >
              <div className="flex items-center gap-3">
                <Ticket className="h-5 w-5 text-blue-500" />
                <div>
                  <div className="font-medium text-gray-800">{ticket.code}</div>
                  <div className="text-sm text-gray-500">{ticket.email}</div>
                </div>
              </div>
              <div className="text-sm text-gray-600">{ticket.date}</div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
