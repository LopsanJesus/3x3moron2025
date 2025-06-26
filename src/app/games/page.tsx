"use client";

import { useState } from "react";

import GameList from "@/components/GameList";
import PageTemplate from "@/components/PageTemplate";
import { Category, Game } from "@/types";

import Loader from "@/components/Loader";
import { useApi } from "@/contexts/ApiContext";
import { validCategories } from "@/utils/transformData";
import "./page.scss";

export default function GamesPage() {
  const [activeCategory, setActiveCategory] = useState<Category>("Senior");
  const [showCompleted, setShowCompleted] = useState(false);

  const { games, loading } = useApi();

  if (loading) return <Loader />;

  // Filtramos según categoría y si se deben mostrar completados
  const filteredGames = games.filter((game: Game) => {
    const isCompleted = game.score1 !== undefined && game.score2 !== undefined;
    const matchesCategory = game.category === activeCategory;

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
