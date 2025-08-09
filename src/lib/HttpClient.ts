// import axios, { AxiosInstance, AxiosResponse } from "axios";
// import { cookies } from "next/headers";

// class HttpClient {
//   private static instance: AxiosInstance;

//   private constructor() {}

//   public static getInstance(): AxiosInstance {
//     if (!HttpClient.instance) {
//       HttpClient.instance = axios.create({
//         baseURL:
//           process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:4000/api",
//         timeout: 5000,
//         headers: {
//           "Content-Type": "application/json",
//         },
//       });

//       HttpClient.instance.interceptors.request.use(
//         async (config) => {
//           const token = (await cookies()).get("session")?.value;
//           if (token) {
//             config.headers["session"] = token;
//           }

//           return config;
//         },
//         (error) => {
//           return Promise.reject(error);
//         }
//       );

//       HttpClient.instance.interceptors.response.use(
//         (response: AxiosResponse) => response,
//         (error) => {
//           // TODO: handle errors globally here
//           return Promise.reject(error);
//         }
//       );
//     }

//     return HttpClient.instance;
//   }
// }

// export default HttpClient;

// src/lib/HttpClient.ts
import axios, { AxiosInstance, AxiosResponse } from "axios";

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
          // TODO: harcoded game ID for now - since SSR can not access local storage. use cookies?
          config.headers["session"] = 2;

          return config;
        },
        (error) => Promise.reject(error)
      );

      HttpClient.instance.interceptors.response.use(
        (response: AxiosResponse) => response,
        (error) => {
          // TODO: handle errors globally here
          return Promise.reject(error);
        }
      );
    }

    return HttpClient.instance;
  }

  public static setSessionToken(token: string) {
    const axiosInstance = this.getInstance();
    axiosInstance.defaults.headers.common["session"] = token;
  }

}

export default HttpClient;
