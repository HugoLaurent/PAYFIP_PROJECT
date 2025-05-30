import { cn } from "@/lib/utils"; // ou remplace par simple join si tu n'as pas ce helper
import { Loader2 } from "lucide-react";

export default function IconButton({
  children,
  onClick,
  icon: Icon,
  className = "",
  color = "blue",
  isLoading = false,
  disabled = false,
  type = "button",
}) {
  const baseColor = {
    blue: "w-full bg-blue-600 hover:bg-blue-700 text-white",
    green: "w-full bg-green-600 hover:bg-green-700 text-white",
    red: "w-full bg-red-600 hover:bg-red-700 text-white",
    gray: "w-full bg-gray-600 hover:bg-gray-700 text-white",
    transparent:
      "w-full bg-transparent hover:bg-gray-100 text-gray-800 hover:text-gray-900",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || isLoading}
      className={cn(
        "flex items-center cursor-pointer justify-center py-2 rounded transition font-medium",
        baseColor[color],
        isLoading && "opacity-60 cursor-not-allowed",
        className
      )}
    >
      {isLoading ? (
        <Loader2 className="animate-spin w-5 h-5 mr-2" />
      ) : Icon ? (
        <Icon className="w-4 h-4 mr-2" />
      ) : null}
      <span>{children}</span>
    </button>
  );
}
