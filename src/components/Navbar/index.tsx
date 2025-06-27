"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import "./styles.scss";

export default function Navbar() {
  const pathname = usePathname();

  const navItems = [
    { href: "/?noRedirect=true", src: "/home.png", alt: "Inicio" },
    { href: "/games", src: "/basketball_outline.jpg", alt: "Basket" },
    { href: "/groups", src: "/group_stage.jpg", alt: "Ranking" },
    // { href: "/brackets", src: "/bracket-icon.jpg", alt: "Eliminatorias" },
    { href: "/contest", src: "/stopwatch.jpg", alt: "Concurso" },
  ];

  return (
    <div className="navbar">
      {navItems.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={`nav-item ${pathname === item.href ? "active" : ""}`}
        >
          <Image
            src={item.src}
            alt={item.alt}
            width={24}
            height={24}
            className="nav-icon"
            priority={pathname === item.href}
          />
        </Link>
      ))}
    </div>
  );
}
