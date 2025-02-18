import axios from "axios";

export const FETCH_STATUSES_SUCCESS = 'FETCH_STATUSES_SUCCESS';
export const ADD_STATUS_SUCCESS = 'ADD_STATUS_SUCCESS';
export const UPDATE_STATUS_SUCCESS = 'UPDATE_STATUS_SUCCESS';
export const DELETE_STATUS_SUCCESS = 'DELETE_STATUS_SUCCESS';
export const ORDER_STATUS_ERROR = 'ORDER_STATUS_ERROR';

const API_URL = "http://localhost:4000/status-order";  // Твій API для статусів

// Отримуємо токен з localStorage
const getToken = () => {
    const token = localStorage.getItem("token");
    return token ? token : null;
};

// Дія для створення статусу замовлення
export const addStatusOrder = (statusData) => async (dispatch) => {
    try {
        const token = getToken();
        const response = await axios.post(`${API_URL}/create`, statusData, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            }
        });
        dispatch({ type: ADD_STATUS_SUCCESS, payload: response.data.StatusOrder });
    } catch (error) {
        console.error("Error adding status order:", error);
        dispatch({ type: ORDER_STATUS_ERROR, payload: error.message });
    }
};

// Дія для отримання всіх статусів замовлення
export const fetchStatuses = () => async (dispatch) => {
    try {
        const token = getToken();
        const response = await axios.get(`${API_URL}/all`, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });
        dispatch({ type: FETCH_STATUSES_SUCCESS, payload: response.data });
    } catch (error) {
        console.error("Error fetching status orders:", error);
        dispatch({ type: ORDER_STATUS_ERROR, payload: error.message });
    }
};

// Дія для оновлення статусу замовлення
export const updateStatusOrder = (statusOrderID, statusData) => async (dispatch) => {
    try {
        const token = getToken();
        const response = await axios.put(`${API_URL}/update?statusOrderID=${statusOrderID}`, statusData, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            }
        });
        dispatch({ type: UPDATE_STATUS_SUCCESS, payload: response.data.statusOrder });
    } catch (error) {
        console.error("Error updating status order:", error);
        dispatch({ type: ORDER_STATUS_ERROR, payload: error.message });
    }
};

// Дія для видалення статусу замовлення
export const deleteStatusOrder = (statusOrderID) => async (dispatch) => {
    try {
        const token = getToken();
        await axios.delete(`${API_URL}/delete?statusOrderID=${statusOrderID}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });
        dispatch({ type: DELETE_STATUS_SUCCESS, payload: statusOrderID });
    } catch (error) {
        console.error("Error deleting status order:", error);
        dispatch({ type: ORDER_STATUS_ERROR, payload: error.message });
    }
};
