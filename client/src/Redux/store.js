import { combineReducers, createStore, applyMiddleware } from 'redux';
import {thunk} from 'redux-thunk'; // Correct import
import storage from 'redux-persist/lib/storage';
import { persistStore, persistReducer } from 'redux-persist';
import { productListReducer, productReducer } from './Reducers/Product';
import { userLoginReducer, userRegisterReducer, userProfileReducer  } from './Reducers/User';
import { cartReducer } from "./Reducers/Cart"
import { orderDetailReducer, orderListReducer, orderPaymentReducer, orderReducer } from './Reducers/Order';
const persistConfig = {
    key: 'root',
    storage,
    version: 1
};

const rootReducer = combineReducers({
    productListReducer,
    productReducer,
    userLoginReducer,
    userRegisterReducer,
    cartReducer,

    userProfileReducer,
    

    orderReducer,
    orderDetailReducer,
    orderPaymentReducer,
    orderListReducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(
    persistedReducer,
    applyMiddleware(thunk) // Apply thunk middleware
);

export const persistor = persistStore(store);
