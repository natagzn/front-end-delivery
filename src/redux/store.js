import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from './reducers/rootReducer';

import { configureStore } from '@reduxjs/toolkit';

const getToken = () => localStorage.getItem('token'); // Функція для отримання токену

const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            thunk: {
                extraArgument: {
                    getToken: {getToken}, 
                },
            },
        }),
});
export default store;
