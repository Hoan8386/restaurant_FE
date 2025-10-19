import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { Card, Spin, Empty, Row, Col, Statistic } from "antd";
import { DollarOutlined, ArrowUpOutlined } from "@ant-design/icons";
import { fetchMonthlyRevenue } from "../../../services/api.service";

const MonthlyRevenueChart = () => {
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [stats, setStats] = useState({
    maxRevenue: 0,
    totalRevenue: 0,
    avgRevenue: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetchMonthlyRevenue();
        console.log("Monthly Revenue API Response:", response); // Debug

        if (response && response.data && Array.isArray(response.data)) {
          const data = response.data;
          console.log("Raw monthly revenue data:", data); // Debug

          // Sort by month
          data.sort((a, b) => {
            const monthA = new Date(a.month + "-01");
            const monthB = new Date(b.month + "-01");
            return monthA - monthB;
          });

          const labels = data.map((item) => item.month || "N/A");
          const revenues = data.map(
            (item) => item.totalRevenue || item.revenue || 0
          );

          console.log("Chart labels:", labels); // Debug
          console.log("Chart revenues:", revenues); // Debug

          // Calculate statistics
          const maxRevenue = Math.max(...revenues);
          const totalRevenue = revenues.reduce((a, b) => a + b, 0);
          const avgRevenue =
            revenues.length > 0 ? totalRevenue / revenues.length : 0;

          setStats({
            maxRevenue,
            totalRevenue,
            avgRevenue,
          });

          setChartData({
            labels: labels,
            datasets: [
              {
                label: "Doanh Thu Theo Tháng",
                data: revenues,
                borderColor: "#C8A97E",
                backgroundColor: "rgba(200, 169, 126, 0.15)",
                tension: 0.4,
                fill: true,
                pointRadius: 5,
                pointBackgroundColor: "#C8A97E",
                pointBorderColor: "#fff",
                pointBorderWidth: 2,
                pointHoverRadius: 7,
                borderWidth: 3,
                segment: {
                  borderColor: (ctx) => {
                    const value = ctx.p1DataIndex;
                    return "#C8A97E";
                  },
                },
              },
            ],
          });
        }
      } catch (error) {
        console.error("Error fetching monthly revenue:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      {/* Statistics Cards */}
      {chartData && (
        <Row gutter={[16, 16]} style={{ marginBottom: "2rem" }}>
          <Col xs={24} sm={12} md={8}>
            <Card
              style={{
                background: "linear-gradient(135deg, #C8A97E 0%, #8B7355 100%)",
                color: "#fff",
                borderRadius: "8px",
                boxShadow: "0 4px 12px rgba(200, 169, 126, 0.3)",
              }}
            >
              <Statistic
                title="Doanh Thu Cao Nhất"
                value={stats.maxRevenue}
                formatter={(value) =>
                  new Intl.NumberFormat("vi-VN", {
                    style: "currency",
                    currency: "VND",
                    notation: "compact",
                  }).format(value)
                }
                prefix={<DollarOutlined />}
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
                title="Tổng Doanh Thu"
                value={stats.totalRevenue}
                formatter={(value) =>
                  new Intl.NumberFormat("vi-VN", {
                    style: "currency",
                    currency: "VND",
                    notation: "compact",
                  }).format(value)
                }
                prefix={<DollarOutlined />}
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
                title="Doanh Thu Trung Bình"
                value={stats.avgRevenue}
                formatter={(value) =>
                  new Intl.NumberFormat("vi-VN", {
                    style: "currency",
                    currency: "VND",
                    notation: "compact",
                  }).format(value)
                }
                prefix={<DollarOutlined />}
                valueStyle={{ color: "#fff", fontSize: "20px" }}
                titleStyle={{ color: "rgba(255, 255, 255, 0.8)" }}
              />
            </Card>
          </Col>
        </Row>
      )}

      {/* Chart Card */}
      <Card
        title={
          <span style={{ fontSize: "16px", fontWeight: "bold" }}>
            📊 Xu Hướng Doanh Thu Theo Tháng
          </span>
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
          {chartData ? (
            <div
              style={{
                height: "450px",
                position: "relative",
                padding: "20px 0",
              }}
            >
              <Line
                data={chartData}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  interaction: {
                    mode: "index",
                    intersect: false,
                  },
                  plugins: {
                    filler: {
                      propagate: true,
                    },
                    legend: {
                      display: true,
                      position: "top",
                      labels: {
                        color: "#1a1a2e",
                        font: { size: 14, weight: "bold" },
                        padding: 20,
                        usePointStyle: true,
                        pointStyle: "circle",
                      },
                    },
                    tooltip: {
                      backgroundColor: "rgba(26, 26, 46, 0.95)",
                      padding: 16,
                      cornerRadius: 12,
                      titleFont: { size: 14, weight: "bold" },
                      bodyFont: { size: 13 },
                      displayColors: true,
                      callbacks: {
                        label: function (context) {
                          let label = context.dataset.label || "";
                          if (label) {
                            label += ": ";
                          }
                          label += new Intl.NumberFormat("vi-VN", {
                            style: "currency",
                            currency: "VND",
                          }).format(context.parsed.y);
                          return label;
                        },
                      },
                    },
                  },
                  scales: {
                    y: {
                      beginAtZero: true,
                      grid: {
                        color: "rgba(0, 0, 0, 0.08)",
                        drawTicks: false,
                        lineWidth: 1,
                      },
                      ticks: {
                        callback: function (value) {
                          return new Intl.NumberFormat("vi-VN", {
                            style: "currency",
                            currency: "VND",
                            notation: "compact",
                          }).format(value);
                        },
                        color: "#999",
                        font: { size: 12 },
                        padding: 10,
                      },
                    },
                    x: {
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
          ) : (
            <Empty description="Không có dữ liệu" style={{ padding: "40px" }} />
          )}
        </Spin>
      </Card>
    </div>
  );
};

export default MonthlyRevenueChart;
