"use client";

import PageTemplate from "@/components/PageTemplate";
import "./page.scss";

export default function RulesPage() {
  return (
    <PageTemplate title="Reglamento 3x3 Starlabs Morón">
      <main className="rules-container">
        <p>
          El Maratón de 3X3 Starlabs Morón es un evento de baloncesto base en
          modalidad 3X3. Si bien las reglas de la competición han sido
          inspiradas en las normas oficiales FIBA 3X3 (
          <a
            href="https://fiba3x3.com/en/rules.html#rules"
            target="_blank"
            rel="noopener noreferrer"
          >
            consultar normas FIBA
          </a>
          ), estas han sido modificadas para adaptarse a las condiciones
          particulares del evento.
        </p>

        <h2>1. Equipos</h2>
        <p>
          Cada equipo estará formado por no más de 4 jugadores (3 en cancha y 1
          suplente).
        </p>

        <h2>2. Oficiales del Partido</h2>
        <p>
          El partido será dirigido por hasta 3 oficiales de mesa y un árbitro,
          si lo hubiera.
        </p>

        <h2>3. Comienzo del Juego</h2>
        <ul>
          <li>
            Ambos equipos podrán calentar al mismo tiempo antes del partido.
          </li>
          <li>
            El lanzamiento de una moneda determinará qué equipo recibe la
            primera posesión.
          </li>
          <li>
            El partido no podrá comenzar sin 3 jugadores listos por equipo.
          </li>
        </ul>

        <h2>4. Anotación</h2>
        <ul>
          <li>Tiro dentro del arco: 1 punto.</li>
          <li>Tiro detrás del arco: 2 puntos.</li>
          <li>Tiro libre: 1 punto.</li>
        </ul>

        <h2>5. Duración del Juego y Resultado</h2>
        <ul>
          <li>
            Fase grupos: 10 min · Segunda fase: 12 min · Semifinales/final: 15
            min.
          </li>
          <li>Un tiempo muerto por equipo (1 min).</li>
          <li>El primero en alcanzar 21 puntos gana, salvo en semis/final.</li>
          <li>
            En caso de empate:
            <ul>
              <li>Fase grupos: tanda de 3 tiros libres.</li>
              <li>Eliminatorias: prórroga + tiros libres si es necesario.</li>
            </ul>
          </li>
          <li>
            Incomparecencia: 3 min de espera, segunda vez = descalificación.
          </li>
          <li>
            Acta firmada por el perdedor debe ser entregada por el ganador.
          </li>
        </ul>

        <h2>6. Faltas</h2>
        <ul>
          <li>5 faltas personales = exclusión del jugador.</li>
          <li>
            A partir de 5.ª/6.ª/7.ª falta (según fase): se sanciona con 1 tiro
            libre y se mantiene posesión si se falla.
          </li>
        </ul>

        <h2>7. Reglas de Posesión</h2>
        <ul>
          <li>
            Tras anotación: el equipo contrario debe llevar el balón detrás del
            arco.
          </li>
          <li>Robos/bloqueos: deben salir detrás del arco.</li>
          <li>Check-ball tras balón muerto.</li>
          <li>
            Ambos pies deben estar fuera del arco para considerar posición
            válida.
          </li>
          <li>En lucha: la posesión es para el equipo defensor.</li>
        </ul>

        <h2>8. Juego Activo</h2>
        <ul>
          <li>Fase normal: 5 segundos tras advertencia de pasividad.</li>
          <li>Semis/final: 14 segundos para intentar tiro.</li>
        </ul>

        <h2>9. Sustituciones</h2>
        <p>
          Se permiten al intercambiar el balón o tras check-ball. No se requiere
          avisar a la mesa.
        </p>

        <h2>10. Tiempos Muertos</h2>
        <p>
          En fase final, un tiempo muerto de 1 minuto por equipo. Se solicita en
          balón muerto.
        </p>

        <h2>11. Clasificación en Fase de Grupos</h2>
        <ol>
          <li>Mayor número de victorias</li>
          <li>Resultado del enfrentamiento directo</li>
          <li>Diferencia de puntos a favor y en contra</li>
        </ol>

        <h2>12. Conducta y Descalificación</h2>
        <ul>
          <li>
            Se podrá descalificar a un jugador por violencia, agresión verbal o
            física, o por alterar resultados.
          </li>
          <li>2 faltas antideportivas = exclusión del partido.</li>
        </ul>

        <p className="last-updated">Última actualización: 9 de junio de 2025</p>
      </main>
    </PageTemplate>
  );
}
