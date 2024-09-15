import { createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"

let url = process.env.NEXT_PUBLIC_VITE_BASE_URL
// api tat ca user 
export const getAllUser:any =createAsyncThunk(
    "user/getAllUser",
    async()=>{
        const response =await axios.get(" http://localhost:8080/user")
        return response.data;
    }
)
export const searchName:any =createAsyncThunk("user/searchName",async(name:any)=>{
    const response =await axios.get(`http://localhost:8080/user?username_like=${name}`)
    return response.data;
})
export const addUser:any =createAsyncThunk("user/addUser",async(name:any)=>{
    const response =await axios.post(`http://localhost:8080/user`,name)
    return response.data;
})
export const sortUser:any=createAsyncThunk("user/sortUser",async(name:string)=>{
    const response =await axios.get(`http://localhost:8080/user?_sort=username&_order=${name}`)
    return response.data;
    })

export const updateUserStatus: any = createAsyncThunk("user/updateUserStatus", async (data: any) => {
    const response = await axios.patch(`http://localhost:8080/user/${data.id}`, data);
    return response.data
})