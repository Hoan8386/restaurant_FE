import { useEffect, useState } from "react";
import { FireOutlined, PlusOutlined, MinusOutlined } from "@ant-design/icons";
import {
  fetchFrequentProductPairs,
  getImageUrl,
} from "../../../services/api.service";
import { Button, Card, Tag, Empty, Space } from "antd";

const FrequentCombos = () => {
  const [combos, setCombos] = useState([]);
  const [comboSize, setComboSize] = useState(3); // default 3
  const [limit, setLimit] = useState(10); // default 10

  const getCombos = async (size = comboSize, lim = limit) => {
    try {
      const res = await fetchFrequentProductPairs(size, lim);
      if (res.data) {
        // enrich ảnh trước khi set state
        const enriched = await Promise.all(
          res.data.map(async (combo) => ({
            ...combo,
            products: await Promise.all(
              combo.products.map(async (p) => ({
                ...p,
                imageUrl: await getImageUrl(p.imageUrl),
              }))
            ),
          }))
        );
        setCombos(enriched);
      }
    } catch (error) {
      console.error("Lỗi khi lấy combos:", error);
    }
  };

  useEffect(() => {
    getCombos();
  }, [comboSize, limit]); // gọi lại khi comboSize hoặc limit thay đổi

  return (
    <div className="chart-container">
      <div className="chart-title">
        <FireOutlined style={{ marginRight: "8px", color: "#C8A97E" }} />
        Combo Món Thường Mua Cùng Nhau
      </div>

      {/* Bộ điều khiển comboSize & limit */}
      <div className="flex flex-wrap gap-4 mb-6 items-center p-4 bg-gray-50 rounded-lg">
        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold text-gray-700">
            Kích thước combo:
          </span>
          <Button
            icon={<MinusOutlined />}
            size="small"
            disabled={comboSize <= 2}
            onClick={() => setComboSize((prev) => Math.max(2, prev - 1))}
            className="hover:border-orange-400 hover:text-orange-400"
          />
          <span className="px-3 py-1 bg-white border border-gray-200 rounded font-semibold text-gray-700">
            {comboSize}
          </span>
          <Button
            icon={<PlusOutlined />}
            size="small"
            onClick={() => setComboSize((prev) => prev + 1)}
            className="hover:border-orange-400 hover:text-orange-400"
          />
        </div>

        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold text-gray-700">Số combo:</span>
          <Button
            icon={<MinusOutlined />}
            size="small"
            disabled={limit <= 5}
            onClick={() => setLimit((prev) => Math.max(5, prev - 5))}
            className="hover:border-orange-400 hover:text-orange-400"
          />
          <span className="px-3 py-1 bg-white border border-gray-200 rounded font-semibold text-gray-700">
            {limit}
          </span>
          <Button
            icon={<PlusOutlined />}
            size="small"
            onClick={() => setLimit((prev) => prev + 5)}
            className="hover:border-orange-400 hover:text-orange-400"
          />
        </div>
      </div>

      {/* Danh sách combos */}
      {combos.length === 0 ? (
        <Empty
          description="Chưa có dữ liệu combo"
          style={{ marginTop: "40px", marginBottom: "40px" }}
        />
      ) : (
        <div className="space-y-4">
          {combos.map((combo, idx) => (
            <Card
              key={idx}
              hoverable
              className="border-l-4"
              style={{ borderLeftColor: "#C8A97E" }}
            >
              {/* Tần suất */}
              <div className="flex justify-between items-center mb-4">
                <Tag
                  icon={<FireOutlined />}
                  color="orange"
                  style={{ fontSize: "13px" }}
                >
                  Tần suất: {combo.frequency} lần
                </Tag>
              </div>

              {/* Danh sách món trong combo */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                {combo.products.map((p) => (
                  <div
                    key={p.id}
                    className="flex flex-col items-center p-3 border border-gray-200 rounded-lg hover:shadow-md transition-all duration-200 hover:border-orange-300"
                  >
                    <img
                      src={p.imageUrl}
                      alt={p.name}
                      className="w-20 h-20 object-cover rounded-lg mb-2"
                    />
                    <div className="text-center w-full">
                      <h4 className="text-sm font-semibold text-gray-800 line-clamp-2">
                        {p.name}
                      </h4>
                      <p className="text-xs text-gray-500 my-1">
                        {p.category?.name}
                      </p>
                      <Tag color="blue">{p.price?.toLocaleString()} VND</Tag>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default FrequentCombos;
