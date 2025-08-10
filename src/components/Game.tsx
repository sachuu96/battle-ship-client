"use client";
import { useState } from "react";
import { Placement } from "./Placement";
import Shot from "./Shot";
import { startGame } from "../services/gameService";
import { IPlayer } from "../lib/interface";
import { SERVER_ERROR } from "../lib/const";

export const Game = ({
  initialPlayers = [],
}: {
  initialPlayers: IPlayer[];
}) => {
  const [players, setPlayers] = useState(initialPlayers);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onClick = async () => {
    try {
      setError(null);
      setIsLoading(true);
      const players = await startGame();
      setPlayers(players);
    } catch (error) {
      setError(SERVER_ERROR);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {error ? (
        <p>{SERVER_ERROR}</p>
      ) : (
        <div className="min-h-screen bg-gray-100 px-4 py-8">
          <h1 className="text-4xl font-extrabold mb-8 text-center text-gray-800">
            Battle Ship Game
          </h1>
          {players.length === 0 && (
            <div className="flex justify-center mb-10">
              <button
                className="px-6 py-3 rounded-xl bg-blue-600 text-white font-semibold shadow-md hover:bg-blue-700 transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                onClick={onClick}
                disabled={isLoading}
              >
                {isLoading ? "Setting up game..." : "Start Game"}
              </button>
            </div>
          )}
          <br />
          {players && players.length > 0 && (
            <div className="w-full flex flex-wrap justify-center gap-12">
              {players.map(({ id, shipPlacement, shotsTaken },index) => (
                <div key={id} className="flex flex-col items-center gap-6">
                  <Shot playerId={id} />
                  <h4 className="text-2xl font-bold mb-4 text-center">
                    Player ID: {id}
                  </h4>
                  <Placement
                    key={id}
                    playerId={id}
                    //TODO: This is not scalable - for more than 2 players per game
                    opponentId={players[index === 0 ? 1 : index].id}
                    initialShipPlacement={shipPlacement}
                    initialShotsTaken={shotsTaken}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </>
  );
};
