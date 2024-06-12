import { HTTP_METHODS, endpoints } from "./endpoints";
import { fetchApi } from "./utils";

export const authService = {
  registerUser: async (
    username: string,
    email: string,
    password: string
  ): Promise<any> => {
    try {
      const res = await fetchApi(
        endpoints.USERS + "register",
        HTTP_METHODS.POST,
        {
          username: username,
          email: email,
          password: password,
        }
      );
      return res;
    } catch (error) {
      console.log("Error while registering user");
    }
  },
  loginUser: async (email: string, password: string): Promise<any> => {
    try {
      const res = await fetchApi(endpoints.USERS + "login", HTTP_METHODS.POST, {
        email: email,
        password: password,
      });
      return res;
    } catch (error) {
      console.log("Error while logging the user");
    }
  },
  logout: async (): Promise<any> => {
    try {
      const res = await fetchApi(endpoints.USERS + "logout", HTTP_METHODS.POST);
      return res;
    } catch (error) {
      console.log("Error while logging out the user.");
    }
  },
};
