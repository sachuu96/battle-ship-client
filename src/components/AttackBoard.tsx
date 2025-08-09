"use client";

import { useState } from "react";
import { Grid } from "./Grid";
import { attackCell } from "../services/shotService";
import { generateInitialBoard, updateCellStatus } from "../lib/util";
import cloneDeep from "lodash.clonedeep";
import { IAttackBoardProps} from "../lib/interface";

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

  const onClickCell = async ({ x, y }: Record<string, number>) => {
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
