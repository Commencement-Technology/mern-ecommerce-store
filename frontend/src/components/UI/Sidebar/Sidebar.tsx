import { FaHome } from "react-icons/fa";
import { FaShoppingBag } from "react-icons/fa";
import { FaCartShopping } from "react-icons/fa6";
import { FaHeart } from "react-icons/fa";
import { GoPersonFill } from "react-icons/go";
import { IoMdLogIn } from "react-icons/io";
import { GiHamburgerMenu } from "react-icons/gi";
import "./Sidebar.css";
import { Drawer } from "antd";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../contexts/AuthContext";

export default function Sidebar() {
  const [showDrawer, setShowDrawer] = useState(false);
  // const { getCurrentUser, isLoggedIn } = useContext(AuthContext);

  // useEffect(() => {
  //   alert("rumaisa");
  //   if (isLoggedIn) {
  //     getCurrentUser();
  //   }
  // }, [isLoggedIn]);

  return (
    <div>
      <NavigationDrawer showDrawer={showDrawer} setShowDrawer={setShowDrawer} />
      <div
        className="cursor-pointer block md:hidden bg-zinc-900 absolute top-8 left-7"
        onClick={() => setShowDrawer(true)}
      >
        <GiHamburgerMenu
          style={{
            color: "white",
            fontSize: "30px",
          }}
        />
      </div>
      <div
        className="bg-black hidden z-50 transition ease-linear delay-200 duration-200 text-white w-14 h-[100vh] hover:w-full md:hover:w-40 md:flex flex-col justify-between py-9 pl-4 overflow-hidden"
        id="nav-container"
      >
        <div className="flex flex-col gap-7">
          <div className="flex items-center gap-3 cursor-pointer transition ease-in hover:translate-x-2 hover:text-[#EC4899]">
            <FaHome
              style={{
                fontSize: "20px",
              }}
            />
            <p className="font-normal hidden nav-item-name w-full">Home</p>
          </div>
          <div className="flex items-center gap-3 cursor-pointer transition ease-in hover:translate-x-2 hover:text-[#EC4899]">
            <FaShoppingBag />
            <p className="font-normal hidden nav-item-name">Shop</p>
          </div>
          <div className="flex items-center gap-3 cursor-pointer transition ease-in hover:translate-x-2 hover:text-[#EC4899]">
            <FaCartShopping />
            <p className="font-normal hidden nav-item-name ">Cart</p>
          </div>
          <div className="flex items-center gap-3 cursor-pointer transition ease-in hover:translate-x-2 hover:text-[#EC4899]">
            <FaHeart />
            <p className="font-normal hidden nav-item-name">Favorites</p>
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-3 cursor-pointer transition ease-in hover:translate-x-2 hover:text-[#EC4899]">
            <IoMdLogIn />
            <p className="font-normal hidden nav-item-name">Login</p>
          </div>
          <div className="flex items-center gap-3 cursor-pointer transition ease-in hover:translate-x-2 hover:text-[#EC4899]">
            <GoPersonFill />
            <p className="font-normal hidden nav-item-name">Register</p>
          </div>
        </div>
      </div>
    </div>
  );
}

const NavigationDrawer = ({
  showDrawer,
  setShowDrawer,
}: {
  showDrawer: boolean;
  setShowDrawer: (value: boolean) => void;
}) => {
  return (
    <Drawer
      open={showDrawer}
      onClose={() => setShowDrawer(false)}
      rootClassName="rm-navigation-drawer"
    >
      <div className="flex flex-col items-center gap-3 w-full h-full pb-14">
        <div className="flex flex-col gap-7">
          <div className="flex items-center gap-5 cursor-pointer transition ease-in hover:translate-x-2">
            <FaHome
              style={{
                fontSize: "40px",
              }}
            />
            <p className="font-normal text-lg w-full">Home</p>
          </div>
          <div className="flex items-center gap-5 cursor-pointer transition ease-in hover:translate-x-2 ">
            <FaShoppingBag
              style={{
                fontSize: "25px",
              }}
            />
            <p className="font-normal text-lg">Shop</p>
          </div>
          <div className="flex items-center gap-5 cursor-pointer transition ease-in hover:translate-x-2 ">
            <FaCartShopping
              style={{
                fontSize: "25px",
              }}
            />
            <p className="font-normal text-lg">Cart</p>
          </div>
          <div className="flex items-center gap-5 cursor-pointer transition ease-in hover:translate-x-2 h">
            <FaHeart
              style={{
                fontSize: "25px",
              }}
            />
            <p className="font-normal text-lg">Favorites</p>
          </div>
          <div className="flex items-center gap-5 cursor-pointer transition ease-in hover:translate-x-2 ">
            <IoMdLogIn
              style={{
                fontSize: "25px",
              }}
            />
            <p className="font-normal text-lg">Login</p>
          </div>
          <div className="flex items-center gap-5 cursor-pointer transition ease-in hover:translate-x-2 ">
            <GoPersonFill
              style={{
                fontSize: "25px",
              }}
            />
            <p className="font-normal text-lg">Register</p>
          </div>
        </div>
      </div>
    </Drawer>
  );
};
