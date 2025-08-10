export interface IShipPlacement {
  shipPlacement: Array<{
    shipId: number;
    x: number;
    y: number;
  }>;
}

export interface IShipBoardProps extends IShipPlacement{
  opponentId: number;
}

export interface IShot {
  x: number;
  y: number;
  status: string;
}

export interface IPlayer extends IShipBoardProps {
  id: number;
  gameId: number;
  shotsTaken: IShot[];
}

export interface IAttackBoardProps {
  playerId: number;
  initialShotsTaken: IShot[];
}

export interface ICell extends IShot {
  isShipAvailable: boolean;
}

export interface IGridProps {
  coordinates: ICell[][];
  onClickCell?: ({ x, y }: Record<string, number>)=>Promise<void>;
  loading?: boolean;
}

export interface IPlacementProps {
  playerId: number;
  initialShipPlacement: Array<{
    shipId: number;
    x: number;
    y: number;
  }>;
  initialShotsTaken: IShot[];
  opponentId: number;
}

interface Cell {
  x: number;
  y: number;
}

export interface IShipPlacementFormProps {
  handleChange: (index: number, axis: "x" | "y", value: string) => void;
  cells: Cell[];
  title: string;
  description: string;
}
