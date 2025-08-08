"use client";

import { useState, useEffect } from "react";
import Shot from "./Shot";
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

interface BoardProps {
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

export function Board({ playerId, shipPlacement }: BoardProps) {
  // used lazy initialization to improve performance
  const [cordinates, setCordinates] = useState(generateInitalBoard);
  const [shipCoordinates, setShipCoordinates] = useState(shipPlacement);

  useEffect(() => {
    // get ship placement cordinates for given player
    const fetchShipCordinates = async () => {
      const response = await fetchShipPlacement(playerId);
      setShipCoordinates(response);
    };
    fetchShipCordinates();
  }, []);

  useEffect(() => {
    if (shipCoordinates && shipCoordinates.length > 0) {
      // Deep clone the board before mutating to avoid state mutation issues
      const updatedBoard = cloneDeep(cordinates)
      cloneDeep
      const updatedCoordinates = markShipCells(updatedBoard, shipCoordinates);
      setCordinates(updatedCoordinates);
    }
  }, [shipCoordinates]);

  const onClickCell = (value: any) => {
    console.log("value", value);
  };
  return (
    <>
      <div className="flex flex-col items-center">
        <table className="table-auto border border-gray-300">
          <tbody>
            {cordinates.map((rows, index) => {
              return (
                <tr key={`row-${rows}-${index}`} className="bg-gray-100">
                  {rows.map(({ x, y, isShipAvailable, status }: any) => {
                    const isDisabled = isShipAvailable === true;
                    return (
                      <td
                        key={`cell-${x}-${y}`}
                        className={`border border-gray-300 px-4 py-2 text-center align-middle cursor-pointer 
                ${
                  isDisabled
                    ? "bg-gray-400 cursor-not-allowed"
                    : "hover:bg-gray-200"
                }`}
                        onClick={() => {
                          if (!isDisabled) {
                            onClickCell([x, y]);
                          }
                        }}
                      >
                        <h3 className="flex justify-center items-center h-full">
                          {isShipAvailable ? "Ship" : `[${x}, ${y}]`}
                        </h3>
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
        <Shot />
      </div>
    </>
  );
}
