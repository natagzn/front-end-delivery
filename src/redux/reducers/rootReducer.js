import { combineReducers } from 'redux';
import authReducer from './authReducer';

import goodsReducer from "./goodsReducer";
import  orderReducer  from './orderReducer';
import  orderStatusReducer  from './orderStatusReducer';


const rootReducer = combineReducers({
  //employer: employerReducer,
  //candidate: candidateReducer,
  //auth: authReducer,
  goods: goodsReducer,
  orders: orderReducer,
  orderStatus: orderStatusReducer
});

export default rootReducer;
