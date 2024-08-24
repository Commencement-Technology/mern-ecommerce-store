import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./features/Slicers/authSlice";
import shopSlice from "./features/Slicers/shopSlice";

const store = configureStore({
  reducer: {
    auth: authSlice,
    shop: shopSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
