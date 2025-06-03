import { IconButton } from "@/components";
import { useNavigate } from "react-router";

export default function Footer() {
  const navigate = useNavigate();

  return (
    <footer className="bg-gray-100 text-center p-4 mt-8">
      <p className="text-gray-600 mb-2">
        © {new Date().getFullYear()} AREGIE. Tous droits réservés.
      </p>
      <p>
        Un service de billetterie sécurisé proposé par{" "}
        <a href="https://aregie.fr" target="_blank" rel="noopener noreferrer">
          AREGIE
        </a>
      </p>
      <p>
        <a href="/mentions-legales" target="_blank" rel="noopener noreferrer">
          Mentions légales et conditions d'utilisation.
        </a>
      </p>

      <IconButton
        className="w-2"
        onClick={() => navigate("/login")}
        color="transparent"
      >
        Je suis un professionnel
      </IconButton>
    </footer>
  );
}
