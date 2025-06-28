import { Game } from "@/types";
import { ChevronDown, ChevronUp } from "lucide-react";
import "./styles.scss";

type Props = {
  game: Game;
  isOpen: boolean;
  onToggle: () => void;
};

const formatPhase = (phase: string, group: string, code: string) => {
  if (phase === "Grupos") {
    return `Grupo ${group}`;
  } else {
    switch (code.substring(0, 2)) {
      case "OF":
        return "Octavos";
      case "CF":
        return "Cuartos";
      case "SF":
        return "Semifinales";
      case "FN":
        return "Final";
      case "3/":
        return "3/4 Puesto";
      default:
        return "Eliminatorias";
    }
  }
};

export default function GameListItem({ game, isOpen, onToggle }: Props) {
  const isSpecialEvent = game.code === "special" && game.team2 === "";

  if (isSpecialEvent) {
    return (
      <div className="game-pill">
        <span className="pill-time">{game.time}</span>
        <span className="pill-label">{game.team1}</span>
      </div>
    );
  }

  const score1 = parseInt(game.score1);
  const score2 = parseInt(game.score2);

  const hasScore =
    game.score1 !== null &&
    game.score2 !== null &&
    game.score1 !== undefined &&
    game.score2 !== undefined &&
    (score1 > 0 || score2 > 0);

  const gameTime = game.time === "NaN:NaN" ? "TBD" : game.time;

  const isTeam1Winner = hasScore && score1 > score2;
  const isTeam2Winner = hasScore && score2 > score1;

  return (
    <div
      className={`game-card ${game.category} ${hasScore ? "finished" : ""}`}
      onClick={onToggle}
    >
      <div className="header-row">
        <div className="court">{game.court}</div>
        {!hasScore && <div className="time">{gameTime}</div>}
        <div className="expand-icon">
          {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </div>
      </div>

      <div className="content-row">
        <div className="teams-column">
          <span
            className={`team-name ${
              isTeam1Winner ? "winner" : hasScore ? "loser" : ""
            }`}
            title={game.team1}
          >
            {game.team1}
          </span>
          <span
            className={`team-name ${
              isTeam2Winner ? "winner" : hasScore ? "loser" : ""
            }`}
            title={game.team2}
          >
            {game.team2}
          </span>
        </div>

        <div className="score-or-time">
          {hasScore && (
            <>
              <span className={`score ${isTeam1Winner ? "winner" : ""}`}>
                {game.score1}
              </span>
              <span className={`score ${isTeam2Winner ? "winner" : ""}`}>
                {game.score2}
              </span>
            </>
          )}
        </div>
      </div>

      {isOpen && (
        <div className="extra-info">
          <span>{game.category}</span>
          {hasScore && <span>{gameTime}</span>}
          <span>{formatPhase(game.phase, game.group, game.code)}</span>
        </div>
      )}
    </div>
  );
}
