"use client";

import Image from "next/image";

import "./page.scss";

export default function HomePage() {
  return (
    <main>
      <section className="hero">
        <div className="hero-content">
          <div className="title-section">
            <span className="title">3x3 MORÓN</span>
            <span className="subtitle">2025</span>
          </div>

          <span className="subtitle">
            La 5ᵃ edición del torneo más refrecante del verano
          </span>

          <a href="/signup" className="cta">
            Inscribir mi equipo
          </a>
        </div>

        <div className="scroll-indicator">
          <span className="arrow" />
        </div>
      </section>

      <section className="info">
        <Image
          src="/logo.jpeg"
          alt="Logo del torneo"
          width={140}
          height={140}
          className="logo"
        />
        <h2>¡El torneo del verano vuelve con más fuerza!</h2>
        <p className="description">
          Vive la emoción del baloncesto 3x3 en Morón. Una experiencia única
          para jugadores y aficionados de todas las edades.
        </p>

        <div className="cards">
          <div className="card">
            <h3>📍 Ubicación</h3>
            <p>Pabellón Alameda, Morón de la Frontera</p>
          </div>
          <div className="card">
            <h3>📅 Fecha</h3>
            <p>28 de Junio, 2025</p>
          </div>
          <div className="card">
            <h3>🏆 Categorías</h3>
            <p>Senior, Femenino, Mini, Peques</p>
          </div>
        </div>

        <div className="banner-final">
          <Image
            src="/cartel.jpeg"
            alt="Cartel promocional 3x3 Morón 2025"
            width={600}
            height={850}
            className="banner-image"
            style={{ width: "100%", height: "auto" }}
          />
        </div>
      </section>
    </main>
  );
}
