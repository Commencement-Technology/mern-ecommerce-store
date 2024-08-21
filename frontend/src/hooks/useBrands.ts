import { useState, useEffect } from "react";
import { productService } from "../services/productService";
import { handleApiStatusCode } from "../services/utils";

const useBrands = () => {
  const [brands, setBrands] = useState<string[]>([]);

  useEffect(() => {
    fetchBrands();
  }, []);

  const fetchBrands = async () => {
    const response = await productService.getAllProducts();
    const { status, data } = handleApiStatusCode(response);
    if (status === 200 && data) {
      const productBrands = data.map((product: any) => product.brand);
      setBrands(productBrands);
    } else {
      console.log("Some error occured while fetching the categories");
    }
  };

  return { brands };
};

export default useBrands;
