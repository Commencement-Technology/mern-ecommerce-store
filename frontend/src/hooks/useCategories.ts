import { useState, useEffect } from "react";
import { categoryService } from "../services/categoryService";
import { ICategory } from "../types";

const useCategories = () => {
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      setIsLoading(true);
      const res = await categoryService.getAllCategories();
      const { status, data } = res;
      console.log(res);
      if (status === 200) {
        setIsLoading(false);
        setCategories(data);
      } else {
        setIsLoading(false);
        console.log("Some error occured while fetching the categories");
      }
    };
    fetchCategories();
  }, []);

  return { categories, isLoading };
};

export default useCategories;
