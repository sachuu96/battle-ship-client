import { ICell } from "../lib/interface";

export const generateInitialBoard = () => {
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

export function updateCellStatus(
  cells: ICell[][],
  attackedCells: { x: number; y: number; status: string }[]
) {
  // Create a Set of keys for fast lookup
  const attackedCellKeys = new Set(
    attackedCells?.map(({ x, y }) => `${x},${y}`)
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

export function markShipCells(
  cells: ICell[][],
  shipCells: { x: number; y: number }[]
) {
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
