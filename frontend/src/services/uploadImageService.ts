import { HTTP_METHODS } from "./endpoints";
import { fetchApi } from "./utils";

export const uploadImgService = {
  uploadImage: async (formData: any): Promise<any> => {
    try {
      const headers: { [key: string]: string } = {};
      headers["Content-Type"] = "multipart/form-data";
      const res = await fetchApi(
        "upload/",
        HTTP_METHODS.POST,
        formData,
        headers
      );
      return res;
    } catch (error) {
      console.error(error);
    }
  },
};
