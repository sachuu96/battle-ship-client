import axios, { AxiosInstance, AxiosResponse } from 'axios';

class HttpClient {
  private static instance: AxiosInstance;

  private constructor() {}

  public static getInstance(): AxiosInstance {
    if (!HttpClient.instance) {
      HttpClient.instance = axios.create({
        baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:4000/api',
        timeout: 5000,
        headers: {
          'Content-Type': 'application/json',
        },
      });

    //   TODO: add an intercepter to attach session header

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
}

export default HttpClient;
