import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrders } from "../../redux/actions/orderActions";
import { fetchDeliveries } from "../../redux/actions/deliveryActions";
import { jwtDecode } from "jwt-decode";
import "bootstrap/dist/css/bootstrap.min.css";

const OrdersUser = () => {
    const dispatch = useDispatch();
    const { orders } = useSelector((state) => state.orders);
    //const { deliveries } = useSelector((state) => state.deliveries);
    const deliveries = useSelector((state) => state.delivery.deliveries || []);


    const token = localStorage.getItem("token");
    const userId = jwtDecode(token)?.sub || null;

    useEffect(() => {
        if (userId) {
            dispatch(fetchOrders());
            dispatch(fetchDeliveries());
        }
    }, [dispatch, userId]);

    const userOrders = orders.map(order => {
        const delivery = deliveries.find(delivery => delivery.order_id === order._id);
        return {
            ...order,
            deliveryStatus: delivery ? delivery.status : "Не відомо",
            deliveryStatusDate: delivery ? (delivery.departure_date ? delivery.departure_date  : "Не відомо" )  : "Не відомо"
        };
    }).filter(order => order.user_id === userId);

    return (
        <div className="container">
            <h2 className="text-center my-4">Мої замовлення</h2>
            {userOrders.length > 0 ? (
                <div className="row">
                    {userOrders.map((order) => (
                        <div key={order._id} className="col-md-6 mb-4">
                            <div className="card shadow-sm">
                                <div className="card-body">
                                    <h5 className="card-title">Товар: {order.goodsName}</h5>
                                    <p className="card-text">Статус замовлення: {order.status}</p>
                                    <p className="card-text">Статус доставки: {order.deliveryStatus}</p>
                                    <p className="card-text">Дата оновлення: {order.deliveryStatusDate == "Не відомо"? "Не відомо" : new Date(order.deliveryStatusDate).toLocaleString() }</p>
                                    <p className="card-text">Дата створення: {new Date(order.created_at).toLocaleString()}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-center">У вас немає замовлень.</p>
            )}
        </div>
    );
};

export default OrdersUser;
