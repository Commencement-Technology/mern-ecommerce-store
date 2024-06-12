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
import { useAppDispatch, useAppSelector } from "../../../hooks";
import { DownOutlined } from "@ant-design/icons";
import { Dropdown, Space } from "antd";
import type { MenuProps } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { authService } from "../../../services/authService";
import { toast } from "react-toastify";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { logout } from "../../../features/Slicers/authSlice";

export default function Sidebar() {
  const naviagte = useNavigate();
  const dispatch = useAppDispatch();
  const [showDrawer, setShowDrawer] = useState(false);
  const { userInfo } = useAppSelector((state) => state.auth);
  const [loading, setLoading] = useState<boolean>(false);

  const logoutUser = async () => {
    setLoading(true);
    const response = await authService.logout();
    console.log(response);
    if (response?.status === 200) {
      setLoading(false);
      dispatch(logout());
      toast.success("Logged out successfully");
      naviagte("/login");
    } else {
      setLoading(false);
      toast.error(response?.response?.data?.errorMsg);
    }
  };

  const items: MenuProps["items"] = [
    {
      key: "1",
      label: <Link to="/profile">Profile</Link>,
    },
    {
      key: "2",
      label: (
        <button onClick={logoutUser}>
          {loading ? (
            <Spin
              indicator={<LoadingOutlined spin style={{ color: "white" }} />}
              size="small"
            />
          ) : (
            <p>Logout</p>
          )}
        </button>
      ),
    },
  ];

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
      {/* */}
      <div
        className="bg-black hidden w-14 md:hover:w-40 z-50 hover:w-full transition ease-linear delay-200 duration-200 text-white h-[100vh] md:flex flex-col justify-between py-9 pl-4 overflow-hidden"
        id="nav-container"
      >
        <div className="flex flex-col gap-7">
          <div className="flex items-center gap-3 cursor-pointer transition ease-in hover:translate-x-2 hover:text-[#EC4899]">
            <FaHome
              style={{
                fontSize: "20px",
              }}
            />
            <Link to="/" className="font-normal hidden nav-item-name w-full">
              Home
            </Link>
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
          {userInfo ? (
            <Dropdown menu={{ items }} rootClassName="rm-sidebar-dropdown">
              <a onClick={(e) => e.preventDefault()}>
                <Space className="text-sm">
                  {userInfo.username}
                  <DownOutlined />
                </Space>
              </a>
            </Dropdown>
          ) : (
            <>
              <div className="flex items-center gap-3 cursor-pointer transition ease-in hover:translate-x-2 hover:text-[#EC4899]">
                <IoMdLogIn />
                <p className="font-normal hidden nav-item-name">Login</p>
              </div>
              <div className="flex items-center gap-3 cursor-pointer transition ease-in hover:translate-x-2 hover:text-[#EC4899]">
                <GoPersonFill />
                <p className="font-normal hidden nav-item-name">Register</p>
              </div>
            </>
          )}
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
