import { Game } from "../components/Game";
import { fetchPlayers } from "../services/playerService";
import { fetchShipPlacement } from "../services/shipService";

interface IPlayer {
  id: number;
  gameId: number;
}

export default async function GamePage() {
  const players = await fetchPlayers();

  const playersWithPlacement = await Promise.all(
    players.map(async (player: IPlayer) => ({
      ...player,
      shipPlacement: await fetchShipPlacement(player.id),
    }))
  );

  return <Game initialPlayers={playersWithPlacement} />;
}
