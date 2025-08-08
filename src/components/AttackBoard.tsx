"use client";

import { useState, useEffect } from "react";
import { Grid } from "./Grid";
import { attackCell, fetchAllShots } from "../services/shotService";
import cloneDeep from "lodash.clonedeep";

const generateInitalBoard = () => {
  const board = [];

  for (let y = 9; y >= 0; y--) {
    const row = [];

    for (let x = 0; x < 10; x++) {
      row.push({ x, y, status: "intact", isShipAvailable: false });
    }

    board.push(row);
  }

  return board;
};

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

interface IAttackBoardProps {
  playerId: number;
}

interface Cell {
  x: number;
  y: number;
  status: string;
  isShipAvailable: boolean;
}

export function AttackBoard({ playerId }: IAttackBoardProps) {
  // used lazy initialization to improve performance
  const [coordinates, setcoordinates] = useState(generateInitalBoard);

  useEffect(() => {
    const getShots = async () => {
      const response = await fetchAllShots(playerId);
      // Deep clone the board before mutating to avoid state mutation issues
      const clonedCoordinates = cloneDeep(coordinates);

      const updatedCoordinates = updateCellStatus(clonedCoordinates, response);
      setcoordinates(updatedCoordinates);
    };
    getShots();
  }, []);

  const onClickCell = async ({ x, y }: Record<string, number>) => {
    const response = await attackCell(playerId, { x, y });

    // Deep clone the board before mutating to avoid state mutation issues
    const clonedCoordinates = cloneDeep(coordinates);

    const updatedCoordinates = updateCellStatus(clonedCoordinates, [response]);
    setcoordinates(updatedCoordinates);
  };

  return (
    <>
      <div className="flex flex-col items-center">
        <Grid coordinates={coordinates} onClickCell={onClickCell} />
      </div>
    </>
  );
}
