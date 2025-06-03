import { aregieLogo, bg } from "@/assets";

export default function Page404() {
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
        <h1 className="text-5xl font-bold mb-4">404 - Service introuvable</h1>
        <p className="text-lg text-white/90 max-w-xl">
          Veuillez contacter directement l’organisme pour lequel vous souhaitez
          effectuer un paiement.
        </p>
      </div>
    </div>
  );
}
