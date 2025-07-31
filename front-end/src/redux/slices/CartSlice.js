import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    items: [],
    count: 0,
}

const CartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        SetCartItems(state, action) {
            state.items = action.payload;
            state.count = action.payload.reduce((total, item) => total + item.QuantityInCart, 0);
        },

    }
})

export const { SetCartItems } = CartSlice.actions;
export default CartSlice.reducer;