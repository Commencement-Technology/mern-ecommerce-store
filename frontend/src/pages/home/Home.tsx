import MainLayout from "../../components/Layouts/MainLayout";
import { Product } from "../../components/UI/Products/Product";
import { Filter } from "../../components/UI/Home/Filter";
import useWindowSize from "../../hooks/useWindowSize";
import { productService } from "../../services/productService";
import { useState, useEffect } from "react";
import { Products } from "../../types";
import { Pagination } from "antd";

export default function Home() {
  const { windowWidth } = useWindowSize();
  const [products, setProducts] = useState<Products[]>([]);
  const [page, setPage] = useState<number>(1);
  const [pages, setPages] = useState<number>(1);

  useEffect(() => {
    fetchProducts(page, 12);
  }, [page]);

  const fetchProducts = async (page: number, pageSize: number) => {
    const res = await productService.getProductsPerPage(page, pageSize);
    console.log(res);
    if (res?.data) {
      const { products, page, pages } = res.data;
      console.log(products, page, pages);
      setProducts(products);
      setPage(page);
      setPages(pages);
    }
  };

  const handlePageChange = (page: number) => {
    setPage(page);
    fetchProducts(page, 12);
  };

  return (
    <MainLayout>
      <div className="bg-zinc-900 min-h-screen w-full py-10">
        <div className="max-w-7xl mx-auto flex gap-10">
          {/* filter */}
          {windowWidth > 1344 && <Filter width="30%" />}
          <div className="grid lg:grid-cols-3 grid-cols-1 sm:grid-cols-2 gap-6 sm:w-11/12 xl:w-full xl:mx-0 sm:mx-auto pt-10 lg:pt-0">
            {products.map((product, index) => (
              <div
                className="col-span-1 w-3/4 mx-auto sm:w-full sm:mx-0"
                key={index}
              >
                <Product
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
