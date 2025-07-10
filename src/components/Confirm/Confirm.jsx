import { useContext, useEffect, useState } from "react";
import axios from "axios";
import bg1 from '../../assets/img/bg_1.jpg.webp';
import bg2 from '../../assets/img/bg_2.jpg.webp';
import bg3 from '../../assets/img/bg_3.jpg.webp';
import food1 from '../../assets/img/food-1.webp';
import { AuthContext } from "../context/auth.context";
import { checkOutCart, getAllDishInCart, getCart } from "../../services/api.service";
import Notification from "../noti/Notification";
import { useNavigate } from "react-router-dom";
const ConfirmPage = () => {
    const [cityData, setCityData] = useState([]);
    const [cityId, setCityId] = useState("");
    const [districtId, setDistrictId] = useState("");
    const [wardId, setWardId] = useState("");
    const [districts, setDistricts] = useState([]);
    const [wards, setWards] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [total, setTotal] = useState("0$");
    const { user, cart, setCart } = useContext(AuthContext);
    const [listItemCart, setListItemCart] = useState([]);
    const navigate = useNavigate(); // thêm
    const [notifications, setNotifications] = useState([]);
    const addNotification = (message, description, type) => {
        const id = Date.now();
        const newNotif = { id, message, description, type };
        setNotifications((prev) => [...prev, newNotif]);


    };
    //  api mới tỉnh thành việt nam https://vietnamlabs.com/vietnam-province-api
    useEffect(() => {
        axios
            .get("https://raw.githubusercontent.com/kenzouno1/DiaGioiHanhChinhVN/master/data.json")
            .then((res) => {
                setCityData(res.data);
            });
    }, []);

    useEffect(() => {
        const selectedCity = cityData.find((c) => c.Id === cityId);
        setDistricts(selectedCity ? selectedCity.Districts : []);
        setDistrictId("");
        setWardId("");
    }, [cityId, cityData]);

    useEffect(() => {
        const selectedDistrict = districts.find((d) => d.Id === districtId);
        setWards(selectedDistrict ? selectedDistrict.Wards : []);
        setWardId("");
    }, [districtId, districts]);

    const fetchCart = async () => {
        const res = await getAllDishInCart();
        if (res.data) {

            setListItemCart(res.data);
            console.log(res.data)
        } else {
            setListItemCart([]);
        }
        const res2 = await getCart();
        setCart(res2.data)
    }
    useEffect(() => {
        fetchCart()
    }, []);

    const handleCheckOut = async () => {
        const getSelectedAddress = () => {
            const city = cityData.find((c) => c.Id === cityId)?.Name || "";
            const district = districts.find((d) => d.Id === districtId)?.Name || "";
            const ward = wards.find((w) => w.Id === wardId)?.Name || "";
            return `${ward}, ${district}, ${city}`;
        };

        const address = getSelectedAddress();
        // console.log("address", address)
        const res = await checkOutCart(user.username, user.phone, address, user.email);
        if (res.data) {
            addNotification("Check out", "Thanh toán thành công", "success");

            setTimeout(() => {
                setShowModal(true);
            }, 2000);

            setTimeout(() => {
                navigate("/");
            }, 4000);
        } else {
            addNotification("Check out", "Thanh toán thất bại", "error");
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-cover bg-center" style={{ backgroundImage: `url('${bg3}')` }}>
            <div className="flex rounded-xl overflow-hidden w-[1000px] h-[600px]">
                {/* Form Thông Tin */}
                <div className="bg-white w-1/2 p-4">
                    <h2 className="text-xl font-semibold mb-4">Điền thông tin giao hàng</h2>
                    <form className="space-y-4">
                        <input defaultValue={user.username} type="text" placeholder=" Name" className=" w-full border-b border-gray-300 focus:outline-none mb-4 px-2" />
                        <input defaultValue={user.phone} type="text" placeholder=" Phone" className="w-full border-b border-gray-300 focus:outline-none mb-4 px-2" />
                        <input defaultValue={user.email} type="email" placeholder=" Email" className="w-full border-b border-gray-300 focus:outline-none mb-4 px-2" />

                        <select required className="w-full border-b border-gray-300 mb-4  py-2 px-2" value={cityId} onChange={(e) => setCityId(e.target.value)}>
                            <option value="">Chọn tỉnh thành</option>
                            {cityData.map((c) => (
                                <option key={c.Id} value={c.Id}>{c.Name}</option>
                            ))}
                        </select>

                        <select required className="w-full border-b border-gray-300 mb-4  py-2 px-2" value={districtId} onChange={(e) => setDistrictId(e.target.value)}>
                            <option value="">Chọn quận huyện</option>
                            {districts.map((d) => (
                                <option key={d.Id} value={d.Id}>{d.Name}</option>
                            ))}
                        </select>

                        <select required className="w-full border-b border-gray-300 mb-4 py-2 px-2" value={wardId} onChange={(e) => setWardId(e.target.value)}>
                            <option value="">Chọn phường xã</option>
                            {wards.map((w) => (
                                <option key={w.Id} value={w.Id}>{w.Name}</option>
                            ))}
                        </select>

                        <select required className="w-full border-b border-gray-300 mb-4  py-2 px-2">
                            <option>Phương thức thanh toán</option>
                            <option>Thanh toán qua MONO</option>
                            <option>Thanh toán qua Zalo</option>
                            <option>Thanh toán qua Ngân Hàng</option>
                            <option>Thanh toán khi nhận hàng</option>
                        </select>

                        {/* <div className="flex items-center gap-2 mt-2">
                            <label htmlFor="confirm" className="text-gray-600">Xác nhận hoàn tất</label>
                            <input type="checkbox" id="confirm" className="w-4 h-4" />
                        </div> */}
                    </form>
                </div>

                {/* Danh Sách Giỏ Hàng */}
                <div className="bg-black w-1/2 p-4 text-white ">
                    <div>
                        <h2 className="text-xl mb-4">Danh sách đặt hàng</h2>
                        <ul className="max-h-72 overflow-y-auto p-0">
                            {listItemCart.map((item) => (<li className="mb-4">
                                <div className="flex justify-between items-start">
                                    {/* Hình ảnh món ăn */}
                                    <img
                                        src={`${food1}`}
                                        alt="Grilled Beef with potatoes"
                                        className="w-20 h-15 rounded"

                                    />

                                    {/* Nội dung món ăn */}
                                    <div className="w-[250px]  text-white">
                                        <h3 className="text-sm  m-0" style={{
                                            fontSize: "15px",
                                            margin: "0",
                                        }}>{item.name}</h3>
                                        <div className="flex justify-between items-center mt-2">
                                            <input
                                                type="number"
                                                value={item.quantity}
                                                className="w-10 h-7 bg-transparent border-none text-white focus:outline-none"
                                            />
                                            <span className="text-white">{item.total}đ</span>
                                        </div>
                                    </div>

                                    {/* Nút Xóa */}
                                    <button className="text-white px-3  rounded p-2"
                                        style={{
                                            backgroundColor: "var(--primary-color)",
                                            height: "100%"
                                        }}>
                                        Xóa
                                    </button>
                                </div>
                            </li>))}
                        </ul>
                    </div>

                    <div className=" text-lg">
                        <p className="total font-bold ">Quantity: <span className="total font-normal" >{cart.totalItems}</span></p>
                        <p className="total font-bold ">Total: <span className="total font-normal" >{cart.totalPrice} vnđ</span></p>

                    </div>

                    <div className="text-center mt-6 ">
                        <button
                            onClick={() => handleCheckOut()}
                            className="bg-[#dfc094] text-white py-2 px-3 px-6 rounded transition hover:scale-105"
                        >
                            Xác nhận đơn hàng
                        </button>
                    </div>
                </div>
            </div>

            {/* Modal Cảm Ơn */}
            {
                showModal && (
                    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50 ">
                        <div className="bg-white rounded-lg shadow-lg w-[1000px] h-[710px] p-8 relative animate-fadeIn p-5">
                            <button onClick={() => setShowModal(false)} className="absolute right-8 text-xl text-black">
                                <i className="fa-solid fa-xmark"></i>
                            </button>
                            <div className="text-center text-[#C8A97E] text-6xl font-[Great_Vibes,cursive]">Feliciano</div>
                            <p className="mt-8 text-2xl font-[Great_Vibes,cursive]">
                                Kính gửi Quý khách hàng thân mến: <strong>{user.username}</strong>
                            </p>
                            <p className="mt-4 text-xl font-[Great_Vibes,cursive] leading-relaxed">
                                Chúng tôi xin gửi đến Quý khách hàng lời cảm ơn chân thành và sâu sắc nhất vì đã tin tưởng và lựa chọn các món ăn tại cửa hàng của chúng tôi trong thời gian vừa qua. <br /><br />
                                Mỗi đơn hàng được gửi đi không chỉ là một phần ăn ngon mà còn là cả tấm lòng và sự tận tâm của toàn thể đội ngũ chúng tôi. Chúng tôi luôn nỗ lực từng ngày để mang đến những món ăn chất lượng, an toàn và mang đậm hương vị đặc trưng – như một lời tri ân gửi đến Quý khách vì đã đồng hành cùng chúng tôi.
                                Sự ủng hộ và những phản hồi tích cực từ Quý khách chính là động lực lớn lao giúp chúng tôi không ngừng hoàn thiện và phát triển hơn nữa. Chúng tôi luôn mong muốn mang đến cho Quý khách những trải nghiệm ẩm thực tuyệt vời nhất – không chỉ ngon miệng mà còn trọn vẹn về cảm xúc.
                                Một lần nữa, xin cảm ơn Quý khách vì đã tin yêu và lựa chọn cửa hàng chúng tôi giữa rất nhiều sự lựa chọn ngoài kia. Chúng tôi rất mong sẽ tiếp tục được đón tiếp và phục vụ Quý khách trong những lần ghé thăm tiếp theo.
                                Trân trọng và biết ơn!
                            </p>

                            <p className="text-right  mt-8  text-xl font-[Great_Vibes,cursive]">Ký Tên</p>
                            <p className="text-right text-xl font-[Great_Vibes,cursive] font-bold">Nguyễn Thành Hoàn</p>
                        </div>
                    </div>
                )
            }
            {/* Hiển thị thông báo */}
            <div className="fixed top-4 right-4 z-[9999]">
                {notifications.map((notif) => (
                    <Notification
                        key={notif.id}
                        message={notif.error}
                        description={notif.description}
                        type={notif.type}
                        onClose={() => {
                            setNotifications((prev) =>
                                prev.filter((item) => item.id !== notif.id)
                            );
                        }}
                    />
                ))}
            </div>
        </div >
    );
};

export default ConfirmPage;
