import HttpClient from "@/lib/HttpClient";

export async function fetchPlayers(options?: any) {
  const axios = HttpClient.getInstance();

  try {
    const response = await axios.get('/players', {
      params: options,
    });

    return response.data;
  } catch (error) {
    console.error("Error fetching shot count:", error);
    throw error;
  }
}
