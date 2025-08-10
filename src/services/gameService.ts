import HttpClient from "@/lib/HttpClient";
import { PATH } from "../lib/const";

export async function startGame() {
  const axios = HttpClient.getInstance();

  try {
    const response = await axios.post(PATH.GAMES);
    // TODO: set response.data.gameId to cookies?
    return response.data.players;
  } catch (error) {
    console.error("Error while creating game:", error);
    throw error;
  }
}

export async function filterGames(options?: { status?: string }) {
  const axios = HttpClient.getInstance();

  try {
    const response = await axios.get(PATH.GAMES, { params: options });
    return response.data[0];
  } catch (error) {
    console.error("Error while fetching game details:", error);
    throw error;
  }
}