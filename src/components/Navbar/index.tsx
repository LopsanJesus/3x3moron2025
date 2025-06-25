"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import "./styles.scss";

export default function Navbar() {
  const pathname = usePathname();

  const navItems = [
    { href: "/games", src: "/basketball_outline.jpg", alt: "Balón" },
    { href: "/ranking", src: "/group_stage.jpg", alt: "Ranking" },
    { href: "/contest", src: "/bracket-icon.jpg", alt: "Concurso" },
    { href: "/eliminatorias", src: "/stopwatch.jpg", alt: "Eliminatorias" },
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
