import React, { useEffect, useState } from "react";
import { Card, Spin, Empty, Row, Col, Tag, Statistic, Avatar } from "antd";
import { FireOutlined, ArrowUpOutlined } from "@ant-design/icons";
import { fetchHotDishes, getImageUrl } from "../../../services/api.service";

const HotDishesCard = () => {
  const [hotDishes, setHotDishes] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetchHotDishes();
        console.log("API Response:", response); // Debug full response

        if (response && response.data && Array.isArray(response.data)) {
          console.log("Raw data:", response.data); // Debug raw data

          // Sort by growthRate descending (hot dishes use growthRate)
          const sorted = response.data.sort((a, b) => {
            const scoreA = typeof a.growthRate === "number" ? a.growthRate : 0;
            const scoreB = typeof b.growthRate === "number" ? b.growthRate : 0;
            return scoreB - scoreA;
          });

          // Enrich ảnh
          const enriched = await Promise.all(
            sorted.slice(0, 10).map(async (item) => ({
              ...item,
              fullImageUrl: item.imageUrl
                ? await getImageUrl(item.imageUrl)
                : null,
            }))
          );

          console.log("Enriched data:", enriched); // Debug enriched data
          setHotDishes(enriched);
        }
      } catch (error) {
        console.error("Error fetching hot dishes:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <Card
      title={
        <span>
          <FireOutlined
            style={{ color: "#ff4d4f", marginRight: "8px", fontSize: "18px" }}
          />
          🔥 Món Hot - Tăng Trưởng Cao Nhất Tháng Này
        </span>
      }
      className="admin-card"
      style={{
        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
        borderRadius: "8px",
        background: "linear-gradient(135deg, #fff5f5 0%, #fff 100%)",
      }}
    >
      <Spin spinning={loading}>
        {hotDishes && hotDishes.length > 0 ? (
          <Row gutter={[16, 16]}>
            {hotDishes.map((dish, index) => (
              <Col xs={24} sm={12} md={8} lg={6} key={index}>
                <div
                  style={{
                    padding: "12px",
                    borderRadius: "8px",
                    backgroundColor: "#fff",
                    border: "2px solid #ffebee",
                    textAlign: "center",
                    transition: "all 0.3s ease",
                    cursor: "pointer",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-4px)";
                    e.currentTarget.style.boxShadow =
                      "0 8px 16px rgba(255, 77, 79, 0.2)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                >
                  {/* Dish Image */}
                  <div style={{ marginBottom: "12px" }}>
                    {dish.fullImageUrl ? (
                      <img
                        src={dish.fullImageUrl}
                        alt={dish.dishName}
                        style={{
                          width: "100%",
                          height: "160px",
                          objectFit: "cover",
                          borderRadius: "6px",
                          marginBottom: "8px",
                        }}
                      />
                    ) : (
                      <div
                        style={{
                          width: "100%",
                          height: "120px",
                          backgroundColor: "#ffe7e7",
                          borderRadius: "6px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          marginBottom: "8px",
                          fontSize: "48px",
                        }}
                      >
                        🍽️
                      </div>
                    )}
                  </div>
                  {/* Dish Name */}
                  <div
                    style={{
                      fontSize: "20px",
                      marginBottom: "8px",
                      fontWeight: "bold",
                      color: "#1a1a2e",
                    }}
                  >
                    {index + 1}. {dish.dishName}
                  </div>
                  <div
                    style={{
                      fontSize: "32px",
                      fontWeight: "bold",
                      color: "#ff4d4f",
                      marginBottom: "12px",
                    }}
                  >
                    {typeof dish.growthRate === "number"
                      ? dish.growthRate.toFixed(1)
                      : "N/A"}
                  </div>
                  <div style={{ marginBottom: "8px" }}>
                    <Tag
                      icon={<ArrowUpOutlined />}
                      color="red"
                      style={{
                        fontSize: "12px",
                        padding: "4px 8px",
                        fontWeight: "bold",
                      }}
                    >
                      Growth Rate: +
                      {typeof dish.growthRate === "number"
                        ? dish.growthRate.toFixed(1)
                        : "N/A"}
                      x
                    </Tag>
                  </div>
                  <div style={{ fontSize: "12px", color: "#666" }}>
                    <div>
                      Đơn hiện tại: <strong>{dish.currentOrders || 0}</strong>
                    </div>
                    <div>
                      Đơn trung bình:{" "}
                      <strong>{(dish.avgPastOrders || 0).toFixed(2)}</strong>
                    </div>
                  </div>
                </div>
              </Col>
            ))}
          </Row>
        ) : (
          <Empty description="Không có dữ liệu" />
        )}
      </Spin>
    </Card>
  );
};

export default HotDishesCard;
