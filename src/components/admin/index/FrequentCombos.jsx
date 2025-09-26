import { useEffect, useState } from "react";
import { FireOutlined, PlusOutlined, MinusOutlined } from "@ant-design/icons";
import {
  fetchFrequentProductPairs,
  getImageUrl,
} from "../../../services/api.service";
import { Button } from "antd";

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
    <div className="bg-white rounded-2xl p-5 shadow-md mt-3">
      <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
        <FireOutlined /> Combo món thường đi cùng
      </h2>

      {/* Bộ điều khiển comboSize & limit */}
      <div className="flex flex-wrap gap-4 mb-6 items-center">
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-700">Combo size:</span>
          <Button
            icon={<MinusOutlined />}
            size="small"
            disabled={comboSize <= 2}
            onClick={() => setComboSize((prev) => Math.max(2, prev - 1))}
          />
          <span className="px-2">{comboSize}</span>
          <Button
            icon={<PlusOutlined />}
            size="small"
            onClick={() => setComboSize((prev) => prev + 1)}
          />
        </div>

        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-700">Số lượng combo:</span>
          <Button
            icon={<MinusOutlined />}
            size="small"
            disabled={limit <= 5}
            onClick={() => setLimit((prev) => Math.max(5, prev - 5))}
          />
          <span className="px-2">{limit}</span>
          <Button
            icon={<PlusOutlined />}
            size="small"
            onClick={() => setLimit((prev) => prev + 5)}
          />
        </div>
      </div>

      {/* Danh sách combos */}
      {combos.length === 0 ? (
        <p className="text-gray-500 text-sm">Không có dữ liệu combo.</p>
      ) : (
        <div className="space-y-6">
          {combos.map((combo, idx) => (
            <div
              key={idx}
              className="border rounded-xl p-4 hover:shadow-md transition-shadow duration-300"
            >
              {/* Tần suất */}
              <p className="text-sm text-gray-500 mb-3">
                Tần suất xuất hiện:{" "}
                <span className="font-semibold text-orange-600">
                  {combo.frequency} lần
                </span>
              </p>

              {/* Danh sách món trong combo */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {combo.products.map((p) => (
                  <div
                    key={p.id}
                    className="flex items-center gap-3 border rounded-lg p-2 hover:bg-gray-50"
                  >
                    <img
                      src={p.imageUrl}
                      alt={p.name}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                    <div>
                      <h4 className="text-sm font-semibold text-gray-800">
                        {p.name}
                      </h4>
                      <p className="text-xs text-gray-500">
                        {p.category?.name} • {p.price.toLocaleString()} VND
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FrequentCombos;
