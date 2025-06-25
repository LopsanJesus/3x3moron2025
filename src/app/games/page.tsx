"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import "./page.scss";

export type Game = {
  id: number;
  teamA: string;
  teamB: string;
  scoreA: number;
  scoreB: number;
  category: "Senior" | "Femenino" | "Mini" | "Peque";
  time: string;
  court: string;
};

const categories = ["Senior", "Femenino", "Mini", "Peque"];

const games: Game[] = [
  {
    id: 1,
    teamA: "Tigres",
    teamB: "Águilas",
    scoreA: 3,
    scoreB: 2,
    category: "Senior",
    time: "10:00 AM",
    court: "Pista 1",
  },
  {
    id: 2,
    teamA: "Leonas",
    teamB: "Panteras",
    scoreA: 1,
    scoreB: 4,
    category: "Femenino",
    time: "11:00 AM",
    court: "Pista 2",
  },
  {
    id: 3,
    teamA: "MiniRockets",
    teamB: "MiniLobos",
    scoreA: 2,
    scoreB: 2,
    category: "Mini",
    time: "12:00 PM",
    court: "Pista 3",
  },
  {
    id: 4,
    teamA: "PequeTiburones",
    teamB: "PequeDelfines",
    scoreA: 0,
    scoreB: 1,
    category: "Peque",
    time: "1:00 PM",
    court: "Pista 4",
  },
  {
    id: 5,
    teamA: "SeniorDragones",
    teamB: "SeniorFénix",
    scoreA: 5,
    scoreB: 3,
    category: "Senior",
    time: "2:00 PM",
    court: "Pista 1",
  },
  {
    id: 6,
    teamA: "Fieras F",
    teamB: "Guerreras",
    scoreA: 2,
    scoreB: 2,
    category: "Femenino",
    time: "3:00 PM",
    court: "Pista 2",
  },
  {
    id: 7,
    teamA: "MiniAstros",
    teamB: "MiniEstrellas",
    scoreA: 1,
    scoreB: 0,
    category: "Mini",
    time: "4:00 PM",
    court: "Pista 3",
  },
  {
    id: 8,
    teamA: "PequeZorros",
    teamB: "PequeConejos",
    scoreA: 3,
    scoreB: 3,
    category: "Peque",
    time: "5:00 PM",
    court: "Pista 4",
  },
  {
    id: 9,
    teamA: "Tiburones S",
    teamB: "Águilas S",
    scoreA: 2,
    scoreB: 1,
    category: "Senior",
    time: "6:00 PM",
    court: "Pista 1",
  },
  {
    id: 10,
    teamA: "Femeninas Pro",
    teamB: "Reinas del Sur",
    scoreA: 4,
    scoreB: 2,
    category: "Femenino",
    time: "7:00 PM",
    court: "Pista 2",
  },
];

export default function GamesPage() {
  const [openGameId, setOpenGameId] = useState<number | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>("Senior");

  const toggleGame = (id: number) => {
    setOpenGameId((prev) => (prev === id ? null : id));
  };

  const filteredGames = games.filter(
    (game) => game.category === activeCategory
  );

  return (
    <div className="games-page">
      {/* TOPBAR */}
      <div className="topbar">
        <div style={{ display: "flex", alignItems: "center" }}>
          <Image src="/logo.jpeg" alt="Logo" width={32} height={32} />
          <span className="topbar-title">3x3 MORÓN</span>
        </div>
        <Link href="/profile" className="profile-link">
          👤
        </Link>
      </div>

      {/* FORMULARIO */}
      <div className="formulario">
        <div className="titulo">Todos los partidos</div>

        <div className="tabs">
          {categories.map((cat) => (
            <button
              key={cat}
              className={`tab-button ${cat === activeCategory ? "active" : ""}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="games-list">
          {filteredGames.map((game) => (
            <div
              key={game.id}
              className={`game-card ${game.category}`}
              onClick={() => toggleGame(game.id)}
            >
              <div className="teams-row">
                <div className="team-names">
                  <span className="team-name">{game.teamA}</span>
                  <span className="team-name">{game.teamB}</span>
                </div>

                <div className="team-info">
                  <div className="team-score">
                    <span>{game.scoreA}</span>
                    <span>{game.scoreB}</span>
                  </div>
                  <div className="click-hint">
                    {openGameId === game.id ? "▲" : "▼"}
                  </div>
                </div>
              </div>

              {openGameId === game.id && (
                <div className="extra-info">
                  <p>
                    <strong>Hora:</strong> {game.time}
                  </p>
                  <p>
                    <strong>Pista:</strong> {game.court}
                  </p>
                  <p>
                    <strong>Categoría:</strong> {game.category}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* NAVBAR */}
      <div className="navbar">
        <Link href="/games" className="nav-item">
          🏀
        </Link>
        <Link href="/ranking" className="nav-item">
          📊
        </Link>
        <Link href="/triples" className="nav-item">
          🎯
        </Link>
        <Link href="/eliminatorias" className="nav-item">
          🏆
        </Link>
      </div>
    </div>
  );
}
