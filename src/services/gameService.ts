import HttpClient from "@/lib/HttpClient";

export async function startGame() {
  const axios = HttpClient.getInstance();

  try {
    const response = await axios.post("/games");
    // TODO: set response.data.gameId to cookies?
    return response.data.players;
  } catch (error) {
    console.error("Error while creating game:", error);
    throw error;
  }
}

export async function getGame() {
  const axios = HttpClient.getInstance();

  try {
    const response = await axios.get("/games");
    return response.data;
  } catch (error) {
    console.error("Error while fetching game details:", error);
    throw error;
  }
}