// import axios from "axios";
import { Avatar } from 'antd';
import axios from './axios.customize';

const createUserApi = (username, password, email) => {

    const URL_BACKEND = "/api/v1/auth/register";
    const data = {
        username: username,
        password: password,
        email: email,
    }
    return axios.post(URL_BACKEND, data)
}

const updateUserApi = (id, username, gender, phone, address) => {
    const URL_BACKEND = "/users";
    const data = {
        id: id,
        username: username,
        gender: gender,
        phone: phone,
        address: address
    };

    return axios.put(URL_BACKEND, data);
};
const fetchAllUserAPI = (current, pageSize) => {
    const URL_BACKEND = `/api/v1/user?current=${current}&pageSize=${pageSize}`;
    return axios.get(URL_BACKEND)
}

const deleteUserAPI = (id) => {
    const URL_BACKEND = `/api/v1/user/${id}`;//backtick
    return axios.delete(URL_BACKEND);
}

const handleUploadFile = (file) => {

    const URL_BACKEND = "/files";
    let config = {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    }

    const bodyFormData = new FormData();
    bodyFormData.append("files", file); // key phải là 'file', đúng với @RequestParam("file")
    return axios.post(URL_BACKEND, bodyFormData, config);
}



const updateUserAvatarApi = (avatar, _id, fullName, phone) => {

    const URL_BACKEND = "/api/v1/user";
    const data = {
        _id: _id,
        avatar: avatar,
        fullName: fullName,
        phone: phone,
    }
    return axios.put(URL_BACKEND, data)
}

const registerUserApi = (fullName, email, password, phone) => {

    const URL_BACKEND = "/api/v1/user/register";
    const data = {
        fullName: fullName,
        email: email,
        password: password,
        phone: phone,
    }
    return axios.post(URL_BACKEND, data)
}


const loginApi = (username, password) => {

    const URL_BACKEND = "/api/v1/auth/login";
    const data = {
        username: username,
        password: password,

    }
    return axios.post(URL_BACKEND, data)
}


const getAccountAPI = () => {
    const URL_BACKEND = "/api/v1/auth/account";
    return axios.get(URL_BACKEND);
}

const logoutAPI = () => {
    const URL_BACKEND = "/api/v1/auth/logout";
    return axios.post(URL_BACKEND);
}

const fetchAllCategory = () => {
    const URL_BACKEND = "/category";
    return axios.get(URL_BACKEND)
}


const fetchAllDish = (page, size, type) => {

    const URL_BACKEND = type == 1 ? `/dish?page=${page}&size=${size}` : `/dish?page=${page}&size=${size}?&filter=category.id~'${type}'`;
    return axios.get(URL_BACKEND)
}

const fetchAllDishByName = (page, size, Name) => {

    const url = `/dish?page=${page}&size=${size}&filter=name~'${Name}'`;
    return axios.get(url);
}

const adDishInCart = (quantity, price, total, DishID) => {
    const URL_BACKEND = "/cart/add-dish";
    const data = {
        quantity: quantity,
        price: price,
        total: total,
        dish: {
            id: DishID
        }

    }
    return axios.post(URL_BACKEND, data)
}


const getCart = () => {
    const URL_BACKEND = "/cart";
    return axios.get(URL_BACKEND)
}

const getAllDishInCart = () => {
    const URL_BACKEND = "/cart/get-all-dish";
    return axios.get(URL_BACKEND)
}

const updateQuantity = (id, quantity) => {
    const URL_BACKEND = "/cart/update-dish";
    const data = {
        id: id,
        quantity: quantity,
    }
    return axios.put(URL_BACKEND, data)
}

const deleteDishInCart = (id) => {
    const URL_BACKEND = `cart/delete-dish/${id}`;
    return axios.delete(URL_BACKEND)
}

const checkOutCart = (receiverName, receiverPhone, receiverAddress, receiverEmail ,paymentMethod) => {
    const URL_BACKEND = "/cart/checkout";
    const data = {
        receiverName: receiverName,
        receiverPhone: receiverPhone,
        receiverAddress: receiverAddress,
        receiverEmail: receiverEmail,
        paymentMethod:paymentMethod
    }
    return axios.post(URL_BACKEND, data)
}


const fetchMyOrder = () => {
    const URL_BACKEND = "/orders/my";
    return axios.get(URL_BACKEND)
}


const fetchAllOrders = (page, size) => {

    const URL_BACKEND = `/orders/all?page=${page}&size=${size}`;
    return axios.get(URL_BACKEND)
}

const fetchAllOrdersMy = (page, size) => {

    const URL_BACKEND = `/orders/my?page=${page}&size=${size}`;
    return axios.get(URL_BACKEND)
}

const updateOrder = async (id, status) => {
    // debugger
    const URL_BACKEND = `/orders/status/${id}`;
    const formData = new FormData();
    formData.append("status", status);

    let config = {
        headers: {
            "Content-Type": "form-data"
        }
    }


    return axios.put(URL_BACKEND, formData, config);
};


const updateDish = async (dishData) => {
    debugger
    const URL_BACKEND = "/dish";
    console.log("check id ", dishData.name)
    const data = {
        id: dishData.id,
        name: dishData.name,
        description: dishData.description,
        price: dishData.price,
        imageUrl: dishData.imageUrl,
        category: {
            id: dishData.categoryId
        }

    }
    return axios.put(URL_BACKEND, data);
};


const deleteDish = (id) => {
    const URL_BACKEND = `/dish/${id}`;
    return axios.delete(URL_BACKEND)
}

const addDish = (dishData) => {
    const URL_BACKEND = "/dish";
    console.log("check id ", dishData.name)
    const data = {
        name: dishData.name,
        description: dishData.description,
        price: dishData.price,
        imageUrl: dishData.image,
        category: {
            id: dishData.categoryId
        }

    }
    return axios.post(URL_BACKEND, data);
}

const getImageUrl = async (fileName) => {
    try {
        const res = await axios.get(`http://localhost:8080/pre-signed-url/${fileName}`);
        return res.data; // Trả về URL thực tế
    } catch (error) {
        console.error("Lỗi khi lấy URL ảnh:", error);
        return ""; // Trả về chuỗi rỗng nếu lỗi
    }
};



const fetchAllUser = (page, size) => {
    const URL_BACKEND = `/users?page=${page}&size=${size}`;
    return axios.get(URL_BACKEND)
}

const fetchAllOrderById = (page, size, id) => {
    const url = `/orders/all?page=${page}&size=${size}?&filter=category.id~'${type}'`;
    return axios.get(url);
}


const fetchBestSeller = () => {
    const URL_BACKEND = "/dish/bestSeller";
    return axios.get(URL_BACKEND)
}

const fetchDishAlsoBought = (id) => {
    const URL_BACKEND = `/dish/alsoBought/${id}`;
    return axios.get(URL_BACKEND)
}

const fetchCollaborative = () => {
    const URL_BACKEND = "/dish/collaborative";
    return axios.get(URL_BACKEND)
}


// ======= Dashboard API =======

// 1. Lấy tổng quan dashboard
const fetchDashboardSummary = () => {
    const URL_BACKEND = "/neo4j/dashboard/summary";
    return axios.get(URL_BACKEND);
}

// 2. Thống kê số lượng order theo tháng
const fetchOrdersByMonth = () => {
    const URL_BACKEND = "/neo4j/dashboard/orders/monthly";
    return axios.get(URL_BACKEND);
}

// 3. Top khách hàng đặt nhiều đơn nhất
const fetchTopCustomers = () => {
    const URL_BACKEND = "/neo4j/dashboard/customers/top";
    return axios.get(URL_BACKEND);
}

// 4. Lấy các combo món
const fetchFrequentProductPairs = (comboSize = 3, limit = 10) => {
    const URL_BACKEND = `/neo4j/dashboard/products/frequent-pairs?comboSize=${comboSize}&limit=${limit}`;
    return axios.get(URL_BACKEND);
}

// 5. Chuỗi mua hàng (purchase sequence)
const fetchPurchaseSequences = () => {
    const URL_BACKEND = "/neo4j/dashboard/patterns/sequence";
    return axios.get(URL_BACKEND);
}

// 6. Doanh thu theo Category
const fetchSalesByCategory = () => {
    const URL_BACKEND = "/neo4j/dashboard/categories/sales";
    return axios.get(URL_BACKEND);
}

// 7. Doanh thu theo tháng
const fetchMonthlyRevenue = () => {
    const URL_BACKEND = "/neo4j/dashboard/revenue/monthly";
    return axios.get(URL_BACKEND);
}

// 8. Top món bán chạy nhất theo tháng
const fetchTopSellingDishPerMonth = () => {
    const URL_BACKEND = "/neo4j/dashboard/top-dish/monthly";
    return axios.get(URL_BACKEND);
}

// 9. Món hot - tăng trưởng cao nhất trong tháng hiện tại
const fetchHotDishes = () => {
    const URL_BACKEND = "/neo4j/dashboard/dishes/hot";
    return axios.get(URL_BACKEND);
}

// 10. Dự đoán món hot tháng này
const fetchPredictedHotDishes = () => {
    const URL_BACKEND = "/neo4j/dashboard/dishes/predicted-hot-this-month";
    return axios.get(URL_BACKEND);
}


export {
    createUserApi, fetchAllUserAPI, updateUserApi,
    deleteUserAPI, handleUploadFile, updateUserAvatarApi,
    registerUserApi, loginApi, getAccountAPI, logoutAPI,
    fetchAllCategory, fetchAllDish, adDishInCart, getCart, getAllDishInCart,
    updateQuantity, deleteDishInCart, checkOutCart, fetchMyOrder, updateDish, deleteDish,
    fetchAllDishByName, addDish, fetchAllOrders, updateOrder, getImageUrl, fetchAllUser,
    fetchAllOrdersMy , fetchBestSeller,fetchDishAlsoBought,fetchCollaborative,
     fetchDashboardSummary,
    fetchOrdersByMonth,
    fetchTopCustomers,
    fetchFrequentProductPairs,
    fetchPurchaseSequences,
    fetchSalesByCategory,
    fetchMonthlyRevenue,
    fetchTopSellingDishPerMonth,
    fetchHotDishes,
    fetchPredictedHotDishes
} 