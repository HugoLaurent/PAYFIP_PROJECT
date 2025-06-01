import { aregieLogo, aregieLogoShort } from "@/assets";
import { useLocation } from "react-router-dom";

export default function Header({ serviceData }) {
  const location = useLocation();
  if (location.pathname === "/") return null;
  return (
    <header
      className="px-6 shadow flex items-center justify-between"
      style={{ background: "linear-gradient(to right, white, #0080c0)" }}
    >
      <div className="flex items-center gap-4">
        {serviceData?.logo && (
          <img
            src={serviceData?.logo}
            alt="Logo du service"
            className="h-40 w-40 object-contain rounded"
          />
        )}
      </div>
      <div>
        <img
          className="max-h-18 py-2 w-auto object-contain block md:hidden"
          src={aregieLogoShort}
          alt="Logo court"
        />
        <img
          className="max-h-14 py-2 w-auto object-contain hidden md:block"
          src={aregieLogo}
          alt="Logo long"
        />
      </div>
    </header>
  );
}
