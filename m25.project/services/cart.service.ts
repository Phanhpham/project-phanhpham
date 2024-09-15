import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getCartPrdouctById: any = createAsyncThunk(
    "carts/getCartProductById",
    async (id: number) => {
        const response = await axios.get(`http://localhost:8080/cart?idUser_like=${id}`);
        return response.data
    }
)

export const addToCart: any = createAsyncThunk(
    "carts/addToCart",
    async (data: any) => {
        const response = await axios.post("http://localhost:8080/cart", data);
        return response.data
    }
)

export const updateCart: any = createAsyncThunk(
    "carts/updateCart",
    async (data: any) => {
        const response = await axios.patch(`http://localhost:8080/cart/${data.id}`, data);
        return response.data
    }
)

export const updateProductStock: any = createAsyncThunk(
    "carts/updateProductStock",
    async ({itemId, stock, idUser}: {itemId: number, stock: number, idUser: number}) => {
        try {
            const response = await axios.patch(`http://localhost:8080/cart/${itemId}`, {stock, idUser});
            return {itemId, stock}
        } catch (error) {
            console.log(error)
        }
    }
)