interface IGridProps {
  coordinates: {
    x: number;
    y: number;
    status: string;
    isShipAvailable: boolean;
  }[][];
  onClickCell?: any;
}

export const Grid = ({ coordinates, onClickCell }: any) => {
  const generateCellContent = ({ isShipAvailable, status, x, y }: any) => {
    if (isShipAvailable) return "Ship";
    if (status === "missed") return "Missed";
    if (status === "hit") return "Hit";
    if (status === "intact") return `[${x},${y}]`;
  };
  return (
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
                    className={`border border-gray-300 px-4 py-2 text-center align-middle cursor-pointer 
                ${
                  isDisabled
                    ? "bg-gray-400 cursor-not-allowed"
                    : "hover:bg-gray-200"
                }`}
                    onClick={() => {
                      if (!isDisabled) {
                        onClickCell?.({ x, y });
                      }
                    }}
                  >
                    <h3 className="flex justify-center items-center h-full">
                        {generateCellContent({x, y, isShipAvailable, status})}
                    </h3>
                  </td>
                );
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
