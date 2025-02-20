import {
    FETCH_DELIVERIES_SUCCESS,
    ADD_DELIVERY_SUCCESS,
    UPDATE_DELIVERY_SUCCESS,
    DELETE_DELIVERY_SUCCESS,
    DELIVERY_ERROR
} from '../actions/deliveryActions';

const initialState = {
    delivery: [],
    loading: false,
    error: null
};

const deliveryReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_DELIVERIES_SUCCESS:
            return { ...state, deliveries: action.payload, loading: false, error: null };

        case ADD_DELIVERY_SUCCESS:
            return { ...state, deliveries: [...state.delivery, action.payload], error: null };

        case UPDATE_DELIVERY_SUCCESS:
            return {
                ...state,
                deliveries: state.delivery.map(delivery =>
                    delivery._id === action.payload._id ? action.payload : delivery
                ),
                error: null
            };

        case DELETE_DELIVERY_SUCCESS:
            return {
                ...state,
                deliveries: state.delivery.filter(delivery => delivery._id !== action.payload),
                error: null
            };

        case DELIVERY_ERROR:
            return { ...state, error: action.payload };

        default:
            return state;
    }
};

export default deliveryReducer;
