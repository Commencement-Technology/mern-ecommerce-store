import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";

interface UserInfo {
  id: string;
  username: string;
  email: string;
}

interface AuthSliceInterface {
  userInfo: UserInfo | null;
  expirationTime: string | null;
}

const initialState: AuthSliceInterface = {
  userInfo: localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo") as string)
    : null,
  expirationTime: localStorage.getItem("expirationTime"),
};

export const auth = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<UserInfo>) => {
      state.userInfo = action.payload;
      localStorage.setItem("userInfo", JSON.stringify(action.payload));
      const expirationTime = new Date().getTime() + 30 * 24 * 60 * 60 * 1000; // 30 days
      localStorage.setItem("expirationTime", expirationTime.toString());
      state.expirationTime = expirationTime.toString();
    },
    logout: (state) => {
      state.userInfo = null;
      localStorage.clear();
    },
  },
});

export const { setCredentials, logout } = auth.actions;
export default auth.reducer;
