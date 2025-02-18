import {
    FETCH_ORDERS_SUCCESS,
    ADD_ORDER_SUCCESS,
    UPDATE_ORDER_SUCCESS,
    DELETE_ORDER_SUCCESS,
    ORDER_ERROR
} from '../actions/orderActions';

const initialState = {
    orders: [],
    loading: false,
    error: null
};

const orderReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_ORDERS_SUCCESS:
            return { ...state, orders: action.payload, loading: false,  error: null };

        case ADD_ORDER_SUCCESS:
            return { ...state, orders: [...state.orders, action.payload], error: null };

        case UPDATE_ORDER_SUCCESS:
            return {
                ...state,
                orders: state.orders.map(order =>
                    order._id === action.payload._id ? action.payload : order
                ),
                error: null
            };

        case DELETE_ORDER_SUCCESS:
            return {
                ...state,
                orders: state.orders.filter(order => order._id !== action.payload),
                error: null
            };

        case ORDER_ERROR:
            return { ...state, error: action.payload };

        default:
            return state;
    }
};

export default orderReducer;
