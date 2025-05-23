import { useState, useEffect } from "react";
import QRCode from "qrcode";

export default function useQrCode(value, options = {}) {
  const [qrCodeUrl, setQrCodeUrl] = useState("");

  useEffect(() => {
    if (!value) return;

    QRCode.toDataURL(value, options)
      .then(setQrCodeUrl)
      .catch((err) => {
        console.error("QR code generation error", err);
        setQrCodeUrl("");
      });
  }, [value, options]);

  return qrCodeUrl;
}
