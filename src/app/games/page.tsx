"use client";

import { useState } from "react";

import CategoryTabs from "@/components/CategoryTabs";
import GameList from "@/components/GameList";
import GameListItem from "@/components/GameListItem";
import Loader from "@/components/Loader";
import PageTemplate from "@/components/PageTemplate";
import { useApi } from "@/contexts/ApiContext";
import { useNextGameForFavorite } from "@/hooks/useNextGameForFavorite";
import { Category } from "@/types";
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
        <CategoryTabs
          activeCategory={activeCategory}
          onChange={(cat) => setActiveCategory(cat)}
        />

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
