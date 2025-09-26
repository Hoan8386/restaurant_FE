import { useEffect, useState } from "react";
import { fetchBestSeller } from "../../services/api.service";
import { ListDish } from "../../components/client/Dish/ListDish";
import BestSellerDish from "../../components/client/Dish/BestSellerDish";
import DishBanner from "../../components/client/Dish/DishBanner";
import AboutBanner from "../../components/client/About/AboutBanner";

const BestSeller = () => {
  const [dishes, setDishes] = useState([]);
  const getBestSeller = async () => {
    try {
      const res = await fetchBestSeller();

      if (res.data && res.data) {
        setDishes(res.data); // Lưu toàn bộ danh sách món ăn
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
      <AboutBanner />
      <BestSellerDish dishes={dishes} />
    </>
  );
};

export default BestSeller;
