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
import { Link, useNavigate } from "react-router-dom";
import { authService } from "../../../services/authService";
import { toast } from "react-toastify";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { logout } from "../../../features/Slicers/authSlice";
import { UserInfo } from "../../../types";
import { CgProfile } from "react-icons/cg";
import { IoMdLogOut } from "react-icons/io";
import { FaUsers } from "react-icons/fa";
import { BsInboxesFill } from "react-icons/bs";
import { MdCategory } from "react-icons/md";
import { MdOutlineProductionQuantityLimits } from "react-icons/md";
import { FaPlusCircle } from "react-icons/fa";
import { FaFilter } from "react-icons/fa6";
import { Filter } from "../Home/Filter";
import useWindowSize from "../../../hooks/useWindowSize";
import { setIsFiltering } from "../../../features/Slicers/shopSlice";

export default function Sidebar() {
  const naviagte = useNavigate();
  const dispatch = useAppDispatch();
  const [showDrawer, setShowDrawer] = useState<boolean>(false);
  const [isFilterSidebarOpen, setIsFilterSidebarOpen] =
    useState<boolean>(false);
  const { userInfo, isAdmin } = useAppSelector((state) => state.auth);
  const [loading, setLoading] = useState<boolean>(false);
  const { windowWidth } = useWindowSize();

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

  const commonItems = [
    {
      key: "1",
      label: <Link to="/profile">Profile</Link>,
    },
    {
      key: "2",
      label: (
        <button
          onClick={logoutUser}
          style={{ border: "none", background: "none", padding: 0 }}
        >
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

  const adminItems = [
    {
      key: "3",
      label: <Link to="/users">Users</Link>,
    },
    {
      key: "4",
      label: <Link to="/orders">Orders</Link>,
    },
    {
      key: "5",
      label: <Link to="/admin/categories">Category</Link>,
    },
    {
      key: "6",
      label: <Link to="/admin/product-list">Products</Link>,
    },
    {
      key: "7",
      label: <Link to="/admin/add-product">Create Product</Link>,
    },
  ];

  const items = isAdmin ? [...commonItems, ...adminItems] : commonItems;

  return (
    <div>
      <NavigationDrawer
        showDrawer={showDrawer}
        setShowDrawer={setShowDrawer}
        userInfo={userInfo}
        logoutUser={logoutUser}
        loading={loading}
        isAdmin={isAdmin}
      />
      <FilterDrawer
        isFilterSidebarOpen={isFilterSidebarOpen}
        setIsFilterSidebarOpen={setIsFilterSidebarOpen}
      />
      {windowWidth < 1344 && (
        <div className="cursor-pointer z-50 w-full bg-zinc-900 fixed py-7 px-10 flex items-center justify-between">
          <div onClick={() => setShowDrawer(true)}>
            <GiHamburgerMenu
              style={{
                color: "white",
                fontSize: "30px",
              }}
            />
          </div>
          <div onClick={() => setIsFilterSidebarOpen(true)}>
            <FaFilter
              style={{
                color: "white",
                fontSize: "30px",
              }}
            />
          </div>
        </div>
      )}
      {windowWidth > 1344 && (
        <div
          className="bg-black w-14 md:hover:w-40 z-50 hover:w-full transition ease-linear delay-200 duration-200 text-white h-[100vh] xl:flex flex-col justify-between py-9 pl-4 overflow-hidden"
          id="nav-container"
        >
          <div className="flex flex-col gap-7">
            <div className="flex items-center gap-3 text-white cursor-pointer transition ease-in hover:translate-x-2 hover:text-[#EC4899]">
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
              <FaCartShopping />
              <p className="font-normal text-white hidden nav-item-name ">
                Cart
              </p>
            </div>
            <div className="flex items-center text-white gap-3 cursor-pointer transition ease-in hover:translate-x-2 hover:text-[#EC4899]">
              <FaHeart />
              <p className="font-normal text-white hidden nav-item-name">
                Favorites
              </p>
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
                  <Link
                    to="/login"
                    className="font-normal hidden nav-item-name"
                  >
                    Login
                  </Link>
                </div>
                <div className="flex items-center gap-3 cursor-pointer transition ease-in hover:translate-x-2 hover:text-[#EC4899]">
                  <GoPersonFill />
                  <Link
                    to="/register"
                    className="font-normal hidden nav-item-name"
                  >
                    Register
                  </Link>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

// Defining props for NavigationDrawer
interface NavigationDrawerProps {
  showDrawer: boolean;
  setShowDrawer: (value: boolean) => void;
  userInfo: UserInfo | null; // or UserInfo | undefined if userInfo might not be passed at all
  logoutUser: () => void;
  loading: boolean;
  isAdmin: boolean;
}

const NavigationDrawer: React.FC<NavigationDrawerProps> = ({
  showDrawer,
  setShowDrawer,
  userInfo,
  logoutUser,
  loading,
  isAdmin,
}) => {
  return (
    <Drawer
      open={showDrawer}
      onClose={() => setShowDrawer(false)}
      rootClassName="rm-navigation-drawer"
    >
      <div className="flex flex-col items-center gap-3 w-full h-full pb-14">
        <div className="flex flex-col gap-7">
          <Link
            to="/"
            className="flex items-center gap-5 cursor-pointer transition ease-in hover:translate-x-2"
          >
            <FaHome
              style={{
                fontSize: "40px",
              }}
            />
            <p className="font-normal text-lg w-full">Home</p>
          </Link>
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
          {userInfo ? (
            <div className="mt-5 flex flex-col items-center gap-6">
              <>
                {isAdmin ? (
                  <div className="flex flex-col items-start justify-between gap-24">
                    <div className="flex flex-col items-start gap-3">
                      <Link
                        to="/profile"
                        className="flex items-center hover:text-white gap-5 cursor-pointer transition ease-in hover:translate-x-2"
                      >
                        <CgProfile style={{ fontSize: "40px" }} />
                        <p className="font-normal text-lg w-full">Profile</p>
                      </Link>
                      <Link
                        to="/users"
                        className="flex items-center gap-5 cursor-pointer transition ease-in hover:translate-x-2"
                      >
                        <FaUsers style={{ fontSize: "40px" }} />
                        <p className="font-normal text-lg w-full">Users</p>
                      </Link>
                      <Link
                        to="/orders"
                        className="flex items-center gap-5 cursor-pointer transition ease-in hover:translate-x-2"
                      >
                        <BsInboxesFill style={{ fontSize: "40px" }} />
                        <p className="font-normal text-lg w-full">Orders</p>
                      </Link>
                      <Link
                        to="/admin/categories"
                        className="flex items-center gap-5 cursor-pointer transition ease-in hover:translate-x-2"
                      >
                        <MdCategory style={{ fontSize: "40px" }} />
                        <p className="font-normal text-lg w-full">Category</p>
                      </Link>
                      <Link
                        to="/admin/product-list"
                        className="flex items-center gap-5 cursor-pointer transition ease-in hover:translate-x-2"
                      >
                        <MdOutlineProductionQuantityLimits
                          style={{ fontSize: "40px" }}
                        />
                        <p className="font-normal text-lg w-full">Products</p>
                      </Link>
                      <Link
                        to="/admin/add-product"
                        className="flex items-center gap-5 cursor-pointer transition ease-in hover:translate-x-2"
                      >
                        <FaPlusCircle style={{ fontSize: "40px" }} />
                        <p className="font-normal text-lg w-full">
                          Add Product
                        </p>
                      </Link>
                    </div>
                    <button
                      onClick={logoutUser}
                      className="flex items-center gap-4 cursor-pointer"
                    >
                      <IoMdLogOut style={{ fontSize: "40px" }} />
                      {loading ? (
                        <Spin
                          indicator={
                            <LoadingOutlined spin style={{ color: "white" }} />
                          }
                          size="small"
                        />
                      ) : (
                        <p className="font-normal text-lg w-full">Logout</p>
                      )}
                    </button>
                  </div>
                ) : (
                  <>
                    <Link
                      to="/profile"
                      className="flex items-center gap-5 cursor-pointer transition ease-in hover:translate-x-2"
                    >
                      <CgProfile style={{ fontSize: "40px" }} />
                      <p className="font-normal text-lg w-full">Profile</p>
                    </Link>
                    <button
                      onClick={logoutUser}
                      className="flex items-center gap-4 cursor-pointer"
                    >
                      <IoMdLogOut style={{ fontSize: "40px" }} />
                      {loading ? (
                        <Spin
                          indicator={
                            <LoadingOutlined spin style={{ color: "white" }} />
                          }
                          size="small"
                        />
                      ) : (
                        <p className="font-normal text-lg w-full">Logout</p>
                      )}
                    </button>
                  </>
                )}
              </>
            </div>
          ) : (
            <>
              <div className="flex items-center gap-5 cursor-pointer transition ease-in hover:translate-x-2 ">
                <IoMdLogIn
                  style={{
                    fontSize: "25px",
                  }}
                />
                <Link to="/login" className="font-normal text-lg">
                  Login
                </Link>
              </div>
              <div className="flex items-center gap-5 cursor-pointer transition ease-in hover:translate-x-2 ">
                <GoPersonFill
                  style={{
                    fontSize: "25px",
                  }}
                />
                <Link to="/register" className="font-normal text-lg">
                  Register
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </Drawer>
  );
};

interface FilterDrawerProps {
  isFilterSidebarOpen: boolean;
  setIsFilterSidebarOpen: (value: boolean) => void;
}

const FilterDrawer: React.FC<FilterDrawerProps> = ({
  isFilterSidebarOpen,
  setIsFilterSidebarOpen,
}) => {
  return (
    <Drawer
      open={isFilterSidebarOpen}
      onClose={() => setIsFilterSidebarOpen(false)}
      rootClassName="rm-navigation-drawer"
    >
      <div className="w-full">
        <Filter width="100%" />
      </div>
    </Drawer>
  );
};
