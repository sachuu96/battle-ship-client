import { Game } from "../components/Game";
import { fetchPlayers } from "../services/playerService";
import { fetchShipPlacement } from "../services/shipService";

export default async function GamePage() {
  const players = await fetchPlayers();

  const playerShipPlacements = await Promise.all(
    // TODO: set proper types
    players.map(async (player:any) => ({
      playerId: player.id,
      placement: await fetchShipPlacement(player.id),
    }))
  );

  return <Game initialPlayers={players} initialShipPlacements={playerShipPlacements}/>;
}
