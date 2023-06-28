import { createSlice } from "@reduxjs/toolkit";




const categorySlice = createSlice({

    name: 'catgory',
    initialState: {
        items: []
    },
    reducers: {

        storeCategory: (state, action) => {

            state.items = action.payload;
        }
    }



})



export default categorySlice.reducer;
export const { storeCategory } = categorySlice.actions