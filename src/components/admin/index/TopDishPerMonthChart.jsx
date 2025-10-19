import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { Card, Spin, Empty, Table, Tag, Row, Col, Statistic } from "antd";
import { ShoppingOutlined, FireOutlined } from "@ant-design/icons";
import { fetchTopSellingDishPerMonth } from "../../../services/api.service";
import CustomSelect from "./CustomSelect";

const TopDishPerMonthChart = () => {
  const [allData, setAllData] = useState([]);
  const [chartData, setChartData] = useState(null);
  const [tableData, setTableData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [monthOptions, setMonthOptions] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState(null);
  const [stats, setStats] = useState({
    totalDishes: 0,
    maxQuantity: 0,
    totalQuantity: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetchTopSellingDishPerMonth();
        console.log("Top Dishes API Response:", response); // Debug

        if (response && response.data && Array.isArray(response.data)) {
          const data = response.data;
          console.log("Raw top dishes data:", data); // Debug

          setAllData(data);

          // Extract unique months and create options
          const uniqueMonths = [
            ...new Set(
              data.map(
                (item) => `${item.year}-${String(item.month).padStart(2, "0")}`
              )
            ),
          ]
            .sort()
            .reverse();

          console.log("Unique months:", uniqueMonths); // Debug

          const options = uniqueMonths.map((month) => ({
            label: `Tháng ${month.split("-")[1]} / ${month.split("-")[0]}`,
            value: month,
          }));

          console.log("Month options:", options); // Debug

          setMonthOptions(options);

          // Select the first month by default
          if (options.length > 0) {
            const firstMonth = options[0].value;
            console.log("Setting first month:", firstMonth); // Debug
            setSelectedMonth(firstMonth);
          }
        }
      } catch (error) {
        console.error("Error fetching top dishes per month:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Update chart when selected month changes
  useEffect(() => {
    if (selectedMonth && allData.length > 0) {
      // Filter data for selected month
      const monthData = allData
        .filter(
          (item) =>
            `${item.year}-${String(item.month).padStart(2, "0")}` ===
            selectedMonth
        )
        .sort((a, b) => b.totalSold - a.totalSold)
        .slice(0, 10);

      console.log("Filtered month data:", monthData); // Debug

      const labels = monthData.map((item) => item.dishName || "N/A");
      const quantities = monthData.map((item) => item.totalSold || 0);

      console.log("Chart labels:", labels); // Debug
      console.log("Chart quantities:", quantities); // Debug

      // Calculate stats
      const maxQuantity = Math.max(...quantities, 0);
      const totalQuantity = quantities.reduce((a, b) => a + b, 0);

      setStats({
        totalDishes: monthData.length,
        maxQuantity,
        totalQuantity,
      });

      setChartData({
        labels: labels,
        datasets: [
          {
            label: "Số Lượng Bán",
            data: quantities,
            backgroundColor: [
              "#FF9EBD",
              "#FFB5D3",
              "#FFCCE0",
              "#FFE3ED",
              "#5B9EE1",
              "#7BB3E8",
              "#9BC8EF",
              "#FFEAAD",
              "#A7E8D6",
              "#C1B3E8",
            ],
            borderColor: "transparent",
            borderWidth: 0,
            borderRadius: 6,
          },
        ],
      });

      // Prepare table data
      const tableRows = monthData.map((item, index) => ({
        key: index,
        rank: index + 1,
        dishName: item.dishName,
        totalSold: item.totalSold,
        month: item.month,
        year: item.year,
      }));
      setTableData(tableRows);
    }
  }, [selectedMonth, allData]);

  const columns = [
    {
      title: "Xếp Hạng",
      dataIndex: "rank",
      key: "rank",
      width: 80,
      render: (text) => (
        <Tag
          color={text === 1 ? "#FF9EBD" : text === 2 ? "#5B9EE1" : "#FFEAAD"}
          style={{ color: "#fff", fontWeight: "bold", fontSize: "13px" }}
        >
          #{text}
        </Tag>
      ),
    },
    {
      title: "Tên Món",
      dataIndex: "dishName",
      key: "dishName",
      render: (text) => <span style={{ fontWeight: 500 }}>{text}</span>,
    },
    {
      title: "Số Lượng Bán",
      dataIndex: "totalSold",
      key: "totalSold",
      render: (text) => (
        <span
          style={{ color: "#FF9EBD", fontWeight: "bold", fontSize: "14px" }}
        >
          {text}
        </span>
      ),
    },
  ];

  return (
    <div>
      {/* Statistics Cards */}
      {chartData && (
        <Row gutter={[16, 16]} style={{ marginBottom: "2rem" }}>
          <Col xs={24} sm={12} md={8}>
            <Card
              style={{
                background: "linear-gradient(135deg, #FF9EBD 0%, #FFB5D3 100%)",
                color: "#fff",
                borderRadius: "8px",
                boxShadow: "0 4px 12px rgba(255, 158, 189, 0.3)",
              }}
            >
              <Statistic
                title="Tổng Số Món"
                value={stats.totalDishes}
                prefix={<FireOutlined />}
                valueStyle={{ color: "#fff", fontSize: "20px" }}
                titleStyle={{ color: "rgba(255, 255, 255, 0.8)" }}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <Card
              style={{
                background: "linear-gradient(135deg, #1890ff 0%, #096dd9 100%)",
                color: "#fff",
                borderRadius: "8px",
                boxShadow: "0 4px 12px rgba(24, 144, 255, 0.3)",
              }}
            >
              <Statistic
                title="Số Lượng Cao Nhất"
                value={stats.maxQuantity}
                prefix={<ShoppingOutlined />}
                valueStyle={{ color: "#fff", fontSize: "20px" }}
                titleStyle={{ color: "rgba(255, 255, 255, 0.8)" }}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <Card
              style={{
                background: "linear-gradient(135deg, #52c41a 0%, #389e0d 100%)",
                color: "#fff",
                borderRadius: "8px",
                boxShadow: "0 4px 12px rgba(82, 196, 26, 0.3)",
              }}
            >
              <Statistic
                title="Tổng Số Lượng"
                value={stats.totalQuantity}
                prefix={<ShoppingOutlined />}
                valueStyle={{ color: "#fff", fontSize: "20px" }}
                titleStyle={{ color: "rgba(255, 255, 255, 0.8)" }}
              />
            </Card>
          </Col>
        </Row>
      )}

      {/* Chart Card */}
      <Card
        title="🍽️ Top Món Bán Chạy Nhất Theo Tháng"
        extra={
          <CustomSelect
            placeholder="Chọn tháng"
            value={selectedMonth}
            onChange={(value) => {
              console.log("Selected month:", value);
              setSelectedMonth(value);
            }}
            options={monthOptions}
            allowClear
          />
        }
        className="admin-card"
        style={{
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)",
          borderRadius: "8px",
          background: "linear-gradient(135deg, #f5f5f5 0%, #fff 100%)",
          border: "1px solid #f0f0f0",
        }}
      >
        <Spin spinning={loading}>
          {chartData && tableData.length > 0 ? (
            <>
              <div
                style={{
                  height: "450px",
                  marginBottom: "2rem",
                  position: "relative",
                  padding: "20px 0",
                }}
              >
                <Bar
                  data={chartData}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    indexAxis: "y",
                    interaction: {
                      mode: "index",
                      intersect: false,
                    },
                    plugins: {
                      legend: {
                        display: true,
                        position: "top",
                        labels: {
                          color: "#1a1a2e",
                          font: { size: 14, weight: "bold" },
                          padding: 20,
                          usePointStyle: true,
                        },
                      },
                      tooltip: {
                        backgroundColor: "rgba(26, 26, 46, 0.95)",
                        padding: 16,
                        cornerRadius: 12,
                        displayColors: true,
                      },
                    },
                    scales: {
                      x: {
                        grid: {
                          color: "rgba(0, 0, 0, 0.08)",
                          drawTicks: false,
                        },
                        ticks: {
                          color: "#999",
                          font: { size: 12 },
                          padding: 10,
                        },
                      },
                      y: {
                        grid: {
                          display: false,
                          drawTicks: false,
                        },
                        ticks: {
                          color: "#999",
                          font: { size: 12 },
                          padding: 10,
                        },
                      },
                    },
                  }}
                />
              </div>

              <div style={{ marginTop: "2rem" }}>
                <h3
                  style={{
                    color: "#1a1a2e",
                    fontWeight: "bold",
                    marginBottom: "1rem",
                  }}
                >
                  Chi Tiết Top 10 Món Bán Chạy
                </h3>
                <Table
                  columns={columns}
                  dataSource={tableData}
                  pagination={{ pageSize: 10, showSizeChanger: false }}
                  bordered
                  size="small"
                  className="admin-table"
                />
              </div>
            </>
          ) : (
            <Empty description="Không có dữ liệu" style={{ padding: "40px" }} />
          )}
        </Spin>
      </Card>
    </div>
  );
};

export default TopDishPerMonthChart;
