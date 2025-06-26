import Link from "next/link";

import "./styles.scss";

interface ButtonProps {
  href: string;
  children: React.ReactNode;
}

export default function Button({ href, children }: ButtonProps) {
  return (
    <Link href={href} className="Button">
      {children}
    </Link>
  );
}
