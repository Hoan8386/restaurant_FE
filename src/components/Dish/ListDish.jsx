import { useContext, useEffect, useState } from 'react';
import food1 from '../../assets/img/food-1.webp';
import { Pagination, Modal } from 'antd';
import { adDishInCart, getCart } from '../../services/api.service';
import Notification from '../noti/Notification';
import { AuthContext } from '../context/auth.context';

export const ListDish = ({ dishes, total, setPage, page }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedDish, setSelectedDish] = useState(null);
    const [totalPrice, setTotalPrice] = useState(0);
    const [quantity, setQuantity] = useState(1);
    const [price, setPrice] = useState(0);
    const [dish, setDish] = useState(0);


    const [notifications, setNotifications] = useState([]);
    const addNotification = (message, description, type) => {
        const id = Date.now();
        const newNotif = { id, message, description, type };
        setNotifications((prev) => [...prev, newNotif]);


    };

    const { setCart, cart } = useContext(AuthContext);
    const chunkArray = (arr, size) => {
        const res = [];
        for (let i = 0; i < arr.length; i += size) {
            res.push(arr.slice(i + 0, i + size));
        }
        return res;
    };
    useEffect(() => {
        if (selectedDish) {
            setQuantity(1);
            setTotalPrice(selectedDish.price || 0);
        }
    }, [selectedDish]);

    const fetchCart = async () => {
        const res = await getCart();
        if (res.data) {
            setCart(res.data)
        }
    }

    const rows = chunkArray(dishes, 2);

    const showModal = (dish) => {
        setSelectedDish(dish);
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };
    const handleAddCard = ({ dish, totalPrice, quantity }) => {
        // console.log("check item", dish, totalPrice, total, quantity);
    };

    const addDishInCard = async (dishItem) => {
        const res = await adDishInCart(1, dishItem.price, dishItem.price, dishItem.id);
        if (res.data) {
            addNotification("Add new dish", "Thêm món ăn vào giỏ hàng thành công", "success");
            setCart(fetchCart());
        } else {
            addNotification("Error", "Thêm món ăn vào giỏ hàng thất bại", "error");
        }
    };

    useEffect(() => {
        if (dish && totalPrice && quantity && price) {
            handleAddCard();
        }
    }, [dish, totalPrice, quantity, price]);

    const DishContent = ({ dish, onClick }) => (
        <>
            <div className="row g-0 cursor-pointer" onClick={onClick}>
                <div className="col-12">
                    <h3 className="dish__name">{dish.name}</h3>
                </div>
                <div className="col">
                    <span className="dish__price">{dish.price.toLocaleString()}₫</span>
                </div>
            </div>
            <p className="dish__prameter text">{dish.category.name}</p>
            <button className="order" style={{ marginRight: "10px" }}>Order now</button>
            <button className="add__card" onClick={() => { addDishInCard(dish) }}>Add to cart</button>
        </>
    );


    return (
        <section className="container mb-5">
            {rows.map((rowDishes, rowIndex) => (
                <div className="row g-0 menu__item active" key={rowIndex}>
                    {rowDishes.map((dish, index) => {
                        const isEvenRow = rowIndex % 2 === 0;

                        return (
                            <div className="col-md-6 food__item" key={dish.id}>
                                <div className={`row g-0 dish__item ${!isEvenRow ? 'dish__item--reverse' : ''}`}>
                                    {isEvenRow ? (
                                        <>
                                            <div className="col-md-12 col-lg-6">
                                                <div
                                                    className="dish__img"
                                                    style={{
                                                        backgroundImage: `url(${food1})`,
                                                    }}
                                                ></div>
                                            </div>
                                            <div className="col-md-12 col-lg-6 dish__desc">
                                                <DishContent dish={dish} onClick={() => showModal(dish)} />
                                            </div>
                                        </>
                                    ) : (
                                        <>
                                            <div className="col-md-12 col-lg-6 dish__desc">
                                                <DishContent dish={dish} onClick={() => showModal(dish)} />
                                            </div>
                                            <div className="col-md-12 col-lg-6">
                                                <div
                                                    className="dish__img"
                                                    style={{
                                                        backgroundImage: `url(${food1})`,
                                                    }}
                                                ></div>
                                            </div>
                                        </>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            ))}

            <Pagination
                className="mt-5"
                current={page}
                total={total}
                pageSize={6}
                onChange={(page) => setPage(page)}
                style={{ textAlign: 'center' }}
            />

            {/* Modal */}
            <Modal
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
                footer={null}
                width={1014}
                style={{ padding: "0", borderRadius: "40px" }}

                getContainer={false}
            >
                <div className="row" >
                    <div className="col-md-7 ">
                        <div
                            className="modal__img"
                            style={{
                                backgroundImage: `url(${food1})`,
                                // backgroundImage: `url(${selectedDish?.image})`,

                                width: '100%',
                                height: '100%',
                                backgroundSize: "cover",
                                backgroundPosition: "center",
                                padding: '0 0',
                            }}
                        ></div>
                    </div>

                    <div className="col-md-5 " style={{ paddingRight: "36px", paddingTop: "20px" }}>
                        <div className="row">
                            {/* Tên món */}
                            <div className="col-12">
                                <div className="name mb-2">
                                    <h3 className="modal__dish__name">{selectedDish?.name}</h3>
                                </div>
                            </div>

                            {/* Loai */}
                            <div className="col-12">
                                <div className="modal__desc mb-2 " style={{ fontWeight: 600, fontSize: 18 }}>
                                    <span style={{ width: '120px', fontWeight: 600, fontSize: 18, display: "inline-block" }}>Category: </span>
                                    <span className=" text" style={{ fontWeight: 400 }} >
                                        {selectedDish?.category.name}
                                    </span>
                                </div>
                            </div>

                            {/* Mô tả */}
                            <div className="col-12">
                                <div className="modal__desc mb-2 " style={{ fontWeight: 600, fontSize: 18 }}>
                                    <span style={{ width: '120px', fontWeight: 600, fontSize: 18, display: "inline-block" }}>Description: </span>
                                    <span className="modal__dish__prameter text" >
                                        {selectedDish?.description}
                                    </span>
                                </div>
                            </div>

                            {/* Giá */}
                            <div className="col-12">
                                <div className="price mb-2 d-flex align-items-center">
                                    <div style={{ width: '120px', fontWeight: 600, fontSize: 18 }}>Price:</div>
                                    <span className="modal__dish__price">{selectedDish?.price?.toLocaleString()}₫</span>
                                </div>
                            </div>

                            {/* Số lượng */}
                            <div className="col-12">
                                <div className="quantity mb-2">
                                    <div style={{ width: '120px', fontWeight: 600, display: 'inline-block', fontSize: 18 }}>Quantity:</div>
                                    <input
                                        className="quantity__input"
                                        type="number"
                                        placeholder="Nhập vào số lượng"
                                        defaultValue={1}
                                        value={quantity}
                                        min={0}
                                        style={{ marginLeft: '10px' }}
                                        onChange={(e) => {
                                            const newQty = parseInt(e.target.value) || 1;
                                            setQuantity(newQty);
                                            setTotalPrice((selectedDish?.price || 0) * newQty);
                                        }}
                                    />
                                    <div className="feedback mt-1">Vui lòng nhập số lượng lớn hơn 1</div>
                                </div>
                            </div>

                            {/* Tổng tiền */}
                            <div className="col-12">
                                <div className="total mb-2 d-flex align-items-center">
                                    <div style={{ width: '120px', fontWeight: 600, fontSize: 18 }}>Total:</div>
                                    <span className="total__price">
                                        <span className="total__price">{totalPrice}₫</span>
                                    </span>
                                </div>
                            </div>

                            {/* Ghi chú */}
                            <div className="col-12">
                                <div className="note mb-2">
                                    <div style={{ width: '120px', fontWeight: 600, fontSize: 18 }}>Notes:</div>
                                    <textarea
                                        rows="4"
                                        className="message mt-1"
                                        placeholder=" Your message"
                                        style={{ width: '100%', border: "1px solid #ccc" }}
                                    ></textarea>
                                </div>
                            </div>

                            {/* Nút đặt hàng */}
                            <div className="col-12 mb-2">
                                <a href="./xacNhan.html" target="_blank">
                                    <button className="modal__order" style={{ width: '100%', padding: '10px 0' }}>
                                        Order
                                    </button>
                                </a>
                            </div>

                            {/* Tên thương hiệu */}
                            <div className="col-12">
                                <div
                                    style={{
                                        fontFamily: 'Great Vibes, cursive',
                                        color: '#C8A97E',
                                        fontSize: '60px',
                                        textAlign: 'center',
                                    }}
                                >
                                    Feliciano
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </Modal>

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
        </section >
    );

};
