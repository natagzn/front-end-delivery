import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchGoods } from "../../redux/actions/goodsAction";
import 'bootstrap/dist/css/bootstrap.min.css';
import {addOrder} from "../../redux/actions/orderActions";
import {jwtDecode} from "jwt-decode";

const GoodsUser = () => {
    const dispatch = useDispatch();
    const { goods } = useSelector((state) => state.goods);
    const [message, setMessage] = useState(""); // Додаємо стан для повідомлення

    const token = localStorage.getItem("token");
    const userId = jwtDecode(token)?.sub || null;


    useEffect(() => {
        dispatch(fetchGoods());
    }, [dispatch]);


    const handleOrder = (goodsID) => {
        if (!userId) {
            console.error("User ID is missing. Cannot create an order.");
            return;
        }

        const orderData = {
            user_id: userId,
            goods_id: goodsID
        };

        console.log("Creating order with data:", orderData);

        dispatch(addOrder(orderData))
            .then(() => {
                dispatch(fetchGoods()); // Оновлюємо список товарів
                setMessage("Замовлення успішно створено! ✅"); // Встановлюємо повідомлення
                setTimeout(() => setMessage(""), 3000); // Прибираємо через 3 секунди
            })
            .catch((error) => {
                console.error("Помилка створення замовлення:", error);
                setMessage("Помилка створення замовлення ❌");
                setTimeout(() => setMessage(""), 3000);
            });
    };

    return (
        <div className="container">
            <h2 className="text-center my-4">Товари</h2>

            {/* Блок для повідомлення */}
            {message && <div className="alert alert-success text-center">{message}</div>}

            <div className="row">
                {goods.length > 0 ? (
                    goods.map((item) => (
                        <div key={item._id} className="col-md-4 mb-4">
                            <div className="card shadow-sm">
                                <div className="card-body">
                                    <h5 className="card-title">{item.name}</h5>
                                    <p className="card-text">Ціна: {item.price} грн</p>
                                    <p className="card-text">Кількість: {item.count}</p>
                                    <button
                                        className="btn btn-primary"
                                        onClick={() => handleOrder(item._id)}
                                    >
                                        Замовити
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-center">Товарів немає</p>
                )}
            </div>
        </div>
    );
};

export default GoodsUser;
