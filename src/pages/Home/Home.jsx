// Hero.jsx
// Page d'accueil de l'application affichée à la racine "/"
// Affiche le logo, un message d'accroche, un fond personnalisé, et un bouton d'action

import { aregieLogo, bg } from "@/assets";

export default function Hero() {
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
      <div className="flex flex-col items-center  w-[50%] mx-auto">
        <img
          src={aregieLogo}
          alt="Logo"
          className="w-full object-contain mb-2"
        />
        <h2 className="text-4xl font-bold text-white">
          Payez vos factures en ligne facilement avec AREGIE
        </h2>
        <button
          className="bg-blue-600 w-full mt-8 cursor-pointer hover:bg-blue-700 text-white font-bold py-3 px-6 rounded transition"
          onClick={() => (window.location.href = "https://aregie.com")}
        >
          En savoir plus
        </button>
      </div>
    </div>
  );
}
