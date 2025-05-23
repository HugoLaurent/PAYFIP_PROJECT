import { Users, Plus, Minus, Info, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";

import { IconButton } from "@/components";

export default function TicketSelection({
  data,
  formData,
  setFormData,
  setStep,
}) {
  const updateQuantity = (type, delta) => {
    setFormData((prev) => {
      const newValue = Math.max(0, (prev[`nb_${type}`] || 0) + delta);
      return { ...prev, [`nb_${type}`]: newValue };
    });
  };

  const getQuantity = (type) => formData[`nb_${type}`] || 0;

  const getTotalTickets = () =>
    Object.entries(data.prix).reduce((sum, [type]) => {
      return sum + getQuantity(type);
    }, 0);

  const getTotalPrice = () =>
    Object.entries(data.prix).reduce((acc, [type, price]) => {
      return acc + getQuantity(type) * (price || 0);
    }, 0);
  return (
    <div className="flex flex-col gap-6 w-full mx-auto p-4 rounded shadow-sm bg-white">
      <div className="grid grid-cols-2 sm:grid-cols-2 gap-4">
        {Object.entries(data.prix).map(([type, val]) => {
          const label = type.charAt(0).toUpperCase() + type.slice(1);
          const isFree = val === null;
          return (
            <div key={type} className="p-4 border rounded-lg bg-white">
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <Users size={24} className="text-[#223499] mr-3" />
                  <div>
                    <h3 className="font-medium text-gray-900">{label}</h3>
                    <p className="text-sm text-[#6f80e4]">
                      {isFree ? "Gratuit" : `${parseFloat(val).toFixed(2)} €`}
                    </p>
                  </div>
                </div>
                <div className="flex items-center ">
                  <button
                    type="button"
                    onClick={() => updateQuantity(type, -1)}
                    className="p-1 rounded-full hover:bg-gray-100 transition"
                    disabled={getQuantity(type) === 0}
                  >
                    <Minus size={20} className="text-gray-600" />
                  </button>
                  <motion.span
                    key={getQuantity(type)}
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="w-8 text-center font-medium"
                  >
                    {getQuantity(type)}
                  </motion.span>
                  <button
                    type="button"
                    onClick={() => updateQuantity(type, 1)}
                    className="p-1 rounded-full hover:bg-[#2391c817] bg-gray-100 transition"
                  >
                    <Plus size={20} className="text-black" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {getTotalTickets() === 0 ? (
        <div className="flex items-center space-x-2 mb-4 text-sm text-gray-600">
          <Info className="h-4 w-4 text-amber-500" />
          <span>
            Veuillez sélectionner au moins un type de billet pour continuer.
          </span>
        </div>
      ) : (
        <>
          <div className="w-full p-4 bg-[#2391c817] rounded-lg  mx-auto">
            <div className="flex justify-between mb-2">
              <span className="text-gray-700">Total billets :</span>
              <span className="font-medium">{getTotalTickets()}</span>
            </div>
            <div className="flex justify-between text-lg font-bold">
              <span>Prix total :</span>
              <span>{getTotalPrice().toFixed(2)} €</span>
            </div>
          </div>
          <div className="justify-end">
            <IconButton
              icon={ChevronRight}
              onClick={() => setStep(2)}
              color="blue"
            >
              Suivant
            </IconButton>
          </div>
          <div className="fixed bottom-0 left-0 right-0 bg-white shadow px-4 py-2 md:hidden">
            <div className="flex justify-between font-bold text-lg">
              <span>Total :</span>
              <span>{getTotalPrice().toFixed(2)} €</span>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
