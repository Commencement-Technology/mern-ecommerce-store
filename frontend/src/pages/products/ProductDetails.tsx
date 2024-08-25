import React, { useCallback, useEffect, useState } from "react";
import MainLayout from "../../components/Layouts/MainLayout";
import { useNavigate, useParams } from "react-router-dom";
import { productService } from "../../services/productService";
import { handleApiStatusCode } from "../../services/utils";
import Button from "../../components/Buttons/Button";
import { Select } from "antd";

interface Review {
  rating: number;
  comment: string;
}

interface ProductDetailsState {
  productName: string;
  productDescription: string;
  productImage: string;
  productPrice: number;
  productBrand: string;
  noOfReviewsOnProduct: number;
  productRatings: number;
  productQuantity: number;
  productCountInStock: number;
  reviewsOnProduct: Review[];
}

const ProductDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [productDetails, setProductDetails] = useState<ProductDetailsState>({
    productName: "",
    productDescription: "",
    productImage: "",
    productPrice: 0,
    productBrand: "",
    noOfReviewsOnProduct: 0,
    productRatings: 0,
    productQuantity: 0,
    productCountInStock: 0,
    reviewsOnProduct: [],
  });

  const getProductDetails = useCallback(async () => {
    if (id) {
      const res = await productService.getProductById(id);
      const { data, status } = handleApiStatusCode(res);
      console.log(data);
      if (status === 200) {
        setProductDetails({
          productName: data?.name,
          productDescription: data?.description,
          productImage: data?.image,
          productPrice: data?.price,
          productBrand: data?.brand,
          noOfReviewsOnProduct: data?.numReviews,
          productRatings: data?.rating,
          productQuantity: data?.quantity,
          productCountInStock: data?.countInStock,
          reviewsOnProduct: data?.reviews as Review[],
        });
      } else if (status === 404) {
        console.error("Failed to fetch product data.");
      } else {
        console.error("Internal server error.");
      }
    }
  }, [id]);

  useEffect(() => {
    getProductDetails();
  }, [getProductDetails]);

  const handleChange = (value: string) => {
    console.log(`selected ${value}`);
  };

  const handlePageNavigation = () => {
    navigate(-1);
  };

  return (
    <MainLayout>
      <div className="bg-zinc-900 min-h-screen w-full text-white pb-10 pt-14">
        <div className="max-w-7xl mx-auto">
          <button
            className="text-lg font-medium mb-4 border-none bg-inherit"
            onClick={handlePageNavigation}
          >
            Go Back
          </button>
          <div className="flex items-start gap-10 justify-around">
            <img src={productDetails.productImage} alt="product" />
            <div className="">
              <h1>{productDetails.productName}</h1>
              <p>{productDetails.productDescription}</p>
              <p>{productDetails.productPrice}</p>
              <div className="grid grid-cols-2">
                <div>
                  <p>Brand : {productDetails.productBrand}</p>
                  <p>Reviews : {productDetails.noOfReviewsOnProduct}</p>
                  <p>{productDetails.noOfReviewsOnProduct}</p>
                </div>
                <div>
                  <p>Ratings : {productDetails.productRatings}</p>
                  <p>Quantity : {productDetails.productQuantity}</p>
                  <p>In Stock : {productDetails.productCountInStock}</p>
                </div>
              </div>
              <div>
                <Button>Add To Cart</Button>
                <Select
                  defaultValue="lucy"
                  style={{ width: 120 }}
                  onChange={handleChange}
                  options={[
                    { value: "jack", label: "Jack" },
                    { value: "lucy", label: "Lucy" },
                    { value: "Yiminghe", label: "yiminghe" },
                    { value: "disabled", label: "Disabled", disabled: true },
                  ]}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default ProductDetails;
