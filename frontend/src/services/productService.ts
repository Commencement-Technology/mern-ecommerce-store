import { endpoints, HTTP_METHODS } from "./endpoints";
import { fetchApi } from "./utils";

export const productService = {
  addProduct: async (body: any): Promise<any> => {
    try {
      const headers: { [key: string]: string } = {};
      headers["Content-Type"] = "multipart/form-data";
      const res = await fetchApi(
        endpoints.PRODUCTS + "add",
        HTTP_METHODS.POST,
        body,
        headers
      );
      return res;
    } catch (error) {
      console.error("Product creation failed", error);
    }
  },

  getAllProducts: async (page = 1, pageSize = 3): Promise<any> => {
    try {
      const res = await fetchApi(
        endpoints.PRODUCTS + `?page=${page}&pageSize=${pageSize}`,
        HTTP_METHODS.GET
      );
      return res;
    } catch (error) {
      console.error("An error occured in fetching all products", error);
    }
  },

  // deleteProduct: async () => {
  //   try {
  //   } catch (error) {
  //     console.error(error);
  //   }
  // },
};
