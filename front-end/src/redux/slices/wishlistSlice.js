import { createSlice } from "@reduxjs/toolkit";

const WishList = createSlice({
    name : 'wishlist',
    initialState : {
        count : 0
    },
    reducers : {
        Add(state){
            state.count += 1;
        },
        Delete(state){
            state.count -= 1;
        }
    }
});

export const { Add, Delete } = WishList.actions;
export default WishList.reducer;
