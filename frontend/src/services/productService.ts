import { IFilteredProducts } from "../types";
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

  getProductsPerPage: async (page = 1, pageSize: number): Promise<any> => {
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

  getAllProducts: async (): Promise<any> => {
    try {
      const res = await fetchApi(
        endpoints.PRODUCTS + "all-products",
        HTTP_METHODS.GET
      );
      return res;
    } catch (error) {
      console.error("An error occured in getting products", error);
    }
  },

  getProductById: async (id: string) => {
    try {
      const res = await fetchApi(
        endpoints.PRODUCTS + `/${id}`,
        HTTP_METHODS.GET
      );
      return res;
    } catch (error) {
      console.error(`An error occured while fetching the product ${error}`);
    }
  },

  updateProductDetails: async (body: any, id: string): Promise<any> => {
    try {
      const headers: { [key: string]: string } = {};
      headers["Content-Type"] = "multipart/form-data";
      const res = await fetchApi(
        endpoints.PRODUCTS + `${id}`,
        HTTP_METHODS.PUT,
        body,
        headers
      );
      return res;
    } catch (error) {
      console.error(`Failed to update product, ${error}`);
    }
  },

  deleteProduct: async (id: string): Promise<any> => {
    try {
      const res = await fetchApi(
        endpoints.PRODUCTS + `delete/${id}`,
        HTTP_METHODS.DELETE
      );
      return res;
    } catch (error) {
      console.error(`Failed to delete product, ${error}`);
    }
  },

  filterProducts: async (body: IFilteredProducts): Promise<any> => {
    const payload = {
      checked: body.checked || [],
      radio: body.radio || [],
    };
    try {
      const res = await fetchApi(
        endpoints.PRODUCTS + "/filtered-products",
        HTTP_METHODS.POST,
        payload
      );
      return res;
    } catch (error) {
      console.error("An error while filtering products", error);
    }
  },
};
