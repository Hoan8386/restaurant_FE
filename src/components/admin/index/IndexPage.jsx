import { useEffect, useState } from "react";
import {
  fetchDashboardSummary,
  fetchSalesByCategory,
  fetchTopCustomers,
} from "../../../services/api.service";
import DashboardCards from "./DashboardCards";
import SalesByCategoryChart from "./SalesByCategoryChart";
import TopCustomers from "./TopCustomers";
import FrequentCombos from "./FrequentCombos";
import MonthlyRevenueChart from "./MonthlyRevenueChart";
import TopDishPerMonthChart from "./TopDishPerMonthChart";
import HotDishesCard from "./HotDishesCard";
import PredictedHotDishesCard from "./PredictedHotDishesCard";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Đăng ký các thành phần cần dùng
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const IndexPage = () => {
  const [summary, setSummary] = useState({ users: 0, orders: 0, revenue: 0 });
  const [categoryChartData, setCategoryChartData] = useState({
    labels: [],
    datasets: [],
  });
  const [topCustomers, setTopCustomers] = useState([]);

  useEffect(() => {
    const getDashboardSummary = async () => {
      try {
        const res = await fetchDashboardSummary();
        if (res.data) {
          const data = res.data;
          setSummary({
            users: data.totalUsers,
            orders: data.totalOrders,
            revenue: data.totalRevenue,
          });
        }
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu dashboard:", error);
      }
    };

    const getSalesByCategory = async () => {
      try {
        const res = await fetchSalesByCategory();
        if (res.data) {
          const arr = res.data;
          const labels = arr.map((item) => item.categoryName);
          const values = arr.map((item) => item.totalRevenue);

          setCategoryChartData({
            labels,
            datasets: [
              {
                label: "Doanh thu theo danh mục",
                data: values,
                backgroundColor: [
                  "rgba(255, 99, 132, 0.6)",
                  "rgba(54, 162, 235, 0.6)",
                  "rgba(255, 206, 86, 0.6)",
                  "rgba(75, 192, 192, 0.6)",
                  "rgba(153, 102, 255, 0.6)",
                ],
                borderColor: "rgba(0,0,0,0.1)",
                borderWidth: 1,
              },
            ],
          });
        }
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu doanh thu theo danh mục:", error);
      }
    };

    const getTopCustomers = async () => {
      try {
        const res = await fetchTopCustomers();
        if (res.data) {
          const sorted = res.data.sort((a, b) => b.totalOrders - a.totalOrders);
          setTopCustomers(sorted);
        }
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu top customers:", error);
      }
    };

    getDashboardSummary();
    getSalesByCategory();
    getTopCustomers();
  }, []);

  return (
    <div className="w-full space-y-6">
      <DashboardCards summary={summary} />

      <div className="w-full" style={{ marginTop: "2rem" }}>
        <SalesByCategoryChart chartData={categoryChartData} />
      </div>

      <div className="w-full" style={{ marginTop: "2rem" }}>
        <TopCustomers customers={topCustomers} />
      </div>

      <div className="w-full" style={{ marginTop: "2rem" }}>
        <FrequentCombos />
      </div>

      <div className="w-full" style={{ marginTop: "2rem" }}>
        <MonthlyRevenueChart />
      </div>

      <div className="w-full" style={{ marginTop: "2rem" }}>
        <TopDishPerMonthChart />
      </div>

      <div className="w-full" style={{ marginTop: "2rem" }}>
        <HotDishesCard />
      </div>

      <div className="w-full" style={{ marginTop: "2rem" }}>
        <PredictedHotDishesCard />
      </div>
    </div>
  );
};

export default IndexPage;
