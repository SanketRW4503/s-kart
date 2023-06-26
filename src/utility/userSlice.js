import { createSlice } from "@reduxjs/toolkit";




const userSlice = createSlice({

    name: 'user',
    initialState: {
        userdata: []
    },
    reducers: {

        setUser: (state, action) => {

            state.userdata = action.payload;
        }
    }



})



export default userSlice.reducer;
export const { setUser } = userSlice.actions