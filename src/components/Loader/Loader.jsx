import { Loader2 } from "lucide-react";

export default function Loader() {
  return (
    <div className="flex flex-col items-center justify-center h-[80vh] text-center">
      <Loader2 className="w-10 h-10 text-blue-500 animate-spin mb-3" />
      <p className="text-sm text-gray-600">Chargement du service...</p>
    </div>
  );
}
