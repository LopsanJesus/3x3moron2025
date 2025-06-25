"use client";
import { useEffect, useState } from "react";

import GameList from "@/components/GameList";
import PageTemplate from "@/components/PageTemplate";
import { AirtableGame, Category, Game } from "@/types";

import {
  transformAirtableToGame,
  validCategories,
} from "@/utils/transformData";
import "./page.scss";

export default function GamesPage() {
  const [activeCategory, setActiveCategory] = useState<Category>("Senior");
  const [showCompleted, setShowCompleted] = useState(false);

  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPartidos = async () => {
      try {
        const res = await fetch("/api/games");
        if (!res.ok) {
          throw new Error("Error al obtener los partidos");
        }

        const data: AirtableGame[] = await res.json();
        setGames(transformAirtableToGame(data));
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchPartidos();
  }, []);

  if (loading) return <p>Cargando partidos...</p>;
  if (error) return <p>Error: {error}</p>;

  // Filtramos según categoría y si se deben mostrar completados
  const filteredGames = games.filter((game) => {
    const isCompleted = game.scoreA !== undefined && game.scoreB !== undefined;
    const matchesCategory = game.category === activeCategory;

    console.log("game", game);

    return matchesCategory && (showCompleted || !isCompleted);
  });

  return (
    <PageTemplate title="Partidos">
      <div className="games-page">
        <div className="tabs">
          {validCategories.map((cat) => (
            <button
              key={cat}
              className={`tab-button ${cat} ${
                cat === activeCategory ? "active" : ""
              }`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="checkbox-row">
          <label className="checkbox-label">
            <input
              type="checkbox"
              checked={showCompleted}
              onChange={(e) => setShowCompleted(e.target.checked)}
            />
            Mostrar terminados
          </label>
        </div>

        <GameList games={filteredGames} activeCategory={activeCategory} />
      </div>
    </PageTemplate>
  );
}
