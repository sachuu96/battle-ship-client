"use client";

import { useState, useEffect } from "react";
import { Grid } from './Grid'
import { fetchShipPlacement } from "../services/shipService";
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
  playerId: number;
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

export function ShipBoard({ playerId, shipPlacement }: IShipBoardProps) {
  // used lazy initialization to improve performance
  const [coordinates, setcoordinates] = useState(generateInitalBoard);
  const [shipCoordinates, setShipCoordinates] = useState(shipPlacement);

  useEffect(() => {
    // get ship placement coordinates for given player
    const fetchShipcoordinates = async () => {
      const response = await fetchShipPlacement(playerId);
      setShipCoordinates(response);
    };
    fetchShipcoordinates();
  }, []);

  useEffect(() => {
    if (shipCoordinates && shipCoordinates.length > 0) {
      // Deep clone the board before mutating to avoid state mutation issues
      const clonedCoordinates = cloneDeep(coordinates)

      const updatedCoordinates = markShipCells(clonedCoordinates, shipCoordinates);
      setcoordinates(updatedCoordinates);
    }
  }, [shipCoordinates]);

  return (
    <>
      <div className="flex flex-col items-center">
        <Grid coordinates={coordinates}/>
      </div>
    </>
  );
}
