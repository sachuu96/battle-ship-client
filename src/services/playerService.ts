import HttpClient from "@/lib/HttpClient";

export async function fetchPlayers() {
  const axios = HttpClient.getInstance();

  try {
    const response = await axios.get('/players');
    return response.data;
  } catch (error) {
    console.error("Error while fetching players:", error);
    throw error;
  }
}
