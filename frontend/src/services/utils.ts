import axios from "axios";
import { BACKEND_URL } from "../constants";

export const fetchApi = async (
  endpoint: string,
  method: string,
  body?: object | undefined,
  headers?: object
): Promise<any> => {
  try {
    const token = localStorage.getItem("token");
    const combinedHeaders = {
      "Content-type": "application/json",
      Accept: "application/json",
      Authorization: token ? `Bearer ${token}` : "",
      ...headers,
    };
    const response = await axios({
      method: method,
      url: `${BACKEND_URL}${endpoint}`,
      headers: combinedHeaders,
      data: body,
    });
    console.log(response);
    return response;
  } catch (error) {
    return error;
  }
};
