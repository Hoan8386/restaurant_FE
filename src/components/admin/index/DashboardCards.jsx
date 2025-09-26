import {
  RiseOutlined,
  ShoppingOutlined,
  LineChartOutlined,
} from "@ant-design/icons";

const DashboardCards = ({ summary }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
      {/* Card 1 */}
      <div className="bg-white rounded-2xl p-3 shadow-md hover:shadow-lg transition-shadow duration-300">
        <div className="flex items-center space-x-6">
          <div className="bg-orange-100 text-orange-500 p-3 rounded-full">
            <RiseOutlined className="text-2xl" />
          </div>
          <div>
            <h3 className="text-gray-700 text-sm">Tổng đơn</h3>
            <h1 className="text-2xl font-bold text-gray-900">
              {summary.orders}
            </h1>
          </div>
        </div>
        <p className="text-sm text-gray-500 mt-4">Cập nhật mới nhất</p>
      </div>

      {/* Card 2 */}
      <div className="bg-white rounded-2xl p-3 shadow-md hover:shadow-lg transition-shadow duration-300">
        <div className="flex items-center space-x-6">
          <div className="bg-pink-100 text-pink-500 p-3 rounded-full">
            <ShoppingOutlined className="text-2xl" />
          </div>
          <div>
            <h3 className="text-gray-700 text-sm">Số khách hàng</h3>
            <h1 className="text-2xl font-bold text-gray-900">
              {summary.users}
            </h1>
          </div>
        </div>
        <p className="text-sm text-gray-500 mt-4">Cập nhật mới nhất</p>
      </div>

      {/* Card 3 */}
      <div className="bg-white rounded-2xl p-3 shadow-md hover:shadow-lg transition-shadow duration-300">
        <div className="flex items-center space-x-6">
          <div className="bg-green-100 text-green-500 p-3 rounded-full">
            <LineChartOutlined className="text-2xl" />
          </div>
          <div>
            <h3 className="text-gray-700 text-sm">Doanh thu</h3>
            <h1 className="text-2xl font-bold text-gray-900">
              {summary.revenue} vnd
            </h1>
          </div>
        </div>
        <p className="text-sm text-gray-500 mt-4">Cập nhật mới nhất</p>
      </div>
    </div>
  );
};

export default DashboardCards;
