"use client";

import Button from "@/components/Button";
import Loader from "@/components/Loader";
import PageTemplate from "@/components/PageTemplate";
import { useApi } from "@/contexts/ApiContext";
import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";

import "./page.scss";

export default function ProfilePage() {
  const router = useRouter();
  const { favoriteTeam, loading, removeFavoriteTeam } = useApi();

  if (loading) return <Loader />;

  return (
    <PageTemplate title="Mi Zona">
      <div className="profile-page">
        <div className="profile-section">
          <div className="section-title">Equipo favorito</div>

          {favoriteTeam ? (
            <>
              <div
                className={`team-card ${favoriteTeam.category.toLowerCase()}`}
              >
                <div className="team-name">{favoriteTeam.name}</div>
                <div className="team-category">{favoriteTeam.category}</div>
              </div>
              <div className="team-actions">
                <Button
                  onClick={() => router.push("/profile/favorite-team")}
                  size="small"
                >
                  Cambiar equipo
                </Button>
                <button className="delete-button" onClick={removeFavoriteTeam}>
                  <Trash2 size={16} />
                </button>
              </div>
            </>
          ) : (
            <>
              <div className="team-placeholder">
                Aún no has elegido tu equipo favorito.
              </div>
              <Button
                onClick={() => router.push("/profile/favorite-team")}
                size="small"
              >
                Elegir equipo
              </Button>
            </>
          )}
        </div>

        <div className="profile-section">
          <div className="section-title">Normas del torneo</div>
          <Button href="/rules" size="small">
            Ver normas
          </Button>
        </div>
      </div>
    </PageTemplate>
  );
}
