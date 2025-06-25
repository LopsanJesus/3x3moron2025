"use client";

import Image from "next/image";
import Link from "next/link";

import "./styles.scss";

export default function ErrorPage() {
  return (
    <div className="error-page">
      <div className="error-content">
        <Image
          src="/basketball_outline.jpg"
          alt="Error"
          width={100}
          height={100}
          className="error-image"
        />
        <h1>Lo sentimos!</h1>
        <p>Se ha producido un error inesperado.</p>
        <p>Si necesitas ayuda, contacta con nosotros a través de Instagram:</p>
        <Link
          href="https://www.instagram.com/3x3moron"
          target="_blank"
          rel="noopener noreferrer"
          className="instagram-link"
        >
          <Image
            src="/instagram-icon.png"
            alt="Instagram"
            width={32}
            height={32}
          />
          @3x3moron
        </Link>
      </div>
    </div>
  );
}
