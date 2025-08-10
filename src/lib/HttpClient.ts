import axios, { AxiosInstance } from "axios";

class HttpClient {
  private static instance: AxiosInstance;

  private constructor() {}

  public static getInstance(): AxiosInstance {
    if (!HttpClient.instance) {
      HttpClient.instance = axios.create({
        baseURL:
          process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:4000/api",
        timeout: 5000,
        headers: {
          "Content-Type": "application/json",
        },
      });

      HttpClient.instance.interceptors.request.use(
        (config) => {
          
          // TODO: set this to cookies when creating the game and get it from there
          // will have to incrment manually to start a new game for this demo
          config.headers["session"] = 1;
        
          return config;
        },
        (error) => Promise.reject(error)
      );
    }

    return HttpClient.instance;
  }
}

export default HttpClient;
