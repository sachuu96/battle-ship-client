import { Loader } from "./Loader";
import { IGridProps } from "../lib/interface";
import { CELL_STATUS } from "@/lib/const";

export const Grid = ({
  coordinates,
  onClickCell,
  loading = false,
}: IGridProps) => {

  const getCellBgColor = (status: string, isShipAvailable: boolean) => {
    if (isShipAvailable) {
      if(status === CELL_STATUS.HIT) return 'bg-red-300'
      return "bg-gray-400";
    }
    if (status === CELL_STATUS.HIT) return "bg-green-400";
    if (status === CELL_STATUS.MISSED) return "bg-yellow-300";
    return "hover:bg-gray-200";
  };

  const generateCellContent = ({ isShipAvailable, status, x, y }: any) => {
    if (isShipAvailable) {
      if(status === CELL_STATUS.HIT) return "Ship hit"
      return "Ship";
    }
    if (status === CELL_STATUS.MISSED) return "Missed";
    if (status === CELL_STATUS.HIT) return "Hit";
    return `[${x},${y}]`;
  };
  
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <table className="table-auto border border-gray-300">
          <tbody>
            {coordinates.map((rows: any, index: any) => {
              return (
                <tr key={`row-${rows}-${index}`} className="bg-gray-100">
                  {rows.map(({ x, y, isShipAvailable, status }: any) => {
                    // const isDisabled = isShipAvailable === true;
                    return (
                      <td
                        key={`cell-${x}-${y}`}
                        className={`border border-gray-300 px-4 py-2 text-center align-middle cursor-pointer ${getCellBgColor(
                          status,
                          isShipAvailable
                        )} ${isShipAvailable ? "cursor-not-allowed" : ""}`}
                        onClick={() => {
                          if (!isShipAvailable) {
                            onClickCell?.({ x, y });
                          }
                        }}
                      >
                        <h3 className="flex justify-center items-center h-full">
                          {generateCellContent({
                            x,
                            y,
                            isShipAvailable,
                            status,
                          })}
                        </h3>
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </>
  );
};
