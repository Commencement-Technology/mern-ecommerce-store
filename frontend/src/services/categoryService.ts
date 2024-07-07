import { HTTP_METHODS, endpoints } from "./endpoints";
import { fetchApi } from "./utils";

export const categoryService = {
  getAllCategories: async () => {
    try {
      const res = await fetchApi(
        endpoints.CATEGORY + "categories",
        HTTP_METHODS.GET
      );
      return res;
    } catch (error) {
      console.error(error);
    }
  },
  addCategory: async (categoryName: string): Promise<any> => {
    try {
      const res = await fetchApi(endpoints.CATEGORY, HTTP_METHODS.POST, {
        name: categoryName,
      });
      return res;
    } catch (error) {
      console.error(error);
    }
  },
  deleteCategory: async (categoryId: string | undefined): Promise<any> => {
    try {
      const res = await fetchApi(
        endpoints.CATEGORY + categoryId,
        HTTP_METHODS.DELETE
      );
      return res;
    } catch (error) {
      console.error("Error while deleting category", error);
    }
  },
  updateCategory: async (
    categoryId: string | undefined,
    categoryName: string | undefined
  ): Promise<any> => {
    try {
      const res = await fetchApi(
        endpoints.CATEGORY + categoryId,
        HTTP_METHODS.PUT,
        { name: categoryName }
      );
      return res;
    } catch (error) {
      console.error(error);
    }
  },
};
