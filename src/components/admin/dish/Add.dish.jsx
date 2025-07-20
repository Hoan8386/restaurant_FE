import { Button, Form, Input, Modal } from "antd";
import { useEffect, useState } from "react";
import { addDish, fetchAllCategory, handleUploadFile, updateDish } from "../../../services/api.service";
import Notification from "../../noti/Notification";

const AddDish = (props) => {
    const [form] = Form.useForm();
    const [categories, setCategories] = useState([]);
    const [previewImage, setPreviewImage] = useState(null);
    const { isCreate, setCreate } = props;

    const [notifications, setNotifications] = useState([]);


    const addNotification = (message, description, type) => {
        const id = Date.now();
        const newNotif = { id, message, description, type };
        setNotifications((prev) => [...prev, newNotif]);


    };
    useEffect(() => {
        const getCategories = async () => {
            try {
                const res = await fetchAllCategory();
                if (res.data) {
                    setCategories(res.data);
                }
            } catch (error) {
                console.error("Lỗi khi lấy danh sách danh mục:", error);
            }
        };
        getCategories();
    }, []);
    // const filteredCategories = categories.filter(cat => cat.name.toLowerCase() !== "all");

    // Hàm xử lý khi chọn và upload hình ảnh
    const handleImageUpload = async (file) => {
        const reader = new FileReader();
        reader.onload = () => {
            setPreviewImage(reader.result);
        };
        reader.readAsDataURL(file);

        debugger
        try {
            const uploadResponse = await handleUploadFile(file);
            console.log("Lỗi upload ảnh:", uploadResponse);

            const fileName = uploadResponse.data;

            form.setFieldsValue({ image: fileName });


        } catch (error) {
            console.error("Lỗi upload ảnh:", error);
            message.error("Upload ảnh thất bại!");
        }
    };

    const handleSave = async () => {
        debugger
        const dishValue = form.getFieldsValue();
        const res = await addDish(dishValue)
        if (res.data) {
            addNotification("Update user", "Thêm món ăn thành công", "success");
            form.resetFields();
        } else {
            addNotification("Error update", "Thêm món ăn thất bại", "error");

        }
        setCreate(false)

    }
    return (
        <>

            <Modal
                open={isCreate}
                onCancel={() => { setCreate(false) }}
                footer={null}
                width={1014}
                style={{ padding: "0", borderRadius: "40px" }}
                getContainer={false} // bạn vẫn giữ cái này
            >
                <div className="row">
                    {/* Ảnh xem trước */}
                    <div className="col-md-7">
                        <div
                            className="modal__img"
                            style={{
                                backgroundImage: `url(${previewImage})`,
                                width: "100%",
                                height: "100%",
                                backgroundSize: "cover",
                                backgroundPosition: "center",
                                padding: "0 0",
                                minHeight: "400px",
                            }}
                        />

                    </div>

                    {/* Form cập nhật thông tin */}
                    <div className="col-md-5" style={{ paddingRight: "36px", paddingTop: "20px" }}>
                        <Form
                            form={form}
                            layout="vertical"
                            onFinish={handleSave}
                        >
                            <div className="row">


                                {/* Tên món */}
                                <div className="col-12">
                                    <Form.Item
                                        name="name"
                                        label={<span style={{ fontWeight: 600, fontSize: 18 }}>Tên món</span>}
                                        rules={[{ required: true, message: "Vui lòng nhập tên món!" }]}
                                    >
                                        <Input style={{ fontSize: 16 }} />
                                    </Form.Item>
                                </div>

                                {/* Danh mục */}

                                <div className="col-12" style={
                                    { marginBottom: "24px" }
                                }>
                                    {/* Trường ẩn để Form ghi nhận giá trị categoryId */}
                                    <Form.Item name="categoryId" hidden>
                                        <input type="hidden" />
                                    </Form.Item>


                                    <span style={{ fontWeight: 600, fontSize: 18, paddingBottom: "8px", display: "block" }}>Loại món</span>
                                    <select
                                        style={{
                                            width: '100%',
                                            fontSize: 16,
                                            padding: '4px 8px',
                                            borderRadius: 4,
                                            border: '1px solid #d9d9d9',
                                        }}
                                        defaultValue={form.getFieldValue('categoryId') || ''}
                                        onChange={(e) => form.setFieldsValue({ categoryId: parseInt(e.target.value) })}
                                    >
                                        {categories.map((category) => (
                                            <option key={category.id} value={category.id}>
                                                {category.name}
                                            </option>
                                        ))}
                                    </select>


                                </div>
                                {/* Mô tả */}
                                <div className="col-12">
                                    <Form.Item
                                        name="description"
                                        label={<span style={{ fontWeight: 600, fontSize: 18 }}>Mô tả</span>}
                                        rules={[{ required: true, message: "Vui lòng nhập mô tả!" }]}
                                    >
                                        <Input.TextArea rows={3} style={{ fontSize: 16 }} />
                                    </Form.Item>
                                </div>

                                {/* Giá */}
                                <div className="col-12">
                                    <Form.Item
                                        name="price"
                                        label={<span style={{ fontWeight: 600, fontSize: 18 }}>Giá</span>}
                                        rules={[{ required: true, message: "Vui lòng nhập giá!" }]}
                                    >
                                        <Input type="number" min={0} style={{ fontSize: 16 }} />
                                    </Form.Item>
                                </div>

                                {/* Upload ảnh */}
                                <div className="col-12">
                                    <Form.Item
                                        label={<span style={{ fontWeight: 600, fontSize: 18 }}>Ảnh món ăn</span>}
                                        name="image"
                                        valuePropName="file"
                                        getValueFromEvent={(e) => e.target.files[0]}
                                    >
                                        <Input
                                            type="file"
                                            accept="image/*"
                                            onChange={(e) => {
                                                const file = e.target.files[0];
                                                if (file) {
                                                    handleImageUpload(file); // gọi hàm xử lý upload
                                                }
                                            }}
                                        />
                                    </Form.Item>
                                </div>

                                {/* Nút cập nhật */}
                                <div className="col-12 mb-2">
                                    <Button
                                        type="primary"
                                        htmlType="submit"
                                        style={{ width: "100%", padding: "10px 0", fontSize: 16 }}
                                    >
                                        Add New Dish
                                    </Button>
                                </div>
                            </div>
                        </Form>
                    </div>
                </div>
            </Modal>

            {/* Hiển thị thông báo */}
            <div className="fixed top-4 right-4 z-[9999]">
                {notifications.map((notif) => (
                    <Notification
                        key={notif.id}
                        message={notif.error}
                        description={notif.description}
                        type={notif.type}
                        onClose={() => {
                            setNotifications((prev) =>
                                prev.filter((item) => item.id !== notif.id)
                            );
                        }}
                    />
                ))}
            </div>
        </>
    );
}

export default AddDish