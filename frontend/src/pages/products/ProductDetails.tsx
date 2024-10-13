import React, { useCallback, useEffect, useState } from "react";
import MainLayout from "../../components/Layouts/MainLayout";
import { useNavigate, useParams } from "react-router-dom";
import { productService } from "../../services/productService";
import { handleApiStatusCode } from "../../services/utils";
import Button from "../../components/Buttons/Button";
import { Form, Input, Rate, Select } from "antd";
import { MdBrandingWatermark } from "react-icons/md";
import { MdOutlineStarRate } from "react-icons/md";
import { MdOutlineReviews } from "react-icons/md";
import { ImListNumbered } from "react-icons/im";
import { AiOutlineStock } from "react-icons/ai";

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

export default function ProductDetails() {
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

  const options = Array.from({ length: 100 }, (_, index) => ({
    value: index + 1,
    label: String(index + 1),
  }));

  const [productActiveTab, setProductActiveTab] = useState<number>(1);
  return (
    <MainLayout>
      <div className="bg-zinc-900 min-h-screen w-full text-white pb-10 pt-14">
        <div className="lg:max-w-6xl mx-auto w-4/5 pt-8 lg:pt-0">
          <button
            className="text-lg font-medium lg:mb-4 mb-6 border-none bg-inherit"
            onClick={handlePageNavigation}
          >
            Go Back
          </button>
          <div className="flex flex-col lg:flex-row items-center justify-center lg:items-start gap-10 lg:justify-around w-full">
            <div className="w-full">
              <img
                src={productDetails.productImage}
                alt="product"
                className="w-full"
              />
            </div>
            <div className="w-full">
              <h1 className="text-2xl font-medium">
                {productDetails.productName}
              </h1>
              <p className="py-3 font-light text-gray-400">
                {productDetails.productDescription}
              </p>
              <p className="text-white font-semibold text-xl py-3">
                {productDetails.productPrice}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 font-light">
                <div className="flex gap-2 flex-col">
                  <div className="flex items-center gap-2">
                    <MdBrandingWatermark />
                    <p>Brand : {productDetails.productBrand}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <MdOutlineReviews />
                    <p>Reviews : {productDetails.noOfReviewsOnProduct}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Rate />
                    <p>{productDetails.noOfReviewsOnProduct}</p>
                  </div>
                </div>
                <div className="flex gap-2 flex-col">
                  <div className="flex items-center gap-2">
                    <MdOutlineStarRate />
                    <p>Ratings : {productDetails.productRatings}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <ImListNumbered />
                    <p>Quantity : {productDetails.productQuantity}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <AiOutlineStock />
                    <p>In Stock : {productDetails.productCountInStock}</p>
                  </div>
                </div>
              </div>
              <div className="lg:mt-3 mt-5 flex items-center gap-6 w-full">
                <Button className="bg-custom-pink-20 lg:w-2/5">
                  Add To Cart
                </Button>
                <Select
                  defaultValue={String(options[0]?.value)}
                  rootClassName="rm-categories-select"
                  style={{ width: 150 }}
                  onChange={handleChange}
                  options={options}
                />
              </div>
            </div>
          </div>
        </div>
        <ProductTabs
          productActiveTab={productActiveTab}
          setProductActiveTab={setProductActiveTab}
        />
      </div>
    </MainLayout>
  );
}

interface ProductTabsProps {
  productActiveTab: number;
  setProductActiveTab: (value: number) => void;
}

const ProductTabs: React.FC<ProductTabsProps> = ({
  productActiveTab,
  setProductActiveTab,
}) => {
  const { TextArea } = Input;
  const reviewsOptions = [
    { value: "Inferior", label: "Inferior" },
    { value: "Decent", label: "Decent" },
    { value: "Great", label: "Great" },
    { value: "Excellent", label: "Excellent" },
    { value: "Exceptional", label: "Exceptional" },
  ];

  return (
    <div className="lg:max-w-4xl w-4/5 mx-auto mt-12 lg:mt-20 flex flex-col lg:flex-row gap-8">
      <div className="text-white font-light flex gap-3 lg:flex-col">
        <p
          className={`cursor-pointer ${
            productActiveTab === 1 ? "font-bold" : "font-light"
          }`}
          onClick={() => setProductActiveTab(1)}
        >
          Write your review
        </p>
        <p
          className={`cursor-pointer ${
            productActiveTab === 2 ? "font-bold" : "font-light"
          }`}
          onClick={() => setProductActiveTab(2)}
        >
          All Reviews
        </p>
      </div>
      <div className="text-white w-full lg:w-1/2">
        {productActiveTab === 1 && (
          <div>
            <Form layout="vertical">
              <Form.Item
                rootClassName="rm-form-input"
                label={<label className="text-white font-light">Rating</label>}
                rules={[{ required: true, message: "This field is required" }]}
              >
                <Select
                  className="w-full"
                  defaultValue={String(reviewsOptions[0]?.value)}
                  rootClassName="rm-categories-select"
                  style={{ width: "100%" }}
                  options={reviewsOptions}
                />
              </Form.Item>
              <Form.Item
                rules={[{ required: true, message: "This field is required" }]}
                rootClassName="rm-form-input"
                label={<label className="text-white font-light">Comment</label>}
                className="flex flex-col"
              >
                <TextArea
                  placeholder="Enter your comments on the product.."
                  rows={6}
                />
              </Form.Item>
              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="bg-custom-pink-20"
                >
                  Submit
                </Button>
              </Form.Item>
            </Form>
          </div>
        )}
        {productActiveTab === 2 && (
          <div className="flex flex-col gap-3 font-light w-full">
            {Array.from({ length: 3 }, (_, index) => (
              <Review index={index} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const Review = ({ index }: { index: number }) => {
  return (
    <div className="bg-zinc-800 rounded-md px-6 py-4 text-white" key={index}>
      <div className="flex items-center justify-between pb-3 w-full">
        <p>Rumaisa</p>
        <p className="text-gray-400">23-4-2023</p>
      </div>
      <div className="flex flex-col gap-2 w-full">
        <p>Very good product</p>
        <Rate
          style={{
            fontSize: "18px",
          }}
        />
      </div>
    </div>
  );
};
