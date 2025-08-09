import { Loader } from "./Loader";
import { IGridProps } from "../lib/interface";

export const Grid = ({
  coordinates,
  onClickCell,
  loading = false,
}: IGridProps) => {

  const getCellBgColor = (status: string, isShipAvailable: boolean) => {
    if (status === "hit") return "bg-green-400";
    if (status === "missed") return "bg-yellow-300";
    if (isShipAvailable) return "bg-gray-400";
    return "hover:bg-gray-200";
  };

  const generateCellContent = ({ isShipAvailable, status, x, y }: any) => {
    if (isShipAvailable) return "Ship";
    if (status === "missed") return "Missed";
    if (status === "hit") return "Hit";
    if (status === "intact") return `[${x},${y}]`;
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
                    const isDisabled = isShipAvailable === true;
                    return (
                      <td
                        key={`cell-${x}-${y}`}
                        className={`border border-gray-300 px-4 py-2 text-center align-middle cursor-pointer ${getCellBgColor(
                          status,
                          isShipAvailable
                        )} ${isDisabled ? "cursor-not-allowed" : ""}`}
                        onClick={() => {
                          if (!isDisabled) {
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
