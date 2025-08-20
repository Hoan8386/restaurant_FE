// src/pages/ThanksPage.jsx
import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { paymentCallback } from "../../services/api.service";

const ThanksPage = () => {
    const location = useLocation();
    const navigate = useNavigate();


    // ✅ Lấy thông tin user từ state khi điều hướng
    const { user } = location.state || { user: { username: "Quý khách" } };

    const [status, setStatus] = useState("Đang xử lý...");

    useEffect(() => {
        const fetchPaymentStatus = async () => {
            const params = new URLSearchParams(window.location.search);
            const responseCode = params.get("vnp_ResponseCode");
            const txnRef = params.get("vnp_TxnRef");

            if (responseCode && txnRef) {
                try {
                    const res = await paymentCallback(responseCode, txnRef);
                    if (res.status === 200) {
                        setTimeout(() => {
                            navigate("/");
                            // hoặc window.location.href = "http://localhost:5173/";
                        }, 5000);
                    }
                    console.log(res.data);
                    // Hiển thị status cho user
                    // Ví dụ: setStatus(responseCode === "00" ? "Thanh toán thành công ✅" : "Thanh toán thất bại ❌");
                } catch (err) {
                    console.error(err);
                    // setStatus("Có lỗi khi xác nhận thanh toán ❌");
                }
            }
        };

        fetchPaymentStatus();
    }, []);



    return (
        <div className="flex justify-center items-center min-h-screen bg-[#f9f9f9]">
            <div className="bg-white rounded-lg shadow-lg w-[1000px] h-[710px] p-5 relative animate-fadeIn">
                <button
                    onClick={() => navigate("/")}
                    className="absolute right-8 text-xl text-black"
                >
                    <i className="fa-solid fa-xmark"></i>
                </button>
                <div className="text-center text-[#C8A97E] text-6xl font-[Great_Vibes,cursive]">
                    Feliciano
                </div>
                <p className="mt-8 text-2xl font-[Great_Vibes,cursive]">
                    Kính gửi Quý khách hàng thân mến:{" "}
                    <strong>{user.username}</strong>
                </p>
                <p className="mt-4 text-xl font-[Great_Vibes,cursive] leading-relaxed">
                    Cảm ơn quý khách đã đặt hàng tại cửa hàng của chúng tôi.
                    Mỗi đơn hàng đều là niềm vinh hạnh và động lực để chúng tôi phục vụ tốt hơn.
                    Rất mong sẽ tiếp tục được đồng hành cùng quý khách trong những lần ghé thăm tiếp theo.
                    <br />
                    Trân trọng!
                </p>

                <p className="text-right mt-8 text-xl font-[Great_Vibes,cursive]">
                    Ký Tên
                </p>
                <p className="text-right text-xl font-[Great_Vibes,cursive] font-bold">
                    Nguyễn Thành Hoàn
                </p>
            </div>
        </div>
    );
};

export default ThanksPage;
