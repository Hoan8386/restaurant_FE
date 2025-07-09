import { use, useEffect, useState } from "react";
import Category from "../../components/Dish/Category";
import DishBanner from "../../components/Dish/DishBanner";
import { ListDish } from "../../components/Dish/ListDish";
import { fetchAllCategory, fetchAllDish } from "../../services/api.service";

const DishPage = () => {
    const [active, setActive] = useState(0);
    const [categories, setCategories] = useState([]);
    const [dishes, setDishes] = useState([]);
    const [type, setType] = useState(1);
    const [page, setPage] = useState(1)
    const [total, setTotal] = useState();
    const [size, setSize] = useState(6)

    const getDishes = async (page, size, type) => {
        try {
            const res = await fetchAllDish(page, size, type);
            if (res.data && res.data.result) {
                setDishes(res.data.result); // Lưu toàn bộ danh sách món ăn
                setPage(res.data.meta.page)
                setTotal(res.data.meta.total)
            }
        } catch (error) {
            console.error('Lỗi khi lấy danh sách món ăn:', error);
        }
    };


    useEffect(() => {
        const getCategories = async () => {
            try {
                const res = await fetchAllCategory();
                if (res.data) {
                    setCategories(res.data); // giữ nguyên object { id, name }
                }
            } catch (error) {
                console.error('Lỗi khi lấy danh sách danh mục:', error);
            }
        };
        getCategories();

    }, []);

    useEffect(() => {
        getDishes(page, size, type);
    }, [type, page]);
    return (
        <>
            <DishBanner />
            <Category
                active={active}
                setActive={setActive}
                categories={categories}
                setType={setType}
                setPage={setPage}
            />
            <ListDish
                dishes={dishes}
                setPage={setPage}
                page={page}
                total={total}
            />
        </>
    )
}

export default DishPage;