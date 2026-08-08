import Link from "next/link";
import type { ReactNode } from "react";

type ButtonVariant = "primary" | "secondary";

const baseClasses =
  "inline-flex items-center justify-center px-6 py-2.5 text-sm font-medium transition-colors";

const variantClasses: Record<ButtonVariant, string> = {
  primary: "bg-ink text-ink-on-fill hover:bg-ink/90",
  secondary: "bg-background text-ink border border-ink hover:bg-surface-hover",
};

export function Button({
  href,
  variant = "primary",
  children,
  className = "",
}: {
  href: string;
  variant?: ButtonVariant;
  children: ReactNode;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
    >
      {children}
    </Link>
  );
}
