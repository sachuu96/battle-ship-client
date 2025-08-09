"use client";

import { useState, useEffect } from "react";
import { Grid } from "./Grid";
import { attackCell } from "../services/shotService";
import { generateInitialBoard } from "../lib/shared";
import cloneDeep from "lodash.clonedeep";


function updateCellStatus(
  cells: Cell[][],
  attackedCells: { x: number; y: number; status: string }[]
) {
  // Create a Set of keys for fast lookup
  const attackedCellKeys = new Set(
    attackedCells.map(({ x, y }) => `${x},${y}`)
  );

  for (const row of cells) {
    for (const cell of row) {
      const key = `${cell.x},${cell.y}`;
      if (attackedCellKeys.has(key)) {
        const filteredCell = attackedCells.find(
          (attackedCell) =>
            attackedCell.x === cell.x && attackedCell.y === cell.y
        );
        cell.status = filteredCell?.status || "intact";
      }
    }
  }
  return cells;
}

interface IShot {
  x: number;
  y: number;
  status: string;
}

interface IAttackBoardProps {
  playerId: number;
  initialShotsTaken: IShot[];
}

interface Cell {
  x: number;
  y: number;
  status: string;
  isShipAvailable: boolean;
}

export function AttackBoard({
  playerId,
  initialShotsTaken,
}: IAttackBoardProps) {
  const [coordinates, setCoordinates] = useState(() => {
    const initialBoard = generateInitialBoard();
    // Deep clone the board before mutating to avoid state mutation issues
    return !initialShotsTaken ? initialBoard : updateCellStatus(cloneDeep(initialBoard), initialShotsTaken);
  });

  const [loading, setLoading] = useState(false);

  // useEffect(() => {
  //   // Deep clone the board before mutating to avoid state mutation issues
  //   const clonedCoordinates = cloneDeep(coordinates);

  //   const updatedCoordinates = updateCellStatus(
  //     clonedCoordinates,
  //     initialShotsTaken
  //   );
  //   setCoordinates(updatedCoordinates);
  // }, []);

  const onClickCell = async ({ x, y }: Record<string, number>) => {
    if (loading) return;
    setLoading(true);
    try {
      const response = await attackCell(playerId, { x, y });
      // Deep clone the board before mutating to avoid state mutation issues
      const clonedCoordinates = cloneDeep(coordinates);

      const updatedCoordinates = updateCellStatus(clonedCoordinates, [
        response,
      ]);
      setCoordinates(updatedCoordinates);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="flex flex-col items-center">
        <Grid coordinates={coordinates} onClickCell={onClickCell} loading={loading}/>
      </div>
    </>
  );
}
