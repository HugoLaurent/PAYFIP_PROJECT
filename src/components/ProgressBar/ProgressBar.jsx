// ProgressBar.jsx
// Composant d'affichage de la progression en plusieurs étapes.
// Affiche une barre de chargement + des pastilles d'étapes avec validation visuelle.

import v from "@/assets/v.webp";

function ProgressBar({ currentStep, statusTitre, steps }) {
  const totalSteps = steps.length;
  const progressPercentage = (currentStep / totalSteps) * 100;
  const progressColor = statusTitre ? "bg-red-500" : "bg-green-500"; // Rouge si erreur, vert sinon

  return (
    <div className="w-full ">
      {/* Barre principale de progression (horizontale) */}
      <div className="relative w-full h-2 bg-gray-200 rounded-full overflow-hidden">
        <div
          className={`absolute top-0 left-0 h-full ${progressColor} rounded-full transition-all duration-500`}
          style={{ width: `${progressPercentage}%` }}
        />
      </div>

      {/* Indicateurs visuels pour chaque étape */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-4">
        {steps.map((label, index) => {
          const stepNumber = index + 1;
          const completed = stepNumber < currentStep;
          const active = stepNumber === currentStep;
          const indicatorColor = statusTitre ? "red" : "green"; // Couleur conditionnelle

          return (
            <div key={index} className="flex flex-col items-center">
              <div
                className={`flex items-center justify-center
                            w-8 h-8 md:w-10 md:h-10
                            rounded-full border border-gray-300
                            transition-all duration-500
                            ${
                              completed
                                ? `bg-${indicatorColor}-500 border-${indicatorColor}-500`
                                : active
                                ? `bg-white border-${indicatorColor}-500`
                                : "bg-white border-gray-300"
                            }`}
              >
                {completed ? (
                  // Icône de validation si l’étape est terminée
                  <div className="w-4 h-4 md:w-5 md:h-5">
                    <img src={v} alt="Icone de validation" />
                  </div>
                ) : (
                  // Numéro de l’étape
                  <span
                    className={`text-xs md:text-sm font-medium ${
                      active ? `text-${indicatorColor}-500` : "text-gray-500"
                    }`}
                  >
                    {stepNumber}
                  </span>
                )}
              </div>

              {/* Label de l’étape */}
              <span
                className={`mt-2 text-xs md:text-sm ${
                  active || completed
                    ? `text-${indicatorColor}-600 font-medium`
                    : "text-gray-400"
                } text-center`}
              >
                {label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ProgressBar;
