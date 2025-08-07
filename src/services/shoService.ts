import HttpClient from "@/lib/HttpClient";

interface GetShotOptions {
  status?: string;
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
