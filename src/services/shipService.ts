import HttpClient from "@/lib/HttpClient";

export async function createShips(playerId: number,data: Record<string,any>) {
  const axios = HttpClient.getInstance();

  try {
    const response = await axios.post(`/ships/${playerId}`,data);
    return response.data.createdShips;
  } catch (error) {
    console.error("Error while creating ship placement:", error);
    throw error;
  }
}

export async function fetchShipPlacement(playerId: number) {
  const axios = HttpClient.getInstance();

  try {
    const response = await axios.get(`/ships/${playerId}`);
    return response.data.shipPlacementCoordinates;
  } catch (error) {
    console.error("Error while fetching ship placement:", error);
    throw error;
  }
}