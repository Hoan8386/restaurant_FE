import { UserOutlined } from "@ant-design/icons";
import { Table, Empty, Space, Tag } from "antd";

const TopCustomers = ({ customers }) => {
  const columns = [
    {
      title: "#",
      key: "index",
      render: (_, __, index) => index + 1,
      width: 50,
      align: "center",
    },
    {
      title: "Khách hàng",
      dataIndex: "username",
      key: "username",
      render: (text) => (
        <Space>
          <UserOutlined style={{ color: "#C8A97E" }} />
          <span style={{ fontWeight: 600, color: "#1a1a2e" }}>{text}</span>
        </Space>
      ),
    },
    {
      title: "Số đơn hàng",
      dataIndex: "totalOrders",
      key: "totalOrders",
      align: "right",
      render: (count) => (
        <Tag color="blue" style={{ fontSize: "12px", fontWeight: 600 }}>
          {count} đơn
        </Tag>
      ),
    },
  ];

  return (
    <div className="chart-container">
      <div className="chart-title">
        <UserOutlined style={{ marginRight: "8px", color: "#C8A97E" }} />
        Top Khách Hàng
      </div>
      {customers && customers.length > 0 ? (
        <Table
          columns={columns}
          dataSource={customers.map((item, idx) => ({ ...item, key: idx }))}
          pagination={false}
          size="small"
          bordered={false}
        />
      ) : (
        <Empty
          description="Chưa có dữ liệu"
          style={{ marginTop: "40px", marginBottom: "40px" }}
        />
      )}
    </div>
  );
};

export default TopCustomers;
