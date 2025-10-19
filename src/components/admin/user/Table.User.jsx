import React, { useEffect, useState } from "react";
import { Table, Button, Modal, Input, Select, Tag } from "antd";
import Notification from "../../noti/Notification";
import { fetchAllUser } from "../../../services/api.service";

const { Option } = Select;

const UserTable = () => {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(8);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  // State cho modal
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [gender, setGender] = useState("");
  const [address, setAddress] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");

  const addNotification = (message, description, type) => {
    Notification({ message, description, type });
  };

  const getUsers = async (page, size) => {
    try {
      setLoading(true);
      const res = await fetchAllUser(page, size);
      setUsers(res.data.result);
      setTotal(res.data.meta.total);
    } catch (error) {
      addNotification("Lỗi", "Không thể tải danh sách người dùng", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUsers(page, size);
  }, [page, size]);

  const handleView = (user) => {
    setSelectedUser(user);
    setUserName(user.name || "");
    setEmail(user.email || "");
    setPhone(user.phone || "");
    setGender(user.gender || "");
    setAddress(user.address || "");
    setAvatarUrl(user.avatar || "");
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleSubmit = async () => {
    // Gửi API cập nhật nếu có
    console.log("Thông tin cần cập nhật:", {
      userName,
      email,
      phone,
      gender,
      address,
    });
    addNotification(
      "Thành công",
      "Đã cập nhật thông tin người dùng",
      "success"
    );
    setIsModalVisible(false);
    getUsers(page, size);
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      width: 80,
      render: (text) => <Tag color="blue">#{text}</Tag>,
    },
    {
      title: "Tên Người Dùng",
      dataIndex: "name",
      key: "name",
      render: (text) => (
        <span style={{ fontWeight: 600, color: "#1a1a2e" }}>{text}</span>
      ),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Giới Tính",
      dataIndex: "gender",
      key: "gender",
      render: (text) => (
        <Tag
          color={text === "Nam" ? "blue" : text === "Nữ" ? "red" : "default"}
        >
          {text || "N/A"}
        </Tag>
      ),
    },
    {
      title: "Địa Chỉ",
      dataIndex: "address",
      key: "address",
      ellipsis: true,
    },
    {
      title: "Hành Động",
      key: "action",
      width: 100,
      align: "center",
      render: (_, record) => (
        <Button
          onClick={() => handleView(record)}
          type="primary"
          size="small"
          style={{
            background: "linear-gradient(135deg, #C8A97E 0%, #b8956f 100%)",
            borderColor: "transparent",
          }}
        >
          Xem Chi Tiết
        </Button>
      ),
    },
  ];

  return (
    <>
      <div className="admin-page-header">
        <h1>Quản Lý Người Dùng</h1>
        <p>Tổng số người dùng: {total}</p>
      </div>

      <div style={{ marginBottom: "2rem" }}>
        <Table
          columns={columns}
          dataSource={users}
          rowKey="id"
          loading={loading}
          pagination={{
            current: page,
            pageSize: size,
            total,
            onChange: (p, s) => {
              setPage(p);
              setSize(s);
            },
          }}
        />
      </div>

      <Modal
        title="Chi Tiết Người Dùng"
        open={isModalVisible}
        onCancel={handleCancel}
        onOk={handleSubmit}
        okText="Cập Nhật"
        cancelText="Đóng"
        width={600}
      >
        {selectedUser && (
          <div>
            <div style={{ textAlign: "center", marginBottom: 20 }}>
              <img
                src={avatarUrl || "https://via.placeholder.com/100"}
                alt="Avatar"
                width={100}
                height={100}
                style={{ borderRadius: "50%", objectFit: "cover" }}
              />
            </div>
            <Input
              style={{ marginBottom: 10 }}
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              placeholder="Tên người dùng"
            />
            <Input
              style={{ marginBottom: 10 }}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
            />
            <Input
              style={{ marginBottom: 10 }}
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Số điện thoại"
            />
            <Select
              value={gender}
              onChange={(value) => setGender(value)}
              style={{ width: "100%", marginBottom: 10 }}
              placeholder="Giới tính"
            >
              <Option value="MALE">Nam</Option>
              <Option value="FEMALE">Nữ</Option>
            </Select>
            <Input
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Địa chỉ"
            />
          </div>
        )}
      </Modal>
    </>
  );
};

export default UserTable;
