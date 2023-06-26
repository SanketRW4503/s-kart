import { createSlice } from "@reduxjs/toolkit";






const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        items: [],
        totalItems: 0,
        totalPrice: 0
    },
    reducers: {

        addItem: (state, action) => {

            const indexItem = state.items.findIndex((item) => item._id === action.payload._id)

            if (indexItem >= 0) {
                state.items[indexItem].quantity += 1;
                state.totalItems = state.totalItems + 1;
                state.totalPrice = state.totalPrice + action.payload.price;

            } else {
                let temp = { ...action.payload, quantity: 1 }
                state.items.push(temp)
                state.totalItems = state.totalItems + 1;
                state.totalPrice = action.payload.price + state.totalPrice
            }



        },

        remove_one_item: (state, action) => {
            const indexItem = state.items.findIndex((item) => item._id === action.payload._id)
            if (state.items[indexItem].quantity > 1) {
                state.totalPrice = state.totalPrice - state.items[indexItem].price;
                state.items[indexItem].quantity -= 1;
                state.totalItems -= 1;

            }

        },
        deleteItem: (state, action) => {
            const indexItem = state.items.findIndex((item) => item._id === action.payload._id)
            state.totalPrice = state.totalPrice - state.items[indexItem].price * state.items[indexItem].quantity;
            state.totalItems = state.totalItems - state.items[indexItem].quantity;
            state.items.splice(indexItem, 1);


        }


    }

});


export default cartSlice.reducer;
export const { addItem, updateQuantity, remove_one_item, deleteItem } = cartSlice.actions