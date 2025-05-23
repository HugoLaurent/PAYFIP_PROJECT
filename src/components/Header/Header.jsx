import { aregieLogo, aregieLogoShort } from "@/assets";

export default function Header({ serviceData }) {
  if (!serviceData) return null;
  const { logo } = serviceData;

  return (
    <header
      className="px-6 shadow flex items-center justify-between"
      style={{ background: "linear-gradient(to right, white, #0080c0)" }}
    >
      <div className="flex items-center gap-4">
        <img
          src={logo}
          alt="Logo du service"
          className="h-40 w-40 object-contain rounded"
        />
      </div>
      <div>
        <img
          className="max-h-18 w-auto object-contain block md:hidden"
          src={aregieLogoShort}
          alt="Logo court"
        />
        <img
          className="max-h-14 w-auto object-contain hidden md:block"
          src={aregieLogo}
          alt="Logo long"
        />
      </div>
    </header>
  );
}
