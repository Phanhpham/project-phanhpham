import { getProductById } from "@/services/product.service";
import { Product } from "@/interface/product";
import {
  addProduct,
  deleteProduct,
  getAllProduct,
  sortProduct,
  updateProduct,
} from "@/services/product.service";
import { createSlice } from "@reduxjs/toolkit";

// sap xep
const productState: Product[] = [];

const productReducer = createSlice({
  name: "product",
  initialState: {
    product: productState,
    productDetail:[]
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllProduct.fulfilled, (state, action) => {
        console.log(action.payload)
        state.product = action.payload;
      })
      .addCase(sortProduct.fulfilled, (state, action) => {
        state.product = action.payload;
      })

      .addCase(addProduct.fulfilled, (state, action) => {
        state.product.push(action.payload);
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.product = state.product.filter(
          (items: any) => items.id !== action.payload
        );
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        let index = state.product.findIndex((product: any) => {
          return product.id === action.payload.id;
        });
        if (index !== -1) {
          state.product[index] = action.payload;
        }
      })
      .addCase(getProductById.fulfilled, (state, action) => {
        console.log(action.payload)
        state.productDetail = action.payload
    })
  },
});
// export const {setCart}=productReducer.actions
export default productReducer.reducer;
