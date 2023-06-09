import { createSlice } from "@reduxjs/toolkit";
import { dollertoinr } from "./utility";






const cartSlice = createSlice({
    name:'cart',
    initialState:{
            items:[],
            totalItems:0,
            totalPrice:0
    },
    reducers:{
        
        addItem:(state,action)=>{
    
            const indexItem= state.items.findIndex((item)=>item.id===action.payload.id)
           
            if(indexItem>=0){
                console.log(indexItem);
                state.items[indexItem].quantity+=1;
                state.totalItems=state.totalItems+1;
                state.totalPrice=state.totalPrice + dollertoinr(action.payload.price) ;

            }else{
                let temp = {...action.payload,quantity:1}
                state.items.push(temp)
                state.totalItems=state.totalItems+1;
                state.totalPrice= dollertoinr(action.payload.price)+state.totalPrice
                
            }

        },

        remove_one_item:(state,action)=>{
            const indexItem = state.items.findIndex((item)=>item.id===action.payload.id)
            console.log(indexItem);
            if(state.items[indexItem].quantity>1){                   
                 state.totalPrice=state.totalPrice - dollertoinr(state.items[indexItem].price);
                 state.items[indexItem].quantity-=1;
                 state.totalItems-=1;

            }
            
        },
        deleteItem:(state,action)=>{
            const indexItem = state.items.findIndex((item)=>item.id===action.payload.id)
            state.totalPrice= state.totalPrice - dollertoinr(state.items[indexItem].price)*state.items[indexItem].quantity;
            state.totalItems=state.totalItems-state.items[indexItem].quantity;
            state.items.splice(indexItem,1);


        }

      
    }

});


export default cartSlice.reducer;
export const {addItem,updateQuantity,remove_one_item,deleteItem}=cartSlice.actions