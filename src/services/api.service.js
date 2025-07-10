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

const handleUploadFile = (file, folder) => {
    const URL_BACKEND = "/api/v1/file/upload";
    let config = {
        headers: {
            "upload-type": folder,
            "Content-Type": "multipart/form-data"
        }
    }

    const bodyFormData = new FormData();
    bodyFormData.append("fileImg", file)
    return axios.post(URL_BACKEND, bodyFormData, config)
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

const deleteDish = (id) => {


    const URL_BACKEND = `cart/delete-dish/${id}`;
    return axios.delete(URL_BACKEND)
}

const checkOutCart = (receiverName, receiverPhone, receiverAddress, receiverEmail) => {
    const URL_BACKEND = "/cart/checkout";
    const data = {
        receiverName: receiverName,
        receiverPhone: receiverPhone,
        receiverAddress: receiverAddress,
        receiverEmail: receiverEmail
    }
    return axios.post(URL_BACKEND, data)
}


const fetchAllOrder = () => {
    const URL_BACKEND = "/orders/my";
    return axios.get(URL_BACKEND)
}


export {
    createUserApi, fetchAllUserAPI, updateUserApi,
    deleteUserAPI, handleUploadFile, updateUserAvatarApi,
    registerUserApi, loginApi, getAccountAPI, logoutAPI,
    fetchAllCategory, fetchAllDish, adDishInCart, getCart, getAllDishInCart,
    updateQuantity, deleteDish, checkOutCart, fetchAllOrder
} 