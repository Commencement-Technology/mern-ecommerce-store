import axios from "axios";
import { BACKEND_URL } from "../constants";

export const fetchApi = async (
  endpoint: string,
  method: string,
  body?: object | undefined,
  headers?: object
): Promise<any> => {
  try {
    const combinedHeaders = {
      "Content-type": "application/json",
      Accept: "application/json",
      ...headers,
    };
    const response = await axios({
      method: method,
      url: `${BACKEND_URL}${endpoint}`,
      headers: combinedHeaders,
      data: body,
      // to properly accept cookies from the backend
      withCredentials: true,
    });
    return response;
  } catch (error) {
    return error;
  }
};
