import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import {
  HomeOutlined,
  AppstoreOutlined,
  ShoppingCartOutlined,
  TeamOutlined,
  BarChartOutlined,
  LogoutOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { useContext } from "react";
import { AuthContext } from "../context/auth.context";
import { Button, Dropdown, Space, Avatar } from "antd";
import { logoutAPI } from "../../services/api.service";
import "../../style/admin/admin.css";
const LayoutAdmin = () => {
  const { user, setUser, setCart } = useContext(AuthContext);
  const navigate = useNavigate(); // thêm
  const handleLogout = async () => {
    const res = await logoutAPI();
    if (res.data) {
      //clear data
      localStorage.removeItem("access_token");
      setUser({
        email: "",
        phone: "",
        fullName: "",
        role: "",
        avatar: "",
        id: "",
      });
      setCart([]);
      // addNotification("Logout success", "Đăng xuất thành công", "success");
      //redirect to home
      navigate("/");
    }
  };

  return (
    <div className="w-full flex min-h-screen">
      {/* Sidebar */}
      <div className="side-bar w-[15%] h-screen flex flex-col">
        {/* Logo */}
        <div className="logo">Feliciano</div>

        {/* Menu */}
        <ul className="list_menu flex-1">
          <li className="list_menu_item">
            <NavLink
              className={({ isActive }) =>
                `item-link ${isActive ? "active" : ""}`
              }
              to="/admin"
              end
            >
              <HomeOutlined />
              <span className="px-2">Dashboard</span>
            </NavLink>
          </li>
          <li className="list_menu_item">
            <NavLink
              className={({ isActive }) =>
                `item-link ${isActive ? "active" : ""}`
              }
              to="/admin/dish"
            >
              <AppstoreOutlined />
              <span className="px-2">Dishes</span>
            </NavLink>
          </li>
          <li className="list_menu_item">
            <NavLink
              className={({ isActive }) =>
                `item-link ${isActive ? "active" : ""}`
              }
              to="/admin/order"
            >
              <ShoppingCartOutlined />
              <span className="px-2">Orders</span>
            </NavLink>
          </li>
          <li className="list_menu_item">
            <NavLink
              className={({ isActive }) =>
                `item-link ${isActive ? "active" : ""}`
              }
              to="/admin/user"
            >
              <TeamOutlined />
              <span className="px-2">Users</span>
            </NavLink>
          </li>
        </ul>

        {/* Logout Button */}
        <div className="logout-btn-container">
          <Link
            onClick={() => {
              handleLogout();
            }}
            className="logout-link"
            to="/logout"
          >
            <LogoutOutlined />
            <span>Logout</span>
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <div className="w-[85%] flex flex-col bg-gray-50 h-[100vh] overflow-y-scroll">
        {/* Header */}
        <header
          className="bg-white py-2 px-6 shadow-sm border-b border-gray-200 flex justify-between items-center"
          style={{
            padding: "0 30px",
          }}
        >
          <h1 className="text-xl font-bold text-gray-800">Admin Dashboard</h1>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-sm font-semibold text-gray-700 m-0">
                {user.username}
              </p>
              <p className="text-xs text-gray-500 m-0">{user.email}</p>
            </div>
            <Link to={"/admin/info"}>
              <Avatar
                icon={<UserOutlined />}
                style={{ backgroundColor: "#C8A97E", cursor: "pointer" }}
                size={40}
              />
            </Link>
          </div>
        </header>

        {/* Content Area */}
        <div className="admin-main-content flex-1 overflow-y-scroll">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default LayoutAdmin;
