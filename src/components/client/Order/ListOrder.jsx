import { useEffect, useState } from "react";
import { fetchAllOrder } from "../../../services/api.service";

const ListOrder = () => {
    const [orders, setOrders] = useState([]);
    const fetchOrder = async () => {
        const res = await fetchAllOrder();
        if (res.data) {
            setOrders(res.data)
        }
    }
    useEffect(() => {
        fetchOrder();
    }, [])
    return (
        <div className="container mx-auto mt-4">

            <div className="space-y-6">
                {orders.map((item) => (
                    <div
                        key={item.id}
                        className="bg-white border border-[#C8A97E]/40 rounded-xl shadow-md p-4 mt-4 hover:shadow-lg transition duration-300"
                    >
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-700">
                            {/* Cột trái */}
                            <div className="space-y-2">
                                <p><span className="text-[#C8A97E] font-semibold">Mã đơn hàng:</span> {item.id}</p>
                                <p>
                                    <span className="text-[#C8A97E] font-semibold">Thời gian đặt:</span>{" "}
                                    {new Date(item.date).toLocaleString("vi-VN", {
                                        hour12: false,
                                        timeZone: "Asia/Ho_Chi_Minh"
                                    })}
                                </p>

                                <p><span className="text-[#C8A97E] font-semibold">Người nhận:</span> {item.receiverName}</p>
                                <p><span className="text-[#C8A97E] font-semibold">Số điện thoại:</span> {item.receiverPhone}</p>
                                <p><span className="text-[#C8A97E] font-semibold">Địa chỉ:</span> {item.receiverAddress}</p>
                                <p><span className="text-[#C8A97E] font-semibold">Tổng tiền:</span> {item.totalPrice?.toLocaleString()} VND</p>
                                <p>
                                    <span className="text-[#C8A97E] font-semibold">Trạng thái:</span>{" "}
                                    <span
                                        className={`font-bold ${item.status === "PENDING"
                                            ? "text-yellow-500"
                                            : item.status === "COMPLETED"
                                                ? "text-green-600"
                                                : "text-red-500"
                                            }`}
                                    >
                                        {item.status}
                                    </span>
                                </p>
                            </div>

                            {/* Cột phải */}
                            <div className="space-y-2">

                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>

    );
}

export default ListOrder