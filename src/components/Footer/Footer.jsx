import { IconButton } from "@/components";
import { useNavigate } from "react-router";

export default function Footer() {
  const navigate = useNavigate();
  if (
    (location.pathname === "/404") |
    (location.pathname === "/500") |
    (location.pathname === "/")
  )
    return null;
  return (
    <footer className="bg-gray-100 text-center p-4 mt-8 flex justify-between items-center ">
      <p className="text-gray-600 ">
        © {new Date().getFullYear()} AREGIE. Tous droits réservés.
      </p>
      <div className="flex items-center gap-4">
        <a href="/mentions-legales" target="_blank" rel="noopener noreferrer">
          Mentions légales et conditions d'utilisation.
        </a>
        <a className=" text-blue-600 hover:underline" href="/login">
          Je suis un professionnel
        </a>
      </div>
    </footer>
  );
}
