const ShipPlacementForm = ({
  handleChange,
  cells,
  title,
  description,
}: any) => {
  return (
    <>
      <h3 className="text-xl font-bold text-gray-800 mb-4">{title}</h3>
      <p className="text-gray-600 mb-6">{description}</p>

      {/* TODO: do basic required validation and display error */}
      {cells.map((cell: any, index: any) => (
        <div className="mb-6" key={index}>
          <h4 className="text-md font-semibold text-gray-700 mb-2">
            Cell {index + 1}
          </h4>
          <div className="flex gap-4">
            <div className="w-1/2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                X
              </label>
              <input
                type="number"
                min="0"
                max="9"
                value={cell.x}
                onChange={(e) => handleChange(index, "x", e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="w-1/2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Y
              </label>
              <input
                type="number"
                min="0"
                max="9"
                value={cell.y}
                onChange={(e) => handleChange(index, "y", e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>
      ))}

      
      </>
  );
};

export default ShipPlacementForm;
