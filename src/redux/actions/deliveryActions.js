import axios from "axios";

export const FETCH_DELIVERIES_SUCCESS = 'FETCH_DELIVERIES_SUCCESS';
export const ADD_DELIVERY_SUCCESS = 'ADD_DELIVERY_SUCCESS';
export const UPDATE_DELIVERY_SUCCESS = 'UPDATE_DELIVERY_SUCCESS';
export const DELETE_DELIVERY_SUCCESS = 'DELETE_DELIVERY_SUCCESS';
export const DELIVERY_ERROR = 'DELIVERY_ERROR';

const API_URL = "http://localhost:4000/delivery";

const getToken = () => {
    const token = localStorage.getItem("token");
    return token ? token : null;
};

export const fetchDeliveries = () => async (dispatch) => {
    try {
        const token = getToken();
        console.log("🔄 Отримання всіх доставок...");

        const response = await axios.get(`${API_URL}/all`, {
            headers: { Authorization: `Bearer ${token}` },
        });

        const deliveries = await Promise.all(response.data.map(async (delivery) => {
            try{
                console.log(`🔍 Обробка доставки ID: ${delivery._id}`);
                console.log(delivery);

                const statusPromise = axios.get(`http://localhost:4000/status-delivery/${delivery.status_delivery_id}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                const [ statusResponse] = await Promise.all([
                    statusPromise,
                ]);

                console.log(`✅ Дані для замовлення ID: ${delivery._id} отримані`);
                return {
                    ...delivery,
                    status: statusResponse.data.name,
                };
            }catch(err){
                console.log(err);
            }
        }));
            console.log("✅ Отримано доставки:", response.data);
        dispatch({ type: FETCH_DELIVERIES_SUCCESS, payload: deliveries});
    } catch (error) {
        console.error('❌ Помилка отримання доставок:', error);
        dispatch({ type: DELIVERY_ERROR, payload: error.message });
    }
};

export const addDelivery = (deliveryData) => async (dispatch) => {
    try {
        const token = getToken();
        const response = await axios.post(`${API_URL}/create`, deliveryData, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });
        dispatch({ type: ADD_DELIVERY_SUCCESS, payload: response.data.delivery });
    } catch (error) {
        console.error("❌ Помилка додавання доставки:", error);
        dispatch({ type: DELIVERY_ERROR, payload: error.message });
    }
};

export const updateDelivery = (deliveryID, deliveryData) => async (dispatch) => {
    try {
        const token = getToken();
        const response = await axios.put(`${API_URL}/update?deliveryID=${deliveryID}`, deliveryData, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });
        dispatch({ type: UPDATE_DELIVERY_SUCCESS, payload: response.data.delivery });
    } catch (error) {
        console.error("❌ Помилка оновлення доставки:", error);
        dispatch({ type: DELIVERY_ERROR, payload: error.message });
    }
};

export const deleteDelivery = (deliveryID) => async (dispatch) => {
    try {
        const token = getToken();
        await axios.delete(`${API_URL}/delete?deliveryID=${deliveryID}`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        dispatch({ type: DELETE_DELIVERY_SUCCESS, payload: deliveryID });
    } catch (error) {
        console.error("❌ Помилка видалення доставки:", error);
        dispatch({ type: DELIVERY_ERROR, payload: error.message });
    }
};

export const updateDeliveryStatus = (deliveryId, statusId) => async (dispatch) => {
    try {
        const response = await axios.put(`${API_URL}/update?deliveryID=${deliveryId}`, { status_delivery_id: statusId });

        dispatch({
            type: UPDATE_DELIVERY_SUCCESS,
            payload: response.data, // Отриманий оновлений об'єкт замовлення
        });
        console.log("update delivery  -   ",response.data)
    } catch (error) {
        dispatch({
            type: DELIVERY_ERROR,
            payload: error.response?.data?.message || error.message,
        });
    }
};