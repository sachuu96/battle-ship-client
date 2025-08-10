"use client";

import { useState } from "react";
import { createShips } from "../services/shipService";
import ShipPlacementForm from "./ShipPlacementForm";
import { ShipBoard } from "./ShipBoard";
import { AttackBoard } from "./AttackBoard";
import { IPlacementProps } from "../lib/interface";
import { SERVER_ERROR, SHIP_TYPES } from "../lib/const";

export const Placement = ({
  playerId,
  initialShipPlacement,
  initialShotsTaken,
  opponentId
}: IPlacementProps) => {
  // length of battleship is 4
  const [battleShipCells, setBattleShipCells] = useState(
    Array(4).fill({ x: "", y: "" })
  );
  // length of a destroyer ship is 5
  const [destroyerShip1, setDestroyerShip1] = useState(
    Array(3).fill({ x: "", y: "" })
  );
  const [destroyerShip2, setDestroyerShip2] = useState(
    Array(3).fill({ x: "", y: "" })
  );
  const [createdShipCoordinates, setCreatedShipCoordinates] =
    useState(initialShipPlacement);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleCellChange = (
    setter: any,
    index: number,
    axis: "x" | "y",
    value: string
  ) => {
    setter((prev: any) => {
      const newCells = [...prev];
      newCells[index] = { ...newCells[index], [axis]: value };
      return newCells;
    });
  };

  const createShipPlacement = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload = {
      ships: [
        { type: SHIP_TYPES.DESTROYER, coordinates: destroyerShip1 },
        { type: SHIP_TYPES.DESTROYER, coordinates: destroyerShip2 },
        { type: SHIP_TYPES.BATTLE, coordinates: battleShipCells },
      ],
    };
    try {
      setError(null);
      setIsLoading(true);
      const createdShips = await createShips(playerId, payload);
      setCreatedShipCoordinates(createdShips);
    } catch (error) {
      setError(SERVER_ERROR);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  if (error) return <p>{SERVER_ERROR}</p>;
  return (
    <>
      {!createdShipCoordinates || createdShipCoordinates.length === 0 ? (
        <div className="p-6 bg-white rounded-xl shadow-md max-w-md mx-auto mt-8">
          <form
            onSubmit={createShipPlacement}
            className="p-6 bg-white rounded-xl shadow-md max-w-md mx-auto mt-8"
          >
            <ShipPlacementForm
              title="Create Battleship"
              description="Enter the X and Y coordinates for each of the 4 cells (values 0–9)."
              handleChange={(index: number, axis: "x" | "y", value: string) =>
                handleCellChange(setBattleShipCells, index, axis, value)
              }
              cells={battleShipCells}
            />
            <ShipPlacementForm
              title="Create destroyer ship - 1"
              description="Enter the X and Y coordinates for each of the 3 cells (values 0–9)."
              handleChange={(index: number, axis: "x" | "y", value: string) =>
                handleCellChange(setDestroyerShip1, index, axis, value)
              }
              cells={destroyerShip1}
            />
            <ShipPlacementForm
              title="Create destroyer ship - 2"
              description="Enter the X and Y coordinates for each of the 3 cells (values 0–9)."
              handleChange={(index: number, axis: "x" | "y", value: string) =>
                handleCellChange(setDestroyerShip2, index, axis, value)
              }
              cells={destroyerShip2}
            />
            {/* TODO: button should be disabled until all the validation errors are fixed */}
            <button
              type="submit"
              className="w-full px-4 py-2 rounded-md bg-blue-600 text-white font-semibold shadow-md hover:bg-blue-700 transition"
            >
              {isLoading ? "Creating ships..." : "Submit"}
            </button>
          </form>
        </div>
      ) : (
        <>
          <p>Your ship placement</p>
          <ShipBoard shipPlacement={createdShipCoordinates} opponentId={opponentId}/>
          <p>Attack Board</p>
          <AttackBoard
            playerId={playerId}
            initialShotsTaken={initialShotsTaken}
          />
        </>
      )}
    </>
  );
};
