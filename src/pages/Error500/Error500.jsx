import { aregieLogo, bg } from "@/assets";

export default function Error500() {
  return (
    <div
      className="flex flex-col gap-8 justify-center h-screen text-white p-12"
      style={{
        backgroundImage: `url(${bg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      <div className="flex flex-col items-center w-[50%] mx-auto text-center">
        <img
          src={aregieLogo}
          alt="Logo"
          className="w-full object-contain mb-4"
        />
        <h1 className="text-5xl font-bold mb-4">500 - Erreur de serveur</h1>
        <p className="text-lg text-white/90 max-w-xl">
          Nos serveurs rencontrent actuellement un problème. Nous travaillons
          pour le résoudre au plus vite. Veuillez réessayer plus tard.
        </p>
      </div>
    </div>
  );
}
