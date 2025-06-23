import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function PreDashboard() {
  const [services, setServices] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const token = localStorage.getItem("authToken");
        const res = await fetch("/api/test", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json();

        if (data.services.length === 1) {
          navigate(`/dashboard/${data.services[0].id}`);
        } else {
          setServices(data.services);
        }
      } catch (error) {
        console.error("Erreur service :", error);
      }
    };

    fetchServices();
  }, [navigate]);

  return (
    <main className="flex flex-col items-center gap-4 max-w-lg mx-auto py-10 px-4">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">
        Choisissez un service
      </h2>
      {services.map((service) => (
        <button
          key={service.id}
          onClick={() => navigate(`/dashboard/${service.id}`)}
          className="bg-white shadow-md border rounded-lg p-4 w-full flex items-center gap-4 hover:bg-gray-50 transition"
        >
          <img src={service.logo} alt="" className="w-10 h-10 object-contain" />
          <span className="font-medium">{service.titre}</span>
        </button>
      ))}
    </main>
  );
}
