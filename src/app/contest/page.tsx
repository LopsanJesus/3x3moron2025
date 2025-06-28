"use client";
import Image from "next/image";
import { useMemo } from "react";

import Loader from "@/components/Loader";
import PageTemplate from "@/components/PageTemplate";
import { useApi } from "@/contexts/ApiContext";
import { ContestPlayer } from "@/types";

import "./page.scss";

export default function ContestPage() {
  const { players, loading } = useApi();

  const final = useMemo(
    () =>
      players
        .filter((p) => p.final === true)
        .sort((a, b) => {
          const primaryA = a.score3 ?? -1;
          const primaryB = b.score3 ?? -1;
          if (primaryA !== primaryB) return primaryB - primaryA;

          // En caso de empate o sin score3, ordenar por score2
          const secondaryA = a.score2 ?? -1;
          const secondaryB = b.score2 ?? -1;
          return secondaryB - secondaryA;
        }),
    [players]
  );

  const semifinal = useMemo(
    () =>
      players
        .filter((p) => p.semifinal === true && p.final !== true)
        .sort((a, b) => {
          const primaryA = a.score2 ?? -1;
          const primaryB = b.score2 ?? -1;
          if (primaryA !== primaryB) return primaryB - primaryA;

          // En caso de empate o sin score2, ordenar por score1
          const secondaryA = a.score1 ?? -1;
          const secondaryB = b.score1 ?? -1;
          return secondaryB - secondaryA;
        }),
    [players]
  );

  const initial = useMemo(
    () =>
      players
        .filter((p) => p.final !== true && p.semifinal !== true)
        .sort((a, b) => (b.score1 ?? 0) - (a.score1 ?? 0)),
    [players]
  );

  const renderRow = (player: ContestPlayer) => (
    <div key={player.id} className="player-row">
      <span className="player-name">{player.name}</span>
      <span className="player-score">{player.score1 ?? "-"}</span>
      <span className="player-score">{player.score2 ?? "-"}</span>
      <span className="player-score">{player.score3 ?? "-"}</span>
    </div>
  );

  if (loading) return <Loader />;

  return (
    <PageTemplate title="Concurso de triples">
      {players.length < 10 && (
        <div className="no-players">
          <div>Acércate a algún organizador para inscribirte.</div>
        </div>
      )}

      <div className="players-list">
        {final.length > 0 && (
          <>
            <div className="section-title">
              <Image
                src="/final-icon.png"
                alt="Final"
                width={24}
                height={24}
                className="icon"
              />
              Final
            </div>
            {final.map(renderRow)}
          </>
        )}
        {semifinal.length > 0 && (
          <>
            <div className="section-title">
              <Image
                src="/semifinals-icon.png"
                alt="Semifinal"
                width={24}
                height={24}
                className="icon"
              />
              Semifinal
            </div>
            {semifinal.map(renderRow)}
          </>
        )}
        {initial.length > 0 && (
          <>
            <div className="section-title">
              <Image
                src="/participant-icon.png"
                alt="Participantes"
                width={24}
                height={24}
                className="icon"
              />
              Participantes
            </div>
            {initial.map(renderRow)}
          </>
        )}
      </div>
    </PageTemplate>
  );
}
