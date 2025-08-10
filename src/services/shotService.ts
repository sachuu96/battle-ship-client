import HttpClient from "../lib/HttpClient";
import { CELL_STATUS } from "../lib/const";

interface GetShotOptions {
  status?: any;
}

interface CreateShot {
  x: number;
  y: number;
}

export async function getShotsCount(playerId: number) {
  const axios = HttpClient.getInstance();

  try {
    const response = await axios.get(`/shots/${playerId}/count`);

    return response.data;
  } catch (error) {
    console.error("Error while fetching shot count:", error);
    throw error;
  }
}

export async function attackCell(playerId: number, payload: CreateShot) {
  const axios = HttpClient.getInstance();

  try {
    const response = await axios.post(`/shots/${playerId}`, payload);

    return response.data;
  } catch (error) {
    console.error("Error while attacking a cell:", error);
    throw error;
  }
}

export async function fetchAllShots(
  playerId: number,
  options?: GetShotOptions
) {
  const axios = HttpClient.getInstance();

  try {
    const response = await axios.get(`/shots/${playerId}`, {
      params: options,
    });
    return response.data;
  } catch (error) {
    console.error("Error while fetching shot details:", error);
    throw error;
  }
}
