"use client";

import { useState } from "react";
import { getShotsCount } from "../services/shotService";

export default function Shot({ playerId }: {playerId: number}) {
  const [shotDetails, setShotDetails] = useState<Record<string, any> | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(false);


  const onCheckStatus = async () => {
    try {
      setIsLoading(true);
      const shots = await getShotsCount(playerId);
      setShotDetails(shots);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-sm mx-auto bg-white rounded-lg shadow-lg p-6 h-80 flex flex-col">
      <h2 className="text-lg font-bold text-gray-800 mb-4">
      Game Status
      </h2>

      <button
        onClick={onCheckStatus}
        className="w-full px-4 py-2 rounded-md bg-blue-600 text-white font-semibold shadow-md hover:bg-blue-700 transition"
      >
        {isLoading ? 'Loading...' : 'Check Game Status'}
      </button>

      {shotDetails && (
        <div className="mt-4 text-center flex-1 overflow-y-auto">
          <h3 className="text-xl font-semibold text-gray-700">
            Total Shots: {shotDetails.count}
          </h3>
          <pre className="bg-gray-100 p-3 rounded-md text-sm mt-3 text-left">
            {JSON.stringify(shotDetails, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}
