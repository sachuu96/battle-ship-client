"use client";

import { useState } from "react";
import { createShips } from "../services/shipService";
import ShipPlacementForm from "./ShipPlacementForm";
import { Board } from "./Board";

interface PlacementProps {
  playerId: number;
}
// interface Coordinates {
//   X: number;
//   Y: number;
// }
// interface ShipPlacement extends Coordinates {
//   shipId: number;
// }

export const Placement = ({ playerId }: PlacementProps) => {
  const [battleShipCells, setBattleShipCells] = useState([
    { x: "", y: "" },
    { x: "", y: "" },
    { x: "", y: "" },
    { x: "", y: "" },
  ]);

  const [destroyerShip1, setDestroyerShip1] = useState([
    { x: "", y: "" },
    { x: "", y: "" },
    { x: "", y: "" },
  ]);

  const [destroyerShip2, setDestroyerShip2] = useState([
    { x: "", y: "" },
    { x: "", y: "" },
    { x: "", y: "" },
  ]);

  const [createdShips, setCreatedShips] =
    useState(null);

  const handleBattleShipCellChange = (
    index: number,
    axis: "x" | "y",
    value: string
  ) => {
    const newCells = [...battleShipCells];
    newCells[index][axis] = value;
    setBattleShipCells(newCells);
  };

  const handleFirstDestroyerShipCellChange = (
    index: number,
    axis: "x" | "y",
    value: string
  ) => {
    const newCells = [...destroyerShip1];
    newCells[index][axis] = value;
    setDestroyerShip1(newCells);
  };

  const handleSecondDestroyerShipCellChange = (
    index: number,
    axis: "x" | "y",
    value: string
  ) => {
    const newCells = [...destroyerShip2];
    newCells[index][axis] = value;
    setDestroyerShip2(newCells);
  };

  // TODO: set proper types
  // const extractCoordinates = (ships: Array<any>) => {
  //   const cellCoordinates: any = [];
  //   ships.map(({ cells, shipId }) => {
  //     cells.map(({ X, Y }: Coordinates) => {
  //       cellCoordinates.push({ x: X, y: Y, shipId });
  //     });
  //   });
  //   setShipPlacementCoordinates(cellCoordinates);
  // };

  const createShipPlacement = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submitted battleShipCells:", battleShipCells);
    console.log("Submitted destroyerShip1:", destroyerShip1);
    console.log("Submitted destroyerShip2:", destroyerShip2);

    const payload = {
      ships: [
        { type: "destroyer", coordinates: destroyerShip1 },
        { type: "destroyer", coordinates: destroyerShip2 },
        { type: "battle", coordinates: battleShipCells },
      ],
    };
    const createdShips = await createShips(playerId, payload);
    console.log('createdShips',createdShips);
    // extractCoordinates(createdShips);
    setCreatedShips(createdShips);
  };

  return (
    <div className="p-6 bg-white rounded-xl shadow-md max-w-md mx-auto mt-8">
      {!createdShips && (
        <form
          onSubmit={createShipPlacement}
          className="p-6 bg-white rounded-xl shadow-md max-w-md mx-auto mt-8"
        >
          <ShipPlacementForm
            title="Create Battleship"
            description="Enter the X and Y coordinates for each of the 4 cells (values 0–9)."
            handleChange={handleBattleShipCellChange}
            cells={battleShipCells}
          />
          <ShipPlacementForm
            title="Create destroyer ship - 1"
            description="Enter the X and Y coordinates for each of the 3 cells (values 0–9)."
            handleChange={handleFirstDestroyerShipCellChange}
            cells={destroyerShip1}
          />
          <ShipPlacementForm
            title="Create destroyer ship - 2"
            description="Enter the X and Y coordinates for each of the 3 cells (values 0–9)."
            handleChange={handleSecondDestroyerShipCellChange}
            cells={destroyerShip2}
          />
          <button
            type="submit"
            className="w-full px-4 py-2 rounded-md bg-blue-600 text-white font-semibold shadow-md hover:bg-blue-700 transition"
          >
            Submit
          </button>
        </form>
      )}
      {/* <Board /> */}
    </div>
  );
};
