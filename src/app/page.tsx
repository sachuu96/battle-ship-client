import { Game } from "../components/Game";
import { fetchPlayers } from "../services/playerService";
import { fetchShipPlacement } from "../services/shipService";
import { fetchAllShots } from "../services/shotService";
import { IPlayer } from "../lib/interface";

export default async function GamePage() {
  const players = await fetchPlayers();

  const playersWithPlacement = await Promise.all(
    players.map(async (player: IPlayer) => ({
      ...player,
      shipPlacement: await fetchShipPlacement(player.id),
      shotsTaken: await fetchAllShots(player.id)
    }))
  );

  return <Game initialPlayers={playersWithPlacement} />;
}
