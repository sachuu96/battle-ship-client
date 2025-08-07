import HttpClient from "@/lib/HttpClient";

export async function createShips(playerId: number,data: Record<string,any>) {
  const axios = HttpClient.getInstance();

  try {
    const response = await axios.post(`/ships/${playerId}`,data);
    return response.data.createdShips;
  } catch (error) {
    console.error("Error fetching shot count:", error);
    throw error;
  }
}
