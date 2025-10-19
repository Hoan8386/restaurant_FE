import {
  RiseOutlined,
  ShoppingOutlined,
  LineChartOutlined,
} from "@ant-design/icons";

const DashboardCards = ({ summary }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      {/* Total Orders Card */}
      <div className="dashboard-card">
        <div className="flex items-center justify-between mb-4">
          <div className="flex-1">
            <p className="card-title">Tổng Đơn Hàng</p>
            <p className="card-value">{summary.orders}</p>
            <p className="card-footer">📊 Cập nhật mới nhất</p>
          </div>
          <div className="card-icon orange">
            <RiseOutlined />
          </div>
        </div>
      </div>

      {/* Total Customers Card */}
      <div className="dashboard-card">
        <div className="flex items-center justify-between mb-4">
          <div className="flex-1">
            <p className="card-title">Khách Hàng</p>
            <p className="card-value">{summary.users}</p>
            <p className="card-footer">👥 Cập nhật mới nhất</p>
          </div>
          <div className="card-icon pink">
            <ShoppingOutlined />
          </div>
        </div>
      </div>

      {/* Revenue Card */}
      <div className="dashboard-card">
        <div className="flex items-center justify-between mb-4">
          <div className="flex-1">
            <p className="card-title">Doanh Thu</p>
            <p className="card-value">
              {(summary.revenue || 0).toLocaleString("vi-VN")}
            </p>
            <p className="card-footer">💰 VND</p>
          </div>
          <div className="card-icon green">
            <LineChartOutlined />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardCards;
