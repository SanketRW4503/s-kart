import { createSlice } from "@reduxjs/toolkit";





const searchSlice= createSlice({
    name:'search',
    initialState:{
        keywords:[]
    },
    reducers:{

        add_keywords:(state,actions)=>{
            state.keywords=actions.payload;
        }

    }

});


export default searchSlice.reducer;
export const { add_keywords } = searchSlice.actions