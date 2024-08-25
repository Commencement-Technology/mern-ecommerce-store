import { HTTP_METHODS, endpoints } from "./endpoints";
import { fetchApi } from "./utils";

export const userService = {
  updateUserProfile: async (
    userId: string,
    updatedUserName: string,
    updatedUserEmail: string,
    updatedUserPassword: string
  ): Promise<any> => {
    try {
      const res = await fetchApi(
        endpoints.USERS + "update-profile",
        HTTP_METHODS.PUT,
        {
          _id: userId,
          username: updatedUserName,
          email: updatedUserEmail,
          password: updatedUserPassword,
        }
      );
      return res;
    } catch (error) {
      console.log("Error while updating user profile.");
    }
  },
};
