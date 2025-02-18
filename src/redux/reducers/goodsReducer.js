import {
    FETCH_GOODS_SUCCESS,
    ADD_GOODS_SUCCESS,
    UPDATE_GOODS_SUCCESS,
    DELETE_GOODS_SUCCESS,
    GOODS_ERROR
} from '../actions/goodsAction';

const initialState = {
    goods: [],
    error: null
};

const goodsReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_GOODS_SUCCESS:
            return { ...state, goods: action.payload, error: null };

        case ADD_GOODS_SUCCESS:
            return { ...state, goods: [...state.goods, action.payload], error: null };

        case UPDATE_GOODS_SUCCESS:
            return {
                ...state,
                goods: state.goods.map(good =>
                    good._id === action.payload._id ? action.payload : good
                ),
                error: null
            };

        case DELETE_GOODS_SUCCESS:
            return {
                ...state,
                goods: state.goods.filter(good => good._id !== action.payload),
                error: null
            };

        case GOODS_ERROR:
            return { ...state, error: action.payload };

        default:
            return state;
    }
};

export default goodsReducer;
