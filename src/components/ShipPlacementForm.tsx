"use client";

import { useState , useEffect} from "react";
import { IShipPlacementFormProps } from "../lib/interface";

const ShipPlacementForm = ({
  handleChange,
  cells,
  title,
  description,
}: IShipPlacementFormProps) => {
  const [errors, setErrors] = useState<{ x?: string; y?: string }[]>(
    cells.map(() => ({}))
  );

  const validateValue = (value: string) => {
    // coordinates are required
    if (value === "") return "Required";
    const num = Number(value);
    return "";
  };

  // Validation function should be triggered when ever cell is changed
  useEffect(() => {
    const newErrors = cells.map((cell) => {
      return {
        x: validateValue((cell.x).toString()),
        y: validateValue((cell.y).toString()),
      };
    });
    setErrors(newErrors);
  }, [cells]);

  return (
    <>
      <h3 className="text-xl font-bold text-gray-800 mb-4">{title}</h3>
      <p className="text-gray-600 mb-6">{description}</p>

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
                onChange={(e) =>
                  handleChange(index, "x", e.target.value)
                }
                className={`w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 ${
                  errors[index]?.x
                    ? "border-red-500 focus:ring-red-500"
                    : "border-gray-300 focus:ring-blue-500"
                }`}
              />
              {errors[index]?.x && (
                <p className="mt-1 text-xs text-red-600">
                  {errors[index].x}
                </p>
              )}
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
                onChange={(e) =>
                  handleChange(index, "y", e.target.value)
                }
                className={`w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 ${
                  errors[index]?.y
                    ? "border-red-500 focus:ring-red-500"
                    : "border-gray-300 focus:ring-blue-500"
                }`}
              />
              {errors[index]?.y && (
                <p className="mt-1 text-xs text-red-600">
                  {errors[index].y}
                </p>
              )}
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default ShipPlacementForm;
