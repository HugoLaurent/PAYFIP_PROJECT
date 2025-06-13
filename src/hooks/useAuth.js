// hooks/useAuth.js
import { useEffect, useState } from "react";

export default function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("authToken");

    // Optionnel : vérification côté backend
    if (token) {
      const checkAuth = async () => {
        try {
          const response = await fetch("/api/test", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          });

          if (response.ok) {
            const data = await response.json();
            if (data.new_token) {
              localStorage.setItem("authToken", data.new_token); // Mettre à jour le token
            }
            setIsAuthenticated(data.valid);
          } else {
            setIsAuthenticated(false);
          }
        } catch (error) {
          console.error(
            "Erreur lors de la vérification de l'authentification :",
            error
          );
          setIsAuthenticated(false);
        } finally {
          setLoading(false);
        }
      };
      checkAuth();
    } else {
      setIsAuthenticated(false);
      setLoading(false);
    }
  }, []);

  return { isAuthenticated, loading };
}
