import HttpClient from "@/lib/HttpClient";
import { PATH } from "../lib/const";

export async function fetchPlayers() {
  const axios = HttpClient.getInstance();

  try {
    const response = await axios.get(PATH.PLAYERS);
    return response.data;
  } catch (error) {
    console.error("Error while fetching players:", error);
    throw error;
  }
}
