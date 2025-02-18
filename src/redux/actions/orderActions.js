import axios from "axios";

export const FETCH_ORDERS_SUCCESS = 'FETCH_ORDERS_SUCCESS';
export const ADD_ORDER_SUCCESS = 'ADD_ORDER_SUCCESS';
export const UPDATE_ORDER_SUCCESS = 'UPDATE_ORDER_SUCCESS';
export const DELETE_ORDER_SUCCESS = 'DELETE_ORDER_SUCCESS';
export const ORDER_ERROR = 'ORDER_ERROR';

const API_URL = "http://localhost:4000/order";

const getToken = () => {
    const token = localStorage.getItem("token");
    return token ? token : null;
};

export const fetchOrders = () => async (dispatch) => {
    try {
        const token = getToken();
        console.log("🔄 Отримання всіх замовлень...");

        // Отримуємо список замовлень
        const response = await axios.get(`${API_URL}/all`, {
            headers: { Authorization: `Bearer ${token}` },
        });

        console.log("✅ Отримано замовлення:", response.data);

        // Запускаємо всі запити паралельно
        const orders = await Promise.all(response.data.map(async (order) => {
            try {
                console.log(`🔍 Обробка замовлення ID: ${order._id}`);

                // Отримання користувача
                const userPromise = axios.get(`http://localhost:4000/user/user/${order.user_id}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });

                // Отримання статусу замовлення
                const statusPromise = axios.get(`http://localhost:4000/status-order/statusOrder/${order.status_id}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });

                // Отримання інформації про товар (тільки назва)
                const goodsPromise = axios.get(`http://localhost:4000/goods/${order.goods_id}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });

                // Чекаємо виконання всіх трьох запитів
                const [userResponse, statusResponse, goodsResponse] = await Promise.all([
                    userPromise,
                    statusPromise,
                    goodsPromise
                ]);

                console.log(`✅ Дані для замовлення ID: ${order._id} отримані`);

                return {
                    ...order,
                    userName: userResponse.data.first_name,
                    userLastName: userResponse.data.last_name,
                    userEmail: userResponse.data.email,
                    status: statusResponse.data.name,
                    goodsName: goodsResponse.data.name // Беремо тільки назву товару
                };
            } catch (innerError) {
                console.error(`❌ Помилка при обробці замовлення ID: ${order._id}`, innerError);
                return { ...order, user: null, statusOrder: null, goodsName: null };
            }
        }));

        console.log("✅ Фінальний список замовлень:", orders);

        dispatch({ type: FETCH_ORDERS_SUCCESS, payload: orders });
    } catch (error) {
        console.error('❌ Глобальна помилка отримання замовлень:', error);
        dispatch({ type: ORDER_ERROR, payload: error.message });
    }
};

export const updateOrderStatus = (orderId, statusId) => async (dispatch) => {
    try {
        const response = await axios.put(`${API_URL}/update?orderID=${orderId}`, { status_id: statusId });

        dispatch({
            type: 'UPDATE_ORDER_SUCCESS',
            payload: response.data.order, // Отриманий оновлений об'єкт замовлення
        });
        console.log("update order  -   ",response.data.order)
    } catch (error) {
        dispatch({
            type: 'UPDATE_ORDER_ERROR',
            payload: error.response?.data?.message || error.message,
        });
    }
};


export const addOrder = (orderData) => async (dispatch) => {
    try {
        const token = getToken();
        const response = await axios.post(`${API_URL}/create`, orderData, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });
        dispatch({ type: ADD_ORDER_SUCCESS, payload: response.data.order });
    } catch (error) {
        console.error("Error adding order:", error);
        dispatch({ type: ORDER_ERROR, payload: error.message });
    }
};

export const updateOrder = (orderID, orderData) => async (dispatch) => {
    try {
        const token = getToken();
        const response = await axios.put(`${API_URL}/update?orderID=${orderID}`, orderData, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });
        dispatch({ type: UPDATE_ORDER_SUCCESS, payload: response.data.order });
    } catch (error) {
        console.error("Error updating order:", error);
        dispatch({ type: ORDER_ERROR, payload: error.message });
    }
};

export const deleteOrder = (orderID) => async (dispatch) => {
    try {
        const token = getToken();
        await axios.delete(`${API_URL}/delete?orderID=${orderID}`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        dispatch({ type: DELETE_ORDER_SUCCESS, payload: orderID });
    } catch (error) {
        console.error("Error deleting order:", error);
        dispatch({ type: ORDER_ERROR, payload: error.message });
    }
};