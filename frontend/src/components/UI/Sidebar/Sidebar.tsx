import { FaHome } from "react-icons/fa";
import { FaShoppingBag } from "react-icons/fa";
import { FaCartShopping } from "react-icons/fa6";
import { FaHeart } from "react-icons/fa";
import { GoPersonFill } from "react-icons/go";
import { IoMdLogIn } from "react-icons/io";
import { GiHamburgerMenu } from "react-icons/gi";
import "./Sidebar.css";
import { Drawer } from "antd";
import { useState } from "react";

export default function Sidebar() {
  const [showDrawer, setShowDrawer] = useState(false);
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
        className="bg-black hidden z-50 hover:transition hover:ease-in-out text-white w-14 h-[100vh] hover:w-full md:hover:w-40 md:flex flex-col justify-between py-9 pl-4 overflow-hidden"
        id="nav-container"
      >
        <div className="flex flex-col gap-7">
          <div className="flex items-center gap-3 cursor-pointer">
            <FaHome
              style={{
                fontSize: "20px",
              }}
            />
            <p className="font-normal hidden nav-item-name w-full">Home</p>
          </div>
          <div className="flex items-center gap-3 cursor-pointer">
            <FaShoppingBag />
            <p className="font-normal hidden nav-item-name">Shop</p>
          </div>
          <div className="flex items-center gap-3 cursor-pointer">
            <FaCartShopping />
            <p className="font-normal hidden nav-item-name">Cart</p>
          </div>
          <div className="flex items-center gap-3 cursor-pointer">
            <FaHeart />
            <p className="font-normal hidden nav-item-name">Favorites</p>
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-3 cursor-pointer">
            <IoMdLogIn />
            <p className="font-normal hidden nav-item-name">Login</p>
          </div>
          <div className="flex items-center gap-3 cursor-pointer">
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
      className="bg-zinc-900"
      open={showDrawer}
      onClose={() => setShowDrawer(false)}
    >
      Drawer is open
    </Drawer>
  );
};
