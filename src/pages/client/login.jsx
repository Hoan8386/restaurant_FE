import React, { useContext, useState } from 'react';
import { Input, Button, Checkbox } from 'antd';
import { MailOutlined, LockOutlined } from '@ant-design/icons';
import bg from '../../assets/img/bg_3.jpg.webp';

import { Link, Navigate, useNavigate } from 'react-router-dom';
import { loginApi } from '../../services/api.service';
import Notification from '../../components/noti/Notification';
import { AuthContext } from '../../components/context/auth.context';

const LoginPage = () => {

    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState('');
    const [password, setPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [remember, setRemember] = useState(true);
    const navigate = useNavigate();
    const { user, setUser } = useContext(AuthContext);

    const [notifications, setNotifications] = useState([]);
    const addNotification = (message, description, type) => {
        const id = Date.now();
        const newNotif = { id, message, description, type };
        setNotifications((prev) => [...prev, newNotif]);


    };


    const handleSubmit = async (e) => {
        e.preventDefault();

        let valid = true;

        if (!email) {
            setEmailError('Vui lòng nhập email!');
            valid = false;
        } else {
            setEmailError('');
        }

        if (!password) {
            setPasswordError('Vui lòng nhập mật khẩu!');
            valid = false;
        } else {
            setPasswordError('');
        }

        if (!valid) return;

        try {
            const res = await loginApi(email, password);
            debugger
            if (res?.data) {
                const { access_token, user } = res.data;

                localStorage.setItem("access_token", access_token);
                setUser(user);
                addNotification("Login success", "Đăng nhập thành công", "success");

                // ✅ Điều hướng theo role
                const role = user.role.name;
                if (role === "SUPER_ADMIN") {
                    navigate("/admin");
                } else if (role === "STAFF") {
                    navigate("/staff");
                } else {
                    navigate("/");
                }

            } else {
                addNotification("Error login", "Không thể đăng nhập. Vui lòng thử lại.", "error");
            }
        } catch (error) {
            console.error("Login error:", error);
            if (error.response?.status === 400 || error.response?.status === 401) {
                addNotification("Sai thông tin", "Email hoặc mật khẩu không đúng!", "error");
            } else {
                addNotification("Lỗi hệ thống", "Vui lòng thử lại sau!", "error");
            }
        }
    };

    const handleClickLoginGoogle = () => {

    }
    return (
        <div
            className="w-screen h-screen bg-cover bg-center bg-no-repeat flex items-center justify-center"
            style={{ backgroundImage: `url('${bg}')` }}
        >
            <div
                className="w-[850px] h-[460px] rounded-2xl shadow-lg flex items-center justify-center"
                style={{
                    background: 'transparent',
                    backdropFilter: 'blur(55px)',
                }}
            >
                <div className="w-1/2 h-full px-10 py-8 flex flex-col justify-center rounded-l-2xl " style={{
                    padding: "40px"
                }}>
                    <h1 className="text-xl font-bold text-white text-center mb-8">Login</h1>

                    {/* Block: Email */}
                    <div className="mb-4 relative">
                        <label className="block mb-1 font-medium text-white">Email</label>
                        <Input
                            size="large"
                            prefix={<MailOutlined className="text-gray-400" />}
                            placeholder="Nhập email của bạn"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            status={emailError ? 'error' : ''}
                        />
                        {emailError && (
                            <p className="absolute text-red-500 text-sm top-full left-0 mt-1">
                                {emailError}
                            </p>
                        )}
                    </div>

                    {/* Block: Mật khẩu */}
                    <div className="mb-2 relative">
                        <label className="block mb-1 font-medium text-white">Mật khẩu</label>
                        <Input.Password
                            size="large"
                            prefix={<LockOutlined className="text-gray-400" />}
                            placeholder="Nhập mật khẩu"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            status={passwordError ? 'error' : ''}
                        />
                        <p className="mt-1 text-red-500 text-sm min-h-[1.25rem]">
                            {passwordError || '\u00A0'}
                        </p>
                    </div>

                    {/* Block: Ghi nhớ và Quên mật khẩu */}
                    <div className="flex justify-between items-center mb-3 " >
                        <Checkbox className="text-white" checked={remember} onChange={(e) => setRemember(e.target.checked)}>
                            Ghi nhớ
                        </Checkbox>
                        <a href="#" className="text-sm text-white hover:text-[#C8A97E] transition">
                            Quên mật khẩu?
                        </a>
                    </div>

                    {/* Block: Nút đăng nhập */}
                    <Button
                        type="primary"
                        size="large"
                        className="btn"
                        onClick={handleSubmit} // Gọi hàm thủ công
                    >
                        Đăng nhập
                    </Button>

                    {/* Block: Link đăng ký */}
                    <div className="text-center text-sm text-white mt-4">
                        <p>
                            Chưa có tài khoản?{' '}
                            <Link to="/register" className=" primary-color font-medium hover:underline text-white">
                                Đăng ký ngay
                            </Link>
                        </p>
                    </div>

                    <a href="http://localhost:8080/oauth2/authorization/google">Login with Google</a>
                    <Button onClick={handleClickLoginGoogle}>
                        Login with google
                    </Button>
                </div>

                {/* Cột phải giữ nguyên */}
                <div
                    className="w-1/2 h-full  flex flex-col justify-center items-center "
                    style={{
                        background: 'white',
                        clipPath: 'polygon(5% 0, 100% 0, 100% 100%, 40% 100%)',
                        borderRadius: '20px',
                    }}
                >
                    <p
                        className="text-[80px]  text-[#C8A97E] font-primary leading-none mb-0"
                        style={{
                            paddingLeft: '70px',
                        }}
                    >
                        Feliciano
                    </p>
                    <div
                        className="w-full "
                        style={{
                            paddingRight: '60px',
                        }}
                    >
                        <p
                            className="text-black  text-md text-end"
                            style={{
                                marginTop: '10px',
                                fontSize: '26px',
                                lineHeight: '24px',
                                letterSpacing: '1px',
                                fontStyle: 'italic',
                                marginBottom: "0",
                                fontWeight: "300"
                            }}
                        >
                            Restaurant
                        </p>
                    </div>

                    <div
                        className="w-full "
                        style={{
                            paddingRight: '60px',
                            fontStyle: 'italic',
                        }}
                    >
                        <p className=" text-black text-end"
                            style={{
                                marginTop: '10px',
                                fontSize: '22px',
                                lineHeight: '24px',
                                letterSpacing: '1px',
                                fontStyle: 'italic',
                                marginBottom: "0",
                                fontWeight: "300"
                            }}>Best choice for you!</p>
                    </div>
                </div>
            </div>

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
        </div>
    );
};

export default LoginPage;
