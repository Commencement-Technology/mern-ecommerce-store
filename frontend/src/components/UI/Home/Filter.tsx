import React from "react";
import useCategories from "../../../hooks/useCategories";
import { Checkbox, Form, Input, Radio } from "antd";
import useBrands from "../../../hooks/useBrands";

interface FilterProps {
  width?: string;
}

export const Filter: React.FC<FilterProps> = ({ width = "40%" }) => {
  const { categories } = useCategories();
  const { brands } = useBrands();

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
              className="text-white"
              rootClassName="rm-checkbox"
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
          <Form.Item rootClassName="rm-form-input" className="">
            <Input
              placeholder="Enter price"
              className="bg-zinc-900 text-white placeholder:text-white"
            />
          </Form.Item>
        </Form>
      </div>
      <div className="mt-1">
        <button className="bg-zinc-900 py-2 text-white w-full rounded-md">
          Reset
        </button>
      </div>
    </div>
  );
};
