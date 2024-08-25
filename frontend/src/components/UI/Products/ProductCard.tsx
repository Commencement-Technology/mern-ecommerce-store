import React from "react";
import Button from "../../Buttons/Button";
import { IoCartOutline } from "react-icons/io5";
import { FaLongArrowAltRight } from "react-icons/fa";
import { CiHeart } from "react-icons/ci";
import { Products } from "../../../types";
import { useNavigate } from "react-router-dom";

export const ProductCard: React.FC<Products> = ({
  _id,
  name,
  description,
  price,
  image,
  brand,
}) => {
  const navigate = useNavigate();
  const handleDescription = (productDescription: string) => {
    let newDescription = productDescription.substring(0, 80);
    return newDescription;
  };

  return (
    <div
      className="bg-zinc-800 rounded text-white cursor-pointer"
      onClick={() => navigate(`/product/${_id}`)}
    >
      <div className="relative">
        <img src={image} alt="Product" />
        <div className="absolute top-4 right-4 text-white">
          <CiHeart
            style={{
              fontSize: "24px",
              color: "white",
              cursor: "pointer",
            }}
          />
        </div>
        <div className="absolute bottom-5 right-4 text-white">
          <button className="bg-zinc-800 text-white text-sm font-normal px-5 py-1 rounded-full">
            {brand}
          </button>
        </div>
      </div>
      <div className="px-8 py-3">
        <div className="flex justify-between">
          <h1>{name}</h1>
          <p className="text-custom-pink-10">{price}</p>
        </div>
        <div className="pt-2 text-zinc-400 font-light">
          {handleDescription(description)}...
        </div>
        <div className="flex items-center justify-between">
          <Button
            type="primary"
            htmlType="submit"
            className="bg-custom-pink-20 mt-4 mb-3 flex items-center gap-2"
          >
            <p>Read More</p>
            <FaLongArrowAltRight
              style={{
                fontSize: "20px",
              }}
            />
          </Button>
          <IoCartOutline
            style={{
              fontSize: "24px",
              cursor: "pointer",
            }}
          />
        </div>
      </div>
    </div>
  );
};
