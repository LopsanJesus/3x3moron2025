"use client";

import Button from "@/components/Button";
import Loader from "@/components/Loader";
import PageTemplate from "@/components/PageTemplate";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

import "./page.scss";

export default function HomePage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [checkedVisit, setCheckedVisit] = useState(false);

  useEffect(() => {
    const noRedirect = searchParams.get("noRedirect");
    if (noRedirect === "true") {
      // Si el parámetro está presente, no redirigir, solo marcar como visitado
      localStorage.setItem("hasVisited", "true");
      setCheckedVisit(true);
      return;
    }

    const hasVisited = localStorage.getItem("hasVisited");
    if (hasVisited === "true") {
      router.replace("/games");
    } else {
      localStorage.setItem("hasVisited", "true");
      setCheckedVisit(true);
    }
  }, [router, searchParams]);

  if (!checkedVisit) {
    return <Loader />;
  }

  return (
    <PageTemplate title="Bienvenidos">
      <main className="home-page">
        <section className="navigation-buttons">
          <Button
            onClick={() => router.push("/rules")}
            className="btn-rules"
            size="small"
          >
            Normas del torneo
          </Button>
          <Button
            onClick={() => router.push("/games")}
            className="btn-games"
            size="small"
          >
            Todos los Partidos
          </Button>
        </section>

        <section className="intro">
          <Image
            src="/logo.jpeg"
            alt="Logo del torneo"
            width={140}
            height={140}
            className="logo"
          />
          <h1>¡El torneo del verano vuelve con más fuerza!</h1>
          <p className="description">
            Vive la emoción del baloncesto 3x3 en Morón. Una experiencia única
            para jugadores y aficionados de todas las edades.
          </p>
        </section>

        <section className="tournament-info">
          <h2>Información del torneo</h2>

          <div className="cards">
            <article className="card">
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
            </article>

            <article className="card">
              <h3>📅 Fecha</h3>
              <p>Sábado, 28 / 06 / 2025</p>
            </article>

            <article className="card">
              <h3>🎯 Categorías</h3>
              <p>
                <strong>Mini:</strong> Nacidos entre 2009 y 2012
                <br />
                <strong>Peques:</strong> Desde 2013 en adelante
              </p>
            </article>
          </div>

          <div className="cards extras">
            <article className="card">
              <h3>🎁 Regalo asegurado</h3>
              <p>
                Todos los participantes recibirán un obsequio especial del
                torneo.
              </p>
            </article>
            <article className="card">
              <h3>🏀 Concurso de triples</h3>
              <p>
                ¡Demuestra tu puntería y gana premios en el concurso de triples!
              </p>
            </article>
            <article className="card">
              <h3>💦 Acceso a la piscina</h3>
              <p>
                Disfruta de acceso gratuito a la piscina municipal durante las
                horas más calurosas del día.
              </p>
            </article>
            <article className="card instagram-card">
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
            </article>
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
    </PageTemplate>
  );
}
