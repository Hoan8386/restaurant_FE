import { useContext, useEffect, useState } from "react";
import { Modal } from "antd";
import {
  adDishInCart,
  fetchDishAlsoBought,
  getCart,
  getImageUrl,
} from "../../../services/api.service";
import Notification from "../../noti/Notification";
import { AuthContext } from "../../context/auth.context";

const BestSellerDish = ({ dishes }) => {
  const [dishesWithImage, setDishesWithImage] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDish, setSelectedDish] = useState(null);
  const [totalPrice, setTotalPrice] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [notifications, setNotifications] = useState([]);
  const [recommendDish, setRecommendDish] = useState([]);

  const { setCart } = useContext(AuthContext);

  const addNotification = (message, description, type) => {
    const id = Date.now();
    setNotifications((prev) => [...prev, { id, message, description, type }]);
  };

  // Chia array thành nhóm 2
  const chunkArray = (arr, size) => {
    const res = [];
    for (let i = 0; i < arr.length; i += size) {
      res.push(arr.slice(i, i + size));
    }
    return res;
  };

  // Lấy ảnh cho danh sách dishes
  useEffect(() => {
    async function fetchImageUrls() {
      if (!dishes || dishes.length === 0) {
        setDishesWithImage([]);
        return;
      }
      const enriched = await Promise.all(
        dishes.map(async (item) => {
          const fullImageUrl = await getImageUrl(item.dish.imageUrl);
          return { ...item, dish: { ...item.dish, fullImageUrl } };
        })
      );
      setDishesWithImage(enriched);
    }
    fetchImageUrls();
  }, [dishes]);

  // Lấy giỏ hàng
  const fetchCart = async () => {
    const res = await getCart();
    if (res.data) setCart(res.data);
  };

  // Lấy sản phẩm mua kèm + enrich image
  const getDishAlsoBought = async (id) => {
    const res = await fetchDishAlsoBought(id);
    if (res.data) {
      const enriched = await Promise.all(
        res.data.map(async (item) => {
          const fullImageUrl = await getImageUrl(item.dish.imageUrl);
          return { ...item, dish: { ...item.dish, fullImageUrl } };
        })
      );
      setRecommendDish(enriched);
    }
  };

  // Mở modal
  const showModal = (dish) => {
    setSelectedDish(dish);
    setQuantity(1);
    setTotalPrice(dish.price);
    setIsModalOpen(true);
    getDishAlsoBought(dish.id);
  };

  // Thêm vào giỏ
  const addDishInCart = async (dish) => {
    try {
      const res = await adDishInCart(1, dish.price, dish.price, dish.id);
      if (res.data) {
        addNotification(
          "Add new dish",
          "Thêm món ăn vào giỏ hàng thành công",
          "success"
        );
        await fetchCart();
      } else {
        addNotification("Error", "Thêm món ăn thất bại", "error");
      }
    } catch {
      addNotification("Error", "Thêm món ăn thất bại", "error");
    }
  };

  const rows = chunkArray(dishesWithImage, 2);

  // Component con
  const DishContent = ({ dish, sold }) => (
    <>
      <h3 className="dish__name cursor-pointer" onClick={() => showModal(dish)}>
        {dish.name}
      </h3>
      <p className="dish__prameter text">Đã bán: {sold}</p>
      <span className="dish__price">{dish.price.toLocaleString()}₫</span>
      <div className="mt-2">
        <button className="order me-2" onClick={() => showModal(dish)}>
          Order now
        </button>
        <button className="add__card" onClick={() => addDishInCart(dish)}>
          Add to cart
        </button>
      </div>
    </>
  );

  return (
    <section className="container my-5">
      {rows.map((rowDishes, rowIndex) => (
        <div className="row g-0 menu__item active" key={rowIndex}>
          {rowDishes.map((item) => {
            const dish = item.dish;
            const isEvenRow = rowIndex % 2 === 0;
            return (
              <div className="col-md-6 food__item" key={dish.id}>
                <div
                  className={`row g-0 dish__item ${
                    !isEvenRow ? "dish__item--reverse" : ""
                  }`}
                >
                  {isEvenRow ? (
                    <>
                      <div className="col-md-12 col-lg-6">
                        <div
                          className="dish__img"
                          style={{
                            backgroundImage: `url(${dish.fullImageUrl || ""})`,
                          }}
                        ></div>
                      </div>
                      <div className="col-md-12 col-lg-6 dish__desc">
                        <DishContent dish={dish} sold={item.sold} />
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="col-md-12 col-lg-6 dish__desc">
                        <DishContent dish={dish} sold={item.sold} />
                      </div>
                      <div className="col-md-12 col-lg-6">
                        <div
                          className="dish__img"
                          style={{
                            backgroundImage: `url(${dish.fullImageUrl || ""})`,
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

      {/* Modal chi tiết */}
      <Modal
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
        width={1260}
        style={{ padding: 0, borderRadius: "40px", marginTop: "-50px" }}
      >
        {selectedDish && (
          <div className="row">
            <div className="col-md-5">
              <div
                className="modal__img"
                style={{
                  backgroundImage: `url(${selectedDish.fullImageUrl})`,
                  height: "100%",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              ></div>
            </div>
            <div className="col-md-7">
              <h3 className="modal__dish__name">{selectedDish.name}</h3>
              <p>
                <b>Description:</b> {selectedDish.description}
              </p>
              <p>
                <b>Price:</b> {selectedDish.price.toLocaleString()}₫
              </p>
              {/* <p>
                <b>Category:</b> {selectedDish.category?.name || "N/A"}
              </p> */}
              <div className="d-flex align-items-center my-2">
                <b>Quantity:</b>
                <input
                  type="number"
                  min={1}
                  value={quantity}
                  onChange={(e) => {
                    const newQty = parseInt(e.target.value) || 1;
                    setQuantity(newQty);
                    setTotalPrice(newQty * selectedDish.price);
                  }}
                  className="ms-2"
                />
              </div>
              <p>
                <b>Total:</b> {totalPrice.toLocaleString()}₫
              </p>
              <button
                className="modal__order w-100"
                onClick={() => addDishInCart(selectedDish)}
              >
                Add to cart
              </button>

              {/* Sản phẩm mua kèm */}
              {recommendDish.length > 0 && (
                <div
                  className="mt-4"
                  style={{
                    height: "400px",
                    overflowY: "scroll",
                    overflowX: "hidden",
                  }}
                >
                  <h5>Sản phẩm mua kèm</h5>
                  <div className="row">
                    {recommendDish.map((item) => (
                      <div className="col-4 mb-3" key={item.dish.id}>
                        <div className="card h-100">
                          <img
                            src={item.dish.fullImageUrl}
                            alt={item.dish.name}
                            className="card-img-top"
                            style={{ height: "120px", objectFit: "cover" }}
                          />
                          <div className="card-body p-2">
                            <h6 className="card-title">{item.dish.name}</h6>
                            <h6 className="card-title">
                              Mua cùng : {item.togetherCount}
                            </h6>
                            <p className="mb-1">
                              {item.dish.price.toLocaleString()}₫
                            </p>
                            <button
                              className="btn btn-sm btn-primary w-100"
                              onClick={() => addDishInCart(item.dish)}
                            >
                              Add to cart
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </Modal>

      {/* Notification */}
      <div className="fixed top-4 right-4 z-[9999]">
        {notifications.map((notif) => (
          <Notification
            key={notif.id}
            message={notif.message}
            description={notif.description}
            type={notif.type}
            onClose={() =>
              setNotifications((prev) => prev.filter((n) => n.id !== notif.id))
            }
          />
        ))}
      </div>
    </section>
  );
};

export default BestSellerDish;
