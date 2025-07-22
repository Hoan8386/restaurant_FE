import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import {
    HomeOutlined,
    AppstoreOutlined,
    ShoppingCartOutlined,
    TeamOutlined,
    BarChartOutlined,
    LogoutOutlined
} from '@ant-design/icons';
import { useContext } from "react";
import { AuthContext } from "../context/auth.context";
import { Button, Dropdown, Space } from "antd";
import { logoutAPI } from "../../services/api.service";
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
                id: ""
            })
            setCart([])
            // addNotification("Logout success", "Đăng xuất thành công", "success");
            //redirect to home
            navigate("/");
        }
    }

    return (
        <div className="w-full flex min-h-screen" style={{ background: "#f6f6f8" }}>
            <div className="side-bar w-[15%] p-3 bg-white h-screen flex flex-col">
                {/* Logo */}
                <div
                    className="mb-6"
                    style={{
                        fontFamily: 'Great Vibes, cursive',
                        fontSize: '40px',
                        color: '#C8A97E',
                    }}
                >
                    Feliciano
                </div>

                {/* Menu */}
                <ul className="list_menu p-0 flex-1">
                    <li className="list_menu_item">
                        <Link className="item-link flex items-center gap-2" to="/admin">
                            <HomeOutlined style={{ marginRight: "16px" }} />
                            Home
                        </Link>
                    </li>
                    <li className="list_menu_item">
                        <Link className="item-link flex items-center gap-2" to="/admin/dish">
                            <AppstoreOutlined style={{ marginRight: "16px" }} />
                            Dishes
                        </Link>
                    </li>
                    <li className="list_menu_item">
                        <Link className="item-link flex items-center gap-2" to="/admin/order">
                            <ShoppingCartOutlined style={{ marginRight: "16px" }} />
                            Orders
                        </Link>
                    </li>
                    <li className="list_menu_item">
                        <Link className="item-link flex items-center gap-2" to="/admin/user">
                            <TeamOutlined style={{ marginRight: "16px" }} />
                            User
                        </Link>
                    </li>
                    <li className="list_menu_item">
                        <Link className="item-link flex items-center gap-2" to="/analysis">
                            <BarChartOutlined style={{ marginRight: "16px" }} />
                            Analysis
                        </Link>
                    </li>
                </ul>

                {/* Logout */}
                <div className="mt-auto py-1 px-3" style={{
                    backgroundColor: "#C8A97E"
                }}>
                    <Link onClick={() => { handleLogout() }} className="text-red-600 hover:text-red-800 block items-center gap-2 text-decoration-none " style={{
                        color: "#fff",
                        fontSize: "20px",

                    }} to="/logout" >
                        <LogoutOutlined style={{ marginRight: "16px" }} />
                        <span className="material-icons">logout</span>
                    </Link>
                </div>
            </div>

            <div className="side-bar w-[85%]   ">
                <header className="bg-white py-3 px-5">
                    <p className="text-right m-0">
                        <Link to={"/admin/info"} className="text-decoration-none">
                            {user.username}
                        </Link>
                    </p>

                </header>

                <div className="p-3">
                    <Outlet />
                </div>
            </div>
        </div >
    )
}

export default LayoutAdmin;