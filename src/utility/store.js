import { configureStore } from "@reduxjs/toolkit";
import dataSlice from "./dataSlice";
import cartSlice from "./cartSlice";
import loginSlice from "./loginSlice";
import userSlice from "./userSlice";
import categorySlice from "./categorySlice";
import searchSlice from "./searchSlice";



const store = configureStore({
    reducer: {
        products: dataSlice,
        cart: cartSlice,
        login: loginSlice,
        user: userSlice,
        category:categorySlice,
        search:searchSlice
    }

})


export default store;