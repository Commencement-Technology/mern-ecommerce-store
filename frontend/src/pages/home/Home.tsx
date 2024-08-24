import React, { useEffect, useState } from "react";
import MainLayout from "../../components/Layouts/MainLayout";
import { Filter } from "../../components/UI/Home/Filter";
import useWindowSize from "../../hooks/useWindowSize";
import { productService } from "../../services/productService";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { Pagination } from "antd";
import { ProductCard } from "../../components/UI/Products/ProductCard";
import {
  setProducts,
  setProductsLoading,
  setProductsError,
} from "../../features/Slicers/shopSlice";

export default function Home() {
  const { windowWidth } = useWindowSize();
  const [page, setPage] = useState<number>(1);
  const [pages, setPages] = useState<number>(1);
  const { products, productsLoading, productsError, isFiltering } =
    useAppSelector((state) => state.shop);
  const dispatch = useAppDispatch();

  // Fetch products based on pagination
  const fetchProducts = async (page: number, pageSize: number) => {
    dispatch(setProductsLoading(true));
    const res = await productService.getProductsPerPage(page, pageSize);
    if (res?.data) {
      const { products, page, pages } = res.data;
      dispatch(setProducts(products));
      setPage(page);
      setPages(pages);
    } else {
      dispatch(setProductsError("Failed to fetch products"));
    }
    dispatch(setProductsLoading(false));
  };

  useEffect(() => {
    if (isFiltering) {
    } else {
      fetchProducts(page, 12);
    }
  }, [page, isFiltering]);

  // Handle page change
  const handlePageChange = (page: number) => {
    setPage(page);
    fetchProducts(page, 12);
  };

  return (
    <MainLayout>
      <div className="bg-zinc-900 min-h-screen w-full py-10">
        <div className="max-w-7xl mx-auto flex gap-10">
          {/* Filter */}
          {windowWidth > 1344 && <Filter width="30%" />}
          <div
            className={
              productsLoading || productsError !== ""
                ? "flex items-center justify-center w-full"
                : "grid lg:grid-cols-3 grid-cols-1 sm:grid-cols-2 gap-6 sm:w-11/12 xl:w-full xl:mx-0 sm:mx-auto pt-10 lg:pt-0"
            }
          >
            {productsLoading && (
              <p className="text-white font-medium text-2xl">Loading...</p>
            )}
            {productsError && (
              <p className="text-white font-medium text-2xl">{productsError}</p>
            )}
            {products?.map((product, index) => (
              <div
                className="col-span-1 w-3/4 mx-auto sm:w-full sm:mx-0"
                key={index}
              >
                <ProductCard
                  _id={product._id}
                  name={product.name}
                  description={product.description}
                  price={product.price}
                  image={product.image}
                  brand={product.brand}
                />
              </div>
            ))}
          </div>
        </div>
        {/* Pagination */}
        {pages > 1 && (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "2.25rem",
            }}
          >
            <Pagination
              current={page}
              total={pages * 3}
              pageSize={3}
              onChange={handlePageChange}
              rootClassName="rm-product-pagination"
            />
          </div>
        )}
      </div>
    </MainLayout>
  );
}
