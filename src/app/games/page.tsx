"use client";

import { useState } from "react";

import GameList from "@/components/GameList";
import GameListItem from "@/components/GameListItem";
import Loader from "@/components/Loader";
import PageTemplate from "@/components/PageTemplate";
import { useApi } from "@/contexts/ApiContext";
import { useNextGameForFavorite } from "@/hooks/useNextGameForFavorite";
import { Category } from "@/types";
import { validCategories } from "@/utils/transformData";
import "./page.scss";

export default function GamesPage() {
  const [activeCategory, setActiveCategory] = useState<Category>("Senior");
  const [showCompleted, setShowCompleted] = useState(false);

  const { games, loading, favoriteTeam } = useApi();

  const nextGameForFavorite = useNextGameForFavorite(games, favoriteTeam);

  if (loading) return <Loader />;

  const filteredGames = games.filter((game) => {
    const isCompleted = game.score1 && game.score2;

    console.log("isCompleted", isCompleted);

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

        {nextGameForFavorite && (
          <div className="next-game">
            <h3>Tu próximo partido</h3>
            <GameListItem
              game={nextGameForFavorite}
              isOpen={false}
              onToggle={() => {}}
            />
          </div>
        )}

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
