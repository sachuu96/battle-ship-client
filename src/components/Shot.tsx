"use client";

import { useEffect, useState } from "react";
import { getShotsCount } from "../services/shotService";

export default function Shot({ playerId = 2 }) {
  const [shotDetails, setShotDetails] = useState<Record<string,any> | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await getShotsCount(playerId, { status: 'missed' });
        setShotDetails(data);
      } catch (err) {
        console.error("Failed to fetch user:", err);
      }
    };

    fetchUser();
  }, []);

  if (!shotDetails) return <p>Loading...</p>;

  return (
    <div>
      <h1>{shotDetails.count}</h1>
      <pre>{JSON.stringify(shotDetails)}</pre>
    </div>
  );
}
