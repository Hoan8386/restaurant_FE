import React, { useEffect, useState } from "react";
import { Card, Spin, Empty, Row, Col, Tag, Button, Progress } from "antd";
import { StarOutlined, RiseOutlined } from "@ant-design/icons";
import {
  fetchPredictedHotDishes,
  getImageUrl,
} from "../../../services/api.service";

const PredictedHotDishesCard = () => {
  const [predictedDishes, setPredictedDishes] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetchPredictedHotDishes();
        if (response && response.data && Array.isArray(response.data)) {
          // Sort by hotScore descending (predicted hot dishes use hotScore)
          const sorted = response.data.sort((a, b) => {
            const scoreA = typeof a.hotScore === "number" ? a.hotScore : 0;
            const scoreB = typeof b.hotScore === "number" ? b.hotScore : 0;
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

          setPredictedDishes(enriched);
        }
      } catch (error) {
        console.error("Error fetching predicted hot dishes:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const getScoreColor = (score) => {
    // hotScore nằm trong khoảng 0-14 hoặc cao hơn
    if (score >= 10) return "#ff4d4f"; // Đỏ - rất nóng
    if (score >= 7) return "#faad14"; // Cam - nóng
    if (score >= 5) return "#1890ff"; // Xanh - trung bình
    return "#52c41a"; // Xanh lá - ổn
  };

  return (
    <Card
      title={
        <span>
          <StarOutlined
            style={{ color: "#faad14", marginRight: "8px", fontSize: "18px" }}
          />
          ⭐ Dự Đoán Món Hot Tháng Này
        </span>
      }
      className="admin-card"
      style={{
        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
        borderRadius: "8px",
        background: "linear-gradient(135deg, #fffbe6 0%, #fff 100%)",
      }}
    >
      <Spin spinning={loading}>
        {predictedDishes && predictedDishes.length > 0 ? (
          <Row gutter={[16, 16]}>
            {predictedDishes.map((dish, index) => {
              const score = dish.hotScore || 0;
              const normalizedScore = Math.min((score / 4.6) * 100, 100);
              const scoreColor = getScoreColor(score);

              return (
                <Col xs={24} sm={12} md={8} lg={6} key={index}>
                  <div
                    style={{
                      padding: "16px",
                      borderRadius: "8px",
                      backgroundColor: "#fff",
                      border: `2px solid ${scoreColor}20`,
                      textAlign: "center",
                      transition: "all 0.3s ease",
                      cursor: "pointer",
                      position: "relative",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = "translateY(-4px)";
                      e.currentTarget.style.boxShadow = `0 8px 16px ${scoreColor}30`;
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
                            height: "120px",
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
                            backgroundColor: "#fff7e6",
                            borderRadius: "6px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            marginBottom: "8px",
                            fontSize: "48px",
                          }}
                        >
                          ⭐
                        </div>
                      )}
                    </div>
                    {/* Rank badge */}
                    <div
                      style={{
                        position: "absolute",
                        top: "8px",
                        right: "8px",
                        width: "28px",
                        height: "28px",
                        borderRadius: "50%",
                        backgroundColor: scoreColor,
                        color: "#fff",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "12px",
                        fontWeight: "bold",
                      }}
                    >
                      #{index + 1}
                    </div>

                    <div style={{ marginBottom: "12px", marginTop: "8px" }}>
                      <div
                        style={{
                          fontSize: "16px",
                          fontWeight: "bold",
                          color: "#1a1a2e",
                          marginBottom: "8px",
                        }}
                      >
                        {dish.dishName}
                      </div>
                    </div>

                    {/* Score display */}
                    <div
                      style={{
                        fontSize: "32px",
                        fontWeight: "bold",
                        color: scoreColor,
                        marginBottom: "8px",
                      }}
                    >
                      {typeof dish.hotScore === "number"
                        ? dish.hotScore.toFixed(1)
                        : "N/A"}
                    </div>

                    {/* Confidence bar */}
                    <div
                      style={{
                        width: "100%",
                        height: "6px",
                        backgroundColor: "#f0f0f0",
                        borderRadius: "3px",
                        overflow: "hidden",
                        marginBottom: "12px",
                      }}
                    >
                      <div
                        style={{
                          width: `${Math.min(
                            ((typeof dish.hotScore === "number"
                              ? dish.hotScore
                              : 0) /
                              14) *
                              100,
                            100
                          )}%`,
                          height: "100%",
                          backgroundColor: scoreColor,
                          transition: "width 0.3s ease",
                        }}
                      ></div>
                    </div>

                    {/* Details */}
                    <div
                      style={{
                        fontSize: "12px",
                        color: "#666",
                        marginBottom: "8px",
                      }}
                    >
                      <div>
                        Đơn gần đây: <strong>{dish.recentOrders || 0}</strong>
                      </div>
                      <div>
                        Đơn cũ trung bình:{" "}
                        <strong>{(dish.avgOldOrders || 0).toFixed(2)}</strong>
                      </div>
                    </div>

                    {/* Action button */}
                    <Button
                      type="primary"
                      size="small"
                      icon={<RiseOutlined />}
                      style={{
                        backgroundColor: scoreColor,
                        borderColor: scoreColor,
                      }}
                    >
                      Xem Chi Tiết
                    </Button>
                  </div>
                </Col>
              );
            })}
          </Row>
        ) : (
          <Empty description="Không có dữ liệu" />
        )}
      </Spin>
    </Card>
  );
};

export default PredictedHotDishesCard;
