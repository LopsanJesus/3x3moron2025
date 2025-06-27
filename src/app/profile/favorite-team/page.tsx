"use client";

import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

import PageTemplate from "@/components/PageTemplate";
import { useApi } from "@/contexts/ApiContext";

import Loader from "@/components/Loader";
import useTeams from "@/hooks/useTeams";
import { validCategories } from "@/utils/transformData";
import "./page.scss";

export default function FavoriteTeamPage() {
  const router = useRouter();
  const { favoriteTeam, setFavoriteTeam, loading } = useApi();
  const { teams, loading: teamsLoading, error } = useTeams();

  const [selected, setSelected] = useState<string | null>(null);

  // Agrupar por categoría y filtrar solo los equipos con status "Inscrito"
  const groupedTeams = useMemo(() => {
    const groups: Record<string, typeof teams> = {};
    for (const team of teams) {
      if (team.status !== "Inscrito") continue; // Filtrar aquí

      if (!groups[team.category]) {
        groups[team.category] = [];
      }
      groups[team.category].push(team);
    }
    return groups;
  }, [teams]);

  const handleSave = () => {
    const team = teams.find((t) => t.id === selected);
    if (team) {
      setFavoriteTeam(team);
      router.replace("/profile");
    }
  };

  useEffect(() => {
    if (error) {
      router.push("/error");
    }
  }, [error, router]);

  if (loading || teamsLoading) return <Loader />;

  if (favoriteTeam && !selected) {
    setSelected(favoriteTeam.id);
  }

  const showSaveButton = selected !== null && selected !== favoriteTeam?.id;

  return (
    <PageTemplate title="Elige tu equipo favorito">
      <div className="favorite-team-page">
        {showSaveButton && (
          <div className="save-button-fixed">
            <button className="confirm-button" onClick={handleSave}>
              Guardar equipo
            </button>
          </div>
        )}

        {validCategories.map((category) => {
          const teams = groupedTeams[category];

          if (!teams) return null;

          return (
            <div
              key={category}
              className={`category-group ${category.toLowerCase()}`}
            >
              <div className="category-title">{category}</div>
              <div className="team-options">
                {teams.map((team) => (
                  <div
                    key={team.id}
                    className={`team-option ${
                      selected === team.id ? "selected" : ""
                    }`}
                    onClick={() => setSelected(team.id)}
                  >
                    <div className="team-name">{team.name}</div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </PageTemplate>
  );
}
