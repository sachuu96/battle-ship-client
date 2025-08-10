import { Game } from "../components/game/Game";
import { filterGames } from "../services/gameService";
import { fetchPlayers } from "../services/playerService";
import { fetchShipPlacement } from "../services/shipService";
import { fetchAllShots } from "../services/shotService";
import { IPlayer } from "../lib/interface";
import { GAME_STATUS } from "../lib/const";

export default async function GamePage() {
  try {
    const currentGame = await filterGames({ status: GAME_STATUS.IN_PROGRESS });
    
    if (!currentGame) return <Game initialPlayers={[]} />;

    const players = await fetchPlayers();

    const playersWithPlacement = await Promise.all(
      players.map(async (player: IPlayer) => ({
        ...player,
        shipPlacement: await fetchShipPlacement(player.id),
        shotsTaken: await fetchAllShots(player.id),
        opponentId:player.opponentId
      }))
    );

    return <Game initialPlayers={playersWithPlacement}/>;
  } catch (error) {
    console.error("Failed to load game data:", error);
    return <div>Failed to load game. Please try again later.</div>;
  }
}
