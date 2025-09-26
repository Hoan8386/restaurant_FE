import { useEffect, useState } from "react";
import { fetchCollaborative } from "../../services/api.service";
import { ListDish } from "../../components/client/Dish/ListDish";
import BestSellerDish from "../../components/client/Dish/BestSellerDish";
import DishBanner from "../../components/client/Dish/DishBanner";
import AboutBanner from "../../components/client/About/AboutBanner";
import RecommendForYou from "../../components/client/Dish/RecommendForYou";
import RecommendBanner from "../../components/client/Recommend/RecommendBanner";
import { Button, Empty } from "antd";
import { Link } from "react-router-dom";

const Recommend = () => {
  const [dishes, setDishes] = useState([]);
  const getBestSeller = async () => {
    try {
      const res = await fetchCollaborative();

      console.log("check recommend", res.data); // Lưu toàn bộ danh sách món ăn
      if (res.data && res.data) {
        setDishes(res.data);
      }
    } catch (error) {
      console.error("Lỗi khi lấy danh sách món ăn:", error);
    }
  };
  console.log("check best seller", dishes);

  useEffect(() => {
    getBestSeller();
  }, []);

  return (
    <>
      <RecommendBanner />
      {dishes.length !== 0 ? (
        <RecommendForYou dishes={dishes} />
      ) : (
        <div style={{ padding: "40px 0", textAlign: "center" }}>
          <Empty description="Không có sản phẩm nào để hiển thị" />
          <Link
            to="/login"
            type="primary"
            style={{ marginTop: 16 }}
            onClick={() => console.log("Quay lại trang chủ")}
          >
            Đăng nhập để gợi ý cho bạn
          </Link>
        </div>
      )}
    </>
  );
};

export default Recommend;
