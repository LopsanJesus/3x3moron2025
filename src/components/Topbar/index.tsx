"use client";

import Image from "next/image";
import Link from "next/link";

import { useRouter } from "next/navigation";
import "./styles.scss";

interface TopbarProps {
  title?: string;
  showProfile?: boolean;
}

export default function Topbar({
  title = "3x3 MORÓN",
  showProfile = true,
}: TopbarProps) {
  const router = useRouter();

  return (
    <div className="topbar">
      <div className="topbar-left" onClick={() => router.push("/")}>
        <Image src="/logo.jpeg" alt="Logo" width={32} height={32} />
        <span className="topbar-title">{title}</span>
      </div>

      {showProfile && (
        <Link href="/profile" className="profile-link">
          <Image
            src="/profile.png"
            alt="Perfil"
            width={32}
            height={32}
            className="profile-image"
          />
        </Link>
      )}
    </div>
  );
}
