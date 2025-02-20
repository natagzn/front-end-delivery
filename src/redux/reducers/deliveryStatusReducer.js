import {
    FETCH_STATUSES_SUCCESS,
    ADD_STATUS_SUCCESS,
    UPDATE_STATUS_SUCCESS,
    DELETE_STATUS_SUCCESS,
    ORDER_STATUS_ERROR
} from "../actions/deliveryStatusActions";

const initialState = {
    deliveryStatus: [],
    loading: false,
    error: null,
};

const deliveryStatusReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_STATUSES_SUCCESS:
            return {
                ...state,
                statuses: action.payload, // Оновлюємо статуси після отримання
                loading: false,
            };
        case ADD_STATUS_SUCCESS:
            return {
                ...state,
                statuses: [...state.orderStatus, action.payload], // Додаємо новий статус до списку
                loading: false,
            };
        case UPDATE_STATUS_SUCCESS:
            return {
                ...state,
                statuses: state.orderStatus.map(status =>
                    status._id === action.payload._id ? { ...status, ...action.payload } : status
                ), // Оновлюємо статус у списку
                loading: false,
            };
        case DELETE_STATUS_SUCCESS:
            return {
                ...state,
                statuses: state.orderStatus.filter(status => status._id !== action.payload), // Видаляємо статус зі списку
                loading: false,
            };
        case ORDER_STATUS_ERROR:
            return {
                ...state,
                error: action.payload, // Оновлюємо помилку, якщо вона є
                loading: false,
            };
        default:
            return state;
    }
};

export default deliveryStatusReducer;
