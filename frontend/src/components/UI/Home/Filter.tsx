import React, { useCallback, useEffect, useState } from "react";
import useCategories from "../../../hooks/useCategories";
import { Checkbox, Form, Input, Radio } from "antd";
import useBrands from "../../../hooks/useBrands";
import { productService } from "../../../services/productService";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import {
  setIsFiltering,
  setProducts,
  setProductsError,
  setProductsLoading,
} from "../../../features/Slicers/shopSlice";
import { handleApiStatusCode } from "../../../services/utils";

interface FilterProps {
  width?: string;
}

export const Filter: React.FC<FilterProps> = ({ width = "40%" }) => {
  const { categories } = useCategories();
  const { brands: initialBrands } = useBrands();
  const [checked, setChecked] = useState<string[]>([]);
  const [priceFilter, setPriceFilter] = useState<number>(0);
  const [brands, setBrands] = useState<string[]>(initialBrands);
  const dispatch = useAppDispatch();
  const { products } = useAppSelector((state) => state.shop);

  const filterProducts = useCallback(async () => {
    dispatch(setProductsLoading(true));
    const res = await productService.filterProducts({ checked });
    const { status, data } = handleApiStatusCode(res);
    if (status === 200) {
      let filteredProducts = data;
      // Apply price filtering
      if (priceFilter > 0) {
        filteredProducts = filteredProducts.filter(
          (product: any) => product.price === priceFilter
        );
      }
      if (filteredProducts.length === 0) {
        dispatch(setProducts([]));
        dispatch(setProductsError("No products to display..."));
      } else {
        dispatch(setProducts(filteredProducts));
        dispatch(setProductsError(""));
      }
    } else {
      dispatch(setProductsError("Error while filtering products"));
    }

    dispatch(setProductsLoading(false));
  }, [checked, dispatch, priceFilter]);

  useEffect(() => {
    dispatch(setIsFiltering(true));
    filterProducts();
  }, [checked, priceFilter, dispatch, filterProducts]);

  const getUniqueBrands = useCallback(() => {
    const uniqueBrands = Array.from(
      new Set(products?.map((product: any) => product.brand))
    );
    setBrands(uniqueBrands);
  }, [products]);

  useEffect(() => {
    getUniqueBrands();
  }, [products, getUniqueBrands]);

  const handleCheck = (checkedValue: boolean, categoryId: string) => {
    setChecked((prev) =>
      checkedValue
        ? [...prev, categoryId]
        : prev.filter((c) => c !== categoryId)
    );
  };

  const handlePriceChange = (newPriceFilter: number) => {
    setPriceFilter(newPriceFilter || 0);
  };

  const handleBrandClick = (brandName: string) => {
    const updatedProducts = products?.filter(
      (product) => product.brand === brandName
    );
    dispatch(setProducts(updatedProducts));
  };

  return (
    <div className="bg-zinc-800 rounded-md px-10 py-8 h-full" style={{ width }}>
      <div className="w-full">
        <button className="bg-black w-full py-2 rounded-full text-white">
          Filter by categories
        </button>
        <div className="flex flex-col text-white mt-7 gap-2">
          {categories?.map((category, index) => (
            <Checkbox
              key={index}
              rootClassName="rm-checkbox"
              className="text-white"
              onChange={(e) => handleCheck(e.target.checked, category._id)}
            >
              {category.name}
            </Checkbox>
          ))}
        </div>
      </div>
      <div className="mt-6 w-full">
        <button className="bg-black w-full py-2 px-8 rounded-full text-white">
          Filter by Brands
        </button>
        <div className="flex flex-col text-white mt-7 gap-2">
          {brands?.map((brand, index) => (
            <Radio
              key={index}
              className="text-white"
              onChange={() => handleBrandClick(brand)}
              rootClassName="rm-radio-btn"
            >
              {brand}
            </Radio>
          ))}
        </div>
      </div>
      <div className="w-full mt-6 flex flex-col gap-6">
        <button className="bg-black w-full py-2 px-8 rounded-full text-white">
          Filter by Price
        </button>
        <Form>
          <Form.Item rootClassName="rm-form-input">
            <Input
              placeholder="Enter price"
              className="bg-zinc-900 text-white placeholder:text-white"
              onChange={(e) =>
                handlePriceChange(parseFloat(e.target.value) || 0)
              }
              value={priceFilter}
              type="number"
            />
          </Form.Item>
        </Form>
      </div>
      <div className="mt-1">
        <button
          className="bg-zinc-900 py-2 text-white w-full rounded-md"
          onClick={() => window.location.reload()}
        >
          Reset
        </button>
      </div>
    </div>
  );
};
