import { combineReducers } from 'redux';
import authReducer from './authReducer';

import goodsReducer from "./goodsReducer";
import  orderReducer  from './orderReducer';
import  orderStatusReducer  from './orderStatusReducer';
import deliveryReducer  from './deliveryReducer';
import deliveryStatusReducer from "./deliveryStatusReducer";

const rootReducer = combineReducers({
  //employer: employerReducer,
  //candidate: candidateReducer,
  //auth: authReducer,
  goods: goodsReducer,
  orders: orderReducer,
  orderStatus: orderStatusReducer,
  delivery: deliveryReducer,
  deliveryStatus: deliveryStatusReducer,

});

export default rootReducer;
