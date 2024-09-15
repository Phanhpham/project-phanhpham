// import { AddUser } from './../../interface/admin';
import { Admin } from "@/interface/admin";
import { addUser, getAllUser, searchName, sortUser, updateUserStatus } from "@/services/user.service";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const userState:Admin[]=[]
const userReducer=createSlice({
    name:"user",
    initialState:{
        user:userState,

    },
    reducers:{

    },
    extraReducers:(builder)=>{
        builder.addCase(getAllUser.fulfilled,(state, action)=>{
            state.user=action.payload
        })
        .addCase(searchName.fulfilled,(state, action)=>{
            state.user=action.payload
        })
        .addCase(addUser.fulfilled,(state, action)=>{
            state.user.push(action.payload)
        })
        .addCase(sortUser.fulfilled,(state, action)=>{
            state.user=(action.payload)
        })
        .addCase(updateUserStatus.fulfilled, (state, action: PayloadAction<{id: number, status: boolean}>) => {
            console.log(12356, action.payload.id)
            const userIndex = state.user.findIndex((item: any) => item.id === action.payload.id)
            if(userIndex !== -1){
                state.user[userIndex].status = action.payload.status
            }

        })
    }
})
export default userReducer.reducer