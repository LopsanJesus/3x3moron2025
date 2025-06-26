"use client";

import Button from "@/components/Button";
import Image from "next/image";
import "./page.scss";

export default function HomePage() {
  return (
    <main>
      <section className="hero">
        <div className="hero-content">
          <div className="title-section">
            <span className="title">3x3 MORÓN</span>
            <span className="subtitle">28 / 06 / 2025</span>
          </div>

          <span className="subtitle">
            La 5ᵃ edición del torneo más refrescante del verano
          </span>

          <Button href="/signup">Inscribir mi equipo</Button>
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
            <p>
              <a
                href="https://maps.app.goo.gl/QnjhBsL2PmEn16Vr9"
                target="_blank"
                rel="noopener noreferrer"
                className="modern-link"
              >
                Pabellón Alameda, Morón de la Frontera
              </a>
            </p>
          </div>

          <div className="card">
            <h3>📅 Fecha</h3>
            <p>28 / 06 / 2025</p>
          </div>

          <div className="card">
            <h3>🎯 Categorías</h3>
            <p>
              <strong>Mini:</strong> Nacidos entre 2009 y 2012
              <br />
              <strong>Peques:</strong> Desde 2013 en adelante
            </p>
          </div>
        </div>

        <div className="cards extras">
          <div className="card">
            <h3>🎁 Regalo asegurado</h3>
            <p>
              Todos los participantes recibirán un obsequio especial del torneo.
            </p>
          </div>
          <div className="card">
            <h3>🏀 Concurso de triples</h3>
            <p>
              ¡Demuestra tu puntería y gana premios en el concurso de triples!
            </p>
          </div>
          <div className="card">
            <h3>💦 Acceso a la piscina</h3>
            <p>
              Disfruta de acceso gratuito a la piscina municipal durante las
              horas más calurosas del día.
            </p>
          </div>
          <div className="card">
            <h3>
              <Image
                src="/instagram-icon.png"
                alt="Instagram"
                width={20}
                height={20}
              />{" "}
              Instagram
            </h3>
            <p>
              Síguenos en{" "}
              <a
                href="https://www.instagram.com/3x3moron/"
                target="_blank"
                rel="noopener noreferrer"
                className="modern-link"
              >
                @3x3moron
              </a>{" "}
              para estar al tanto de todas las novedades.
            </p>
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
