"use client";

export default function GameStatusCard({
  onClickCheckStatus,
  gameDetails,
}: any) {

  const onCheckStatus = async () => {
    await onClickCheckStatus();
  };

  return (
    <div className="max-w-sm mx-auto bg-white rounded-lg shadow-lg p-6 h-80 flex flex-col">
      <button
        onClick={onCheckStatus}
        className="w-full px-4 py-2 rounded-md bg-blue-600 text-white font-semibold shadow-md hover:bg-blue-700 transition"
      >
        Check Game Status
      </button>

      {gameDetails && (
        <div className="mt-4 text-center flex-1 overflow-y-auto">
          <h3 className="text-xl font-semibold text-gray-700">Game Status:</h3>
          <pre className="bg-gray-100 p-3 rounded-md text-sm mt-3 text-left">
            {JSON.stringify(gameDetails)}
          </pre>
        </div>
      )}
    </div>
  );
}
