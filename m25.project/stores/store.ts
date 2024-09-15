import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./reducers/userReducer";
import productReducer from "./reducers/productReducer";
import categoryReducer from "./reducers/categoryReducer";
import cartReducer from "./reducers/cartReducer";

const store = configureStore({
    reducer:{
        userReducer,
        productReducer,
        categoryReducer,
        cartReducer
    }
})
export default store;