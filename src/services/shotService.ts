import HttpClient from "@/lib/HttpClient";

interface GetShotOptions {
  status?: string;
}

interface CreateShot {
  x: number;
  y: number;
}

export async function getShotsCount(playerId: number, options?: GetShotOptions) {
  const axios = HttpClient.getInstance();

  try {
    const response = await axios.get(`/shots/${playerId}`, {
      params: options,
    });

    return response.data;
  } catch (error) {
    console.error("Error fetching shot count:", error);
    throw error;
  }
}

export async function attackCell(playerId: number, payload: CreateShot, options?: GetShotOptions) {
  const axios = HttpClient.getInstance();

  try {
    const response = await axios.post(`/shots/${playerId}`, payload, {
      params: options,
    });

    return response.data;
  } catch (error) {
    console.error("Error fetching shot count:", error);
    throw error;
  }
}