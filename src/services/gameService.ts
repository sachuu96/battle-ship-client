import HttpClient from "@/lib/HttpClient";

export async function startGame() {
  const axios = HttpClient.getInstance();

  try {
    const response = await axios.post("/games");
    localStorage.setItem("session", response.data.gameId);
    return response.data.players;
  } catch (error) {
    console.error("Error fetching shot count:", error);
    throw error;
  }
}
