import { ButtonHTMLAttributes, ReactNode } from "react";
import LoadingSpinner from "./LoadingSpinner";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  loading?: boolean;
  children: ReactNode;
}

export default function Button({
  variant = "primary",
  size = "md",
  loading = false,
  children,
  className = "",
  disabled,
  ...props
}: ButtonProps) {
  const baseClasses =
    "inline-flex items-center justify-center rounded-lg font-medium transition-colors focus:outline-none focus:ring-0 disabled:opacity-50 disabled:cursor-not-allowed";

  const variantClasses = {
    primary: "text-white focus:ring-accent",
    secondary: "text-foreground focus:ring-gray-500",
    outline: "text-foreground focus:ring-accent",
    ghost: "text-foreground focus:ring-accent",
  };

  const sizeClasses = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-sm",
    lg: "px-6 py-3 text-base",
  };

  const getButtonStyle = () => {
    switch (variant) {
      case "primary":
        return { backgroundColor: "var(--accent)" };
      case "secondary":
        return { backgroundColor: "var(--muted)" };
      case "outline":
        return { backgroundColor: "var(--muted)" };
      case "ghost":
        return { backgroundColor: "transparent" };
      default:
        return {};
    }
  };

  const handleMouseEnter = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (disabled || loading) return;
    switch (variant) {
      case "primary":
        e.currentTarget.style.backgroundColor = "var(--accent-hover)";
        break;
      case "secondary":
      case "outline":
      case "ghost":
        e.currentTarget.style.backgroundColor = "var(--muted)";
        break;
    }
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (disabled || loading) return;
    const style = getButtonStyle();
    Object.assign(e.currentTarget.style, style);
  };

  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} btn-animate ${className}`}
      style={getButtonStyle()}
      disabled={disabled || loading}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      {...props}
    >
      {loading && <LoadingSpinner size="sm" className="mr-2" />}
      {children}
    </button>
  );
}
