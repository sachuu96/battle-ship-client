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
          // TODO: hardcoded game ID for now - use cookies/session storage in future
          config.headers["session"] = 1;
          return config;
        },
        (error) => Promise.reject(error)
      );
    }

    return HttpClient.instance;
  }

  // public static setSessionToken(token: string) {
  //   const axiosInstance = this.getInstance();
  //   axiosInstance.defaults.headers.common["session"] = token;
  // }
}

export default HttpClient;
