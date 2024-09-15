import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { list } from "firebase/storage";

// api render chi tiet 
export const getProductById: any = createAsyncThunk(
    "products/getProductById",
    async (id: number) => {
        const response = await axios.get(` http://localhost:8080/product/${id}`)
        return response.data
    }
)
// api tat ca sp
export const getAllProduct:any =createAsyncThunk(
    "user/getAllProduct",
    async()=>{
        const response =await axios.get("http://localhost:8080/product")
        return response.data;
    }
)
export const sortProduct:any=createAsyncThunk("product/sortProduct",async(order: 'asc'|'desc')=>{
let response =await axios.get (`http://localhost:8080/product?_sort=productname&_order=${order}`)
return response.data
})

export const addProduct:any=createAsyncThunk("product/addProduct",async(product:any)=>{
    let response =await axios.post (`http://localhost:8080/product`,product)
    return response.data
    })
 export const deleteProduct:any=createAsyncThunk("product/deleteProduct",async(id:number)=>{
        let response =await axios.delete (`http://localhost:8080/product/${id}`)
        return id
        })

export const updateProduct:any=createAsyncThunk("product/updateProduct",async(product:any)=>{
            let response =await axios.put (`http://localhost:8080/product/${product.id}`,product);
            return response.data
            })

