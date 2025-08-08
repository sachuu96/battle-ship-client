"use client";
import { useEffect, useState } from "react";
import { ShipBoard } from "./ShipBoard";
import { Placement } from "./Placement";
import { startGame, getGame } from "../services/gameService";
import { fetchPlayers } from "../services/playerService";

export function Welcome() {
  const [players, setPlayers] = useState([]);
  const [gameStatus, setGameStatus] = useState(null);

  useEffect(() => {
    // chain since response of first api call is dependent to the next one.
    getGame()
      .then((data) => {
        if (data) {
          fetchPlayers()
            .then((players) => {
              setPlayers(players);
            })
            .catch((error) => {
              // TODO: proper error display for UI
              console.log("error while fetching players: ", error);
            });
        }
      })
      .catch((error) => {
        console.log("error while fetching game: ", error);
      });
  }, []);

  const onClick = async () => {
    const players = await startGame();
    setPlayers(players);
  };

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-8">
      <h1 className="text-4xl font-extrabold mb-8 text-center text-gray-800">
        Battle Ship Game
      </h1>

      {players.length === 0 && (
        <div className="flex justify-center mb-10">
          <button
            className="px-6 py-3 rounded-xl bg-blue-600 text-white font-semibold shadow-md hover:bg-blue-700 transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            onClick={onClick}
          >
            Start Game
          </button>
        </div>
      )}

      {players.length > 0 && (
        <div className="w-full flex flex-wrap justify-center gap-12">
          {players.map(({ id }) => (
            <div key={id} className="flex flex-col items-center gap-6">
              <h4 className="text-2xl font-bold mb-4 text-center">
                Player ID: {id}
              </h4>
              <Placement playerId={id} />
              {/* Show the board only once the ship placement is successfully completed*/}
              {/* <Board playerId={id} /> */}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
