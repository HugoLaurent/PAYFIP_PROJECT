import { useEffect, useState } from "react";
import { Booking } from "@/pages";

export default function FormContainer({ setServiceData }) {
  const orgName = window.location.pathname.split("/")[1];
  const [mode, setMode] = useState(null); // 'billeterie' | 'facture'
  const [localData, setLocalData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`/api/service/${orgName}`);
        const data = await res.json();
        setMode(data.type);
        setLocalData(data);
        setServiceData(data);
        console.log("Data fetched:", data);
      } catch {
        // handle error
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [orgName, setServiceData]);

  if (loading) return <div>Chargement...</div>;
  if (!mode) return <div>Erreur de chargement</div>;

  return (
    <div>
      {mode === "billeterie" && <Booking data={localData} />}
      {mode === "facture" && <p>Formulaire de facture</p>}
    </div>
  );
}
