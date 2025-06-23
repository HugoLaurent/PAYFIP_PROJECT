import { useState } from "react";
import { format, isValid } from "date-fns";
import { fr } from "date-fns/locale";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Users, Calendar, Plus, Minus, CreditCard, Info } from "lucide-react";
import { motion } from "framer-motion";
import { IconButton } from "@/components";

export default function AgentTicketForm({ tarifs = {}, onBack, serviceId }) {
  const [email, setEmail] = useState("");
  const [date, setDate] = useState(null);
  const [quantities, setQuantities] = useState({});
  const [paiement, setPaiement] = useState("CB");

  const updateQuantity = (type, delta) => {
    setQuantities((prev) => {
      const newValue = Math.max(0, (prev[type] || 0) + delta);
      return { ...prev, [type]: newValue };
    });
  };

  const getTotal = () =>
    Object.entries(tarifs).reduce((sum, [type, val]) => {
      const qty = quantities[type] || 0;
      const price = parseFloat(val);
      return sum + (isNaN(price) ? 0 : qty * price);
    }, 0);

  const handleSubmit = async () => {
    if (!email.includes("@") || !date || getTotal() === 0) {
      alert(
        "Merci de remplir tous les champs et sélectionner au moins un billet."
      );
      return;
    }

    // Construction du tableau de tickets
    const tickets = Object.entries(quantities)
      .filter(([, qty]) => qty > 0)
      .map(([type, qty]) => ({
        type,
        quantity: qty,
        price: parseFloat(tarifs[type]) || 0,
      }));

    const payload = {
      email,
      dateEntree: date.toISOString().split("T")[0], // format AAAA-MM-JJ
      total: getTotal(),
      dataId: serviceId, // <=== à passer via props
      tickets,
    };

    try {
      const res = await fetch("/api/enregistrement-ticket", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Erreur serveur");

      alert("Billet enregistré !");
      setEmail("");
      setDate(null);
      setQuantities({});
      setPaiement("CB");
    } catch (err) {
      console.error(err);
      alert("Erreur lors de l’enregistrement.");
    }
  };

  return (
    <div className="flex flex-col gap-6 w-full mx-auto p-4 rounded shadow-sm bg-white max-w-xl">
      <button onClick={onBack} className="text-blue-600 underline text-sm mb-2">
        ← Retour au menu
      </button>

      {/* Email */}
      <div>
        <label className="block font-medium mb-1 text-gray-700">
          Email du client
        </label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="exemple@client.com"
          className="w-full border rounded px-4 py-2"
        />
      </div>

      {/* Date */}
      <div>
        <label className="block font-medium mb-1 text-gray-700">
          Date de visite
        </label>
        <DatePicker
          selected={date}
          onChange={(d) => isValid(d) && setDate(d)}
          minDate={new Date()}
          locale={fr}
          dateFormat="dd/MM/yyyy"
          className="w-full border px-4 py-2 rounded"
          placeholderText="Choisir une date"
        />
        {date && (
          <p className="text-sm text-blue-600 mt-1">
            {format(date, "EEEE d MMMM yyyy", { locale: fr })}
          </p>
        )}
      </div>

      {/* Billets */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {Object.entries(tarifs).map(([type, val]) => {
          const label = type.charAt(0).toUpperCase() + type.slice(1);
          const price = parseFloat(val);
          const isFree = isNaN(price) || price === 0;
          return (
            <div key={type} className="p-4 border rounded-lg bg-white">
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <Users size={24} className="text-[#223499] mr-3" />
                  <div>
                    <h3 className="font-medium text-gray-900">{label}</h3>
                    <p className="text-sm text-[#6f80e4]">
                      {isFree ? "Gratuit" : `${price.toFixed(2)} €`}
                    </p>
                  </div>
                </div>
                <div className="flex items-center">
                  <button
                    onClick={() => updateQuantity(type, -1)}
                    className="p-1 rounded-full hover:bg-gray-100 transition"
                    disabled={!quantities[type]}
                  >
                    <Minus size={20} />
                  </button>
                  <motion.span
                    key={quantities[type] || 0}
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="w-8 text-center font-medium"
                  >
                    {quantities[type] || 0}
                  </motion.span>
                  <button
                    onClick={() => updateQuantity(type, 1)}
                    className="p-1 rounded-full bg-gray-100 hover:bg-[#2391c817]"
                  >
                    <Plus size={20} />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Paiement */}
      <div>
        <label className="block font-medium mb-1 text-gray-700">
          Mode de paiement
        </label>
        <select
          value={paiement}
          onChange={(e) => setPaiement(e.target.value)}
          className="w-full border rounded px-4 py-2"
        >
          <option value="CB">Carte bancaire</option>
          <option value="Especes">Espèces</option>
          <option value="Cheque">Chèque</option>
          <option value="Autre">Autre</option>
        </select>
      </div>

      {/* Total + Submit */}
      {getTotal() > 0 ? (
        <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <div className="flex justify-between font-bold text-lg">
            <span>Total :</span>
            <span>{getTotal().toFixed(2)} €</span>
          </div>
        </div>
      ) : (
        <div className="flex items-center gap-2 text-gray-600 text-sm">
          <Info className="h-4 w-4 text-amber-500" />
          Veuillez sélectionner au moins un billet
        </div>
      )}

      <IconButton icon={CreditCard} onClick={handleSubmit} color="green">
        Enregistrer le billet
      </IconButton>
    </div>
  );
}
