"use client";

import { useState, useEffect } from "react";
import { Grid } from "./Grid";
import { generateInitialBoard, markShipCells } from "../lib/util";
import cloneDeep from "lodash.clonedeep";
import { IShipPlacement } from "../lib/interface";

export function ShipBoard({ shipPlacement }: IShipPlacement) {
  // used lazy initialization to improve performance
  const [coordinates, setcoordinates] = useState(generateInitialBoard);

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

  return (
    <>
      <div className="flex flex-col items-center">
        <Grid coordinates={coordinates} />
      </div>
    </>
  );
}
