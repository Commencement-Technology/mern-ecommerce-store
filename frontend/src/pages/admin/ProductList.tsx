import React, { useEffect, useState } from "react";
import MainLayout from "../../components/Layouts/MainLayout";
import Button from "../../components/Buttons/Button";
import { FaArrowRightLong } from "react-icons/fa6";
import { productService } from "../../services/productService";
import { Products } from "../../types";
import { Pagination } from "antd";
import MyImage from "../../assets/images/image-1723300089116.jpg";

export const ProductList = () => {
  const [products, setProducts] = useState<Products[]>([]);
  const [page, setPage] = useState<number>(1);
  const [pages, setPages] = useState<number>(1);

  useEffect(() => {
    fetchProducts(page, 3);
  }, []);

  const fetchProducts = async (page: number, pageSize: number) => {
    const res = await productService.getAllProducts(page, pageSize);
    console.log(res);
    if (res?.data) {
      const { products, page, pages, hasMore } = res.data;
      console.log(products, page, pages, hasMore);
      setProducts(products);
      setPage(page);
      setPages(pages);
    }
  };

  const handlePageChange = (page: number) => {
    setPage(page);
    fetchProducts(page, 3);
  };

  return (
    <MainLayout>
      <div className="bg-zinc-900 min-h-screen">
        <div className="max-w-7xl mx-auto pb-10">
          <h1 className="text-white font-bold text-left text-2xl pt-20 pl-10 lg:pt-10">
            All Products ({products.length})
          </h1>
          <div className="lg:max-w-4xl w-11/12 mx-auto lg:mx-0 flex gap-8 flex-col justify-center items-center lg:items-start lg:justify-start mt-6">
            {products.map((product, index) => (
              <Product
                id={product._id}
                key={index}
                name={product.name}
                description={product.description}
                price={product.price}
                image={product.image}
              />
            ))}
          </div>
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
      </div>
    </MainLayout>
  );
};

const Product = ({
  id,
  name,
  description,
  price,
  image,
}: {
  id: string;
  name: string;
  description: string;
  price: number;
  image: any;
}) => {
  return (
    <div className="flex flex-col lg:flex-row gap-9">
      <div>
        <img
          src={MyImage}
          alt="product"
          className="lg:h-[230px] lg:w-[800px] w-11/12 mx-auto"
        />
      </div>
      <div className="flex flex-col gap-5 lg:gap-8 w-11/12 mx-auto lg:w-full lg:mx-0">
        <div className="text-white flex flex-col gap-1 lg:gap-3 lg:flex-row lg:justify-between">
          <h1 className="text-xl text-white font-medium">{name}</h1>
          <p className="text-white lg:items-end lg:justify-end">${price}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500 lg:max-w-4xl max-w-md">
            {description}
          </p>
          <Button className="flex items-center gap-2 w-40 py-5 mt-6">
            <p>Update Product </p>
            <FaArrowRightLong />
          </Button>
        </div>
        <div className="items-start"></div>
      </div>
    </div>
  );
};
