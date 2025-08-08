"use client";

import { useState, useEffect } from "react";
import Shot from "./Shot";

interface BoardProps {
  playerId: number;
}

export function Board({ playerId }: BoardProps) {
  const [cordinates, setCordinates] = useState<[number, number] | null>(null);

  useEffect(()=>{
    // get ship placement cordinates for given player
  },[])
  const generateBoard = () => {
    const board = [];

    for (let y = 9; y >= 0; y--) {
      const row = [];

      for (let x = 0; x < 10; x++) {
        row.push(
          <td
            key={`cell-${y}-${x}`}
            className="border border-gray-300 px-4 py-2 text-center align-middle cursor-pointer"
            onClick={() => setCordinates([x, y])}
          >
            <h3 className="flex justify-center items-center h-full">
              [{x},{y}]
            </h3>
          </td>
        );
      }

      board.push(
        <tr key={`row-${y}`} className="bg-gray-100">
          {row}
        </tr>
      );
    }

    return board;
  };

  return (
    <>
      <div className="flex flex-col items-center">
        <table className="table-auto border border-gray-300">
          <tbody>{generateBoard()}</tbody>
        </table>
        <Shot />
      </div>
    </>
  );
}
