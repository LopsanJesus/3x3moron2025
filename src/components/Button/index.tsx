import Link from "next/link";
import "./styles.scss";

interface ButtonProps {
  href?: string;
  onClick?: () => void;
  size?: "small" | "large";
  className?: string;
  children: React.ReactNode;
}

export default function Button({
  href,
  onClick,
  size = "large",
  className,
  children,
}: ButtonProps) {
  if (href) {
    return (
      <Link href={href} className={`Button ${size} ${className || ""}`}>
        {children}
      </Link>
    );
  }

  return (
    <div
      className={`Button ${size} ${className || ""}`}
      role="button"
      tabIndex={0}
      onClick={onClick}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") onClick?.();
      }}
    >
      {children}
    </div>
  );
}
