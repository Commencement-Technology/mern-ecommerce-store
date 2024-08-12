import axios from "axios";
import { BACKEND_URL } from "../constants";
import { ApiResponse } from "../types";
import { setIsAdmin, setCredentials } from "../features/Slicers/authSlice";
import { toast } from "react-toastify";

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

export const handleApiResponse = (
  response: ApiResponse,
  errorMsg: string,
  successMsg: string,
  isDataToBeDispatched: boolean,
  setLoadingState?: (value: boolean) => void,
  dispatch?: any,
  onSuccessCallback?: () => void,
  onErrorCallback?: () => void
) => {
  let status: number;
  let data: any;

  if (response.status) {
    status = response.status;
    data = response.data;
  } else if (response.response?.status) {
    status = response.response.status;
    data = response.response.data;
  } else {
    status = 500;
  }

  if (status === 200 || status === 201) {
    setLoadingState && setLoadingState(false);
    if (isDataToBeDispatched) {
      dispatch(setCredentials(data));
      dispatch(setIsAdmin(data?.isAdmin));
    }
    toast.success(successMsg);
    onSuccessCallback && onSuccessCallback();
  } else {
    setLoadingState && setLoadingState(false);
    toast.error(errorMsg || data?.errorMsg);
    onErrorCallback && onErrorCallback();
  }
};

export const handleApiStatusCode = (res: any) => {
  let status: number;
  let data: any;
  if (res.status) {
    status = res.status;
    data = res.data;
    return { status, data };
  } else if (res?.response?.status) {
    status = res.response.status;
    data = res.response.data;
    return { status, data };
  } else {
    status = 500;
    return { status };
  }
};
