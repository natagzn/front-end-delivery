import axios from "axios";

export const FETCH_GOODS_SUCCESS = 'FETCH_GOODS_SUCCESS';
export const ADD_GOODS_SUCCESS = 'ADD_GOODS_SUCCESS';
export const UPDATE_GOODS_SUCCESS = 'UPDATE_GOODS_SUCCESS';
export const DELETE_GOODS_SUCCESS = 'DELETE_GOODS_SUCCESS';
export const GOODS_ERROR = 'GOODS_ERROR';


const API_URL = "http://localhost:4000/goods";

// Функція отримання токена (замініть на реальну реалізацію)
//const getToken = (getState) => getState().auth.token;
const getToken = () => {
    const token = localStorage.getItem("token");
    return token ? token : null; // Переконайся, що не повертається undefined
};

export const fetchGoods = () => async (dispatch, getState, getToken) => {
    try {
        const token = getToken;
        const response = await axios.get(`http://localhost:4000/goods/all`,{
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        dispatch({ type: FETCH_GOODS_SUCCESS, payload: response.data });
    } catch (error) {
        console.error('Error fetching goods:', error);
    }
};

export const addGoods = (goodsData) => async (dispatch, getState) => {
    try {
        const token = getToken(getState);
        const response = await axios.post(`${API_URL}/create`, goodsData, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });

        dispatch({ type: ADD_GOODS_SUCCESS, payload: response.data.goods });
    } catch (error) {
        console.error("Error adding goods:", error);
        dispatch({ type: GOODS_ERROR, payload: error.message });
    }
};

export const updateGoods = (goodsID, goodsData) => async (dispatch, getState) => {
    try {
        const token = getToken(getState);
        const response = await axios.put(`${API_URL}/update?goodsID=${goodsID}`, goodsData, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });

        dispatch({ type: UPDATE_GOODS_SUCCESS, payload: response.data.goods });
    } catch (error) {
        console.error("Error updating goods:", error);
        dispatch({ type: GOODS_ERROR, payload: error });
    }
};

export const deleteGoods = (goodsID) => async (dispatch, getState) => {
    try {
        const token = getToken(getState);
        await axios.delete(`${API_URL}/delete?goodsID=${goodsID}`, {
            headers: { Authorization: `Bearer ${token}` }
        });

        dispatch({ type: DELETE_GOODS_SUCCESS, payload: goodsID });
    } catch (error) {
        console.error("Error deleting goods:", error);
        dispatch({ type: GOODS_ERROR, payload: error });
    }
};

