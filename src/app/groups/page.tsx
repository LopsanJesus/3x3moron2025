"use client";

import { useState } from "react";

import Loader from "@/components/Loader";
import PageTemplate from "@/components/PageTemplate";
import { useApi } from "@/contexts/ApiContext";
import useGetRankedMatches from "@/hooks/useGetRankedMatches";
import { Category } from "@/types";
import { validCategories } from "@/utils/transformData";

import "./styles.scss";

export default function GroupsPage() {
  const { games, loading } = useApi();
  const [activeCategory, setActiveCategory] = useState<Category>("Senior");

  const stats = useGetRankedMatches(games);

  if (loading || !stats) return <Loader />;

  const categoryStats = stats.find((item) => item.category === activeCategory);

  return (
    <PageTemplate title="Grupos">
      <div className="groups-page">
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

        <div className="groups-container">
          {categoryStats?.groups.map((group) => (
            <div key={group.group} className="group-card">
              <div className="group-title">Grupo {group.group}</div>
              <div className="group-table">
                <div className="table-header">
                  <span>Equipo</span>
                  <span>PJ</span>
                  <span>PG</span>
                  <span>BA</span>
                </div>
                {group.teams.map((team, index) => (
                  <div key={index} className="table-row">
                    <span>{team.team}</span>
                    <span>{team.games}</span>
                    <span>{team.wins}</span>
                    <span>{team.basketAverage}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </PageTemplate>
  );
}
