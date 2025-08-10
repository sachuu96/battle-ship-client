"use client";

import { useState, useEffect } from "react";
import { Grid } from "./Grid";
import { generateInitialBoard, markShipCells, updateCellStatus } from "../lib/util";
import cloneDeep from "lodash.clonedeep";
import { IShipBoardProps } from "../lib/interface";
import { fetchAllShots } from "../services/shotService";
import { CELL_STATUS, SERVER_ERROR } from "../lib/const";

export function ShipBoard({ shipPlacement, opponentId }: IShipBoardProps) {
  // used lazy initialization to improve performance
  const [coordinates, setcoordinates] = useState(generateInitialBoard);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (shipPlacement && shipPlacement.length > 0) {
      // Deep clone the board before mutating to avoid state mutation issues
      const clonedCoordinates = cloneDeep(coordinates);

      const updatedCoordinates = markShipCells(
        clonedCoordinates,
        shipPlacement
      );
      setcoordinates(updatedCoordinates);
    }
  }, [shipPlacement]);

  const onClickUpdateShipBoard = async () => {
    try{
      setIsLoading(true)
      const opponetShots = await fetchAllShots(opponentId, { status: CELL_STATUS.HIT });
      // Deep clone the board before mutating to avoid state mutation issues
      const clonedCoordinates = cloneDeep(coordinates);
  
      const updatedCoordinates = updateCellStatus(
        clonedCoordinates,
        opponetShots
      );
      setcoordinates(updatedCoordinates);
    }catch(error){
      setError(SERVER_ERROR)
      throw error;
    }finally{
      setIsLoading(false)
      setError(null)
    }
  };

  if(error) return <p>{SERVER_ERROR}</p>
  return (
    <>
      <button
        onClick={onClickUpdateShipBoard}
        className="w-full px-4 py-2 rounded-md bg-blue-600 text-white font-semibold shadow-md hover:bg-blue-700 transition"
      >
        {isLoading ? "Loading..." : "Update ship board with opponent's hits"}
      </button>
      <div className="flex flex-col items-center">
        <Grid coordinates={coordinates} />
      </div>
    </>
  );
}
