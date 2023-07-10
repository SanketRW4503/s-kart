import { createSlice } from "@reduxjs/toolkit";




const wishlistSlice = createSlice({
    name: 'wishlist',
    initialState: {
        list: []
    },
    reducers: {

        add_data: (state, actions) => {
            for (let i = 0; actions.payload.length !== i; i++) {
                state.list.push(actions.payload[i])
            }
        },
        remove_data: (state, actions) => {
            let index = state.list.findIndex((p) => p.product_id == actions.payload);
            if(state.list.length==1){
                state.list=[]
            }else if (index !== -1) {
                state.list.splice(index, 1);
            }
        }


    }
});


export default wishlistSlice.reducer;
export const { add_data, remove_data } = wishlistSlice.actions