import { useEffect, useState } from "react";
import { Booking } from "@/pages";
import { useNavigate } from "react-router";
import { Loader } from "@/components";
export default function FormContainer({ setServiceData }) {
  const navigate = useNavigate(); // ✅ ici
  const orgName = window.location.pathname.split("/")[1];
  const [mode, setMode] = useState(null); // 'billeterie' | 'facture'
  const [localData, setLocalData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`/api/service/${orgName}`);
        const data = await res.json();

        if (data?.code === 0) {
          navigate("/404"); // ✅ ici, après réception
          return;
        }

        setMode(data.type);
        setLocalData(data);
        setServiceData(data);
      } catch {
        navigate("/500"); // ✅ ici, en cas d'erreur
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [orgName, setServiceData, navigate]);

  if (loading) return <Loader />;
  if (!mode) return <div>Erreur de chargement</div>;

  return (
    <div>
      {mode === "billeterie" && <Booking data={localData} />}
      {mode === "facture" && <p>Formulaire de facture</p>}
    </div>
  );
}
