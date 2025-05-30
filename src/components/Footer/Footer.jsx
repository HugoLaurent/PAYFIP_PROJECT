import { IconButton } from "@/components";

export default function Footer({ url }) {
  console.log(url);

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
      <IconButton
        className="w-2"
        onClick={() => {
          window.location.href = `/${url}/gestion`;
        }}
        color="transparent"
      >
        Je suis un professionnel
      </IconButton>
    </footer>
  );
}
