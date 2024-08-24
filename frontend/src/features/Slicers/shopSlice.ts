import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";
import { Products } from "../../types";

interface ShopSliceInterface {
  products: Products[];
  productsLoading: boolean;
  productsError: string;
  isFiltering: boolean;
}

const initialState: ShopSliceInterface = {
  products: [],
  productsLoading: false,
  productsError: "",
  isFiltering: false,
};

export const shop = createSlice({
  name: "shop",
  initialState,
  reducers: {
    setProducts: (state, action: PayloadAction<Products[]>) => {
      state.products = action.payload;
    },
    setProductsLoading: (state, action: PayloadAction<boolean>) => {
      state.productsLoading = action.payload;
    },
    setProductsError: (state, action: PayloadAction<string>) => {
      state.productsError = action.payload;
    },
    setIsFiltering: (state, action: PayloadAction<boolean>) => {
      state.isFiltering = action.payload;
    },
  },
});

export const {
  setProducts,
  setProductsLoading,
  setProductsError,
  setIsFiltering,
} = shop.actions;

export default shop.reducer;
