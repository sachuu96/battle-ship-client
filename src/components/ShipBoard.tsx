"use client";

import { useState, useEffect } from "react";
import { Grid } from './Grid'
import { generateInitialBoard } from "../lib/shared";
import cloneDeep from "lodash.clonedeep";


function markShipCells(cells: Cell[][], shipCells: { x: number; y: number }[]) {
  // Create a Set of keys for fast lookup
  const shipKeys = new Set(shipCells.map(({ x, y }) => `${x},${y}`));

  for (const row of cells) {
    for (const cell of row) {
      const key = `${cell.x},${cell.y}`;
      if (shipKeys.has(key)) {
        cell.isShipAvailable = true;
      }
    }
  }
  return cells;
}

interface IShipBoardProps {
  shipPlacement: Array<{
    shipId: number;
    x: number;
    y: number;
  }>;
}

interface Cell {
  x: number;
  y: number;
  status: string;
  isShipAvailable: boolean;
}

export function ShipBoard({ shipPlacement }: IShipBoardProps) {
  // used lazy initialization to improve performance
  const [coordinates, setcoordinates] = useState(generateInitialBoard);

  useEffect(() => {
    if (shipPlacement && shipPlacement.length > 0) {
      // Deep clone the board before mutating to avoid state mutation issues
      const clonedCoordinates = cloneDeep(coordinates)

      const updatedCoordinates = markShipCells(clonedCoordinates, shipPlacement);
      setcoordinates(updatedCoordinates);
    }
  }, [shipPlacement]);

  return (
    <>
      <div className="flex flex-col items-center">
        <Grid coordinates={coordinates}/>
      </div>
    </>
  );
}
