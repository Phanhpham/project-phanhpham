import { Cart } from "@/interface/product";
import { addToCart, getCartPrdouctById, updateCart, updateProductStock } from "@/services/cart.service";
import { createSlice } from "@reduxjs/toolkit";

const cartState: Cart[] = [];

const cartReducer = createSlice({
    name: "carts",
    initialState: {
        cart: cartState,
        totalPrice: 0
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getCartPrdouctById.fulfilled, (state, action) => {
            state.cart = action.payload
        })
        .addCase(addToCart.fulfilled, (state, action) => {
            state.cart.push(action.payload)
        })
        .addCase(updateCart.fulfilled, (state, action) => {
            const cartIndex = state.cart.findIndex((item: Cart) => item.id === action.payload.id);
            if(cartIndex !== -1){
                state.cart[cartIndex].product.stock = action.payload.product.stock
            }
        })
        .addCase(updateProductStock.fulfilled, (state, action) => {
            const {itemId, stock} = action.payload;
            const productUpdate = state.cart.find((cart: Cart) => cart.id = itemId);
            if(productUpdate){
                state.totalPrice -= productUpdate.product.price * productUpdate.product.stock;
                productUpdate.product.stock = stock
                state.totalPrice += productUpdate.product.price * stock
            }
        })
    }
})

export default cartReducer.reducer