import { configureStore } from "@reduxjs/toolkit";
import dataSlice from "./dataSlice";
import cartSlice from "./cartSlice";
import loginSlice from "./loginSlice";
import userSlice from "./userSlice";



const store = configureStore({
    reducer: {
        products: dataSlice,
        cart: cartSlice,
        login: loginSlice,
        user: userSlice
    }

})


export default store;