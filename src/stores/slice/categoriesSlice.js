import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import { ApiClient } from "../../request/request";

const cateSlice=createSlice({
    name:'category',
    initialState:{
        list:[],
        meta:[],
        error: null,
    },
    reducers:{
        // getCategories:(state,action)=>{
        //     state.items=action.payload
        // },
        totalCate:(state,action)=>{
            state.meta=action.payload
        },
    },
    
    extraReducers:(builder)=>{
        builder
            .addCase(getCategories.fulfilled,(state,action)=>{
                state.list.push(action.payload.items);
            })
            .addCase(getCategories.rejected,(state,action)=>{
                console.log("rejected");
                state.error = action.payload;
            })
    }
});

export const getCategories=createAsyncThunk('cates/getCategories',async(_, {rejectWithValue })=>{
    try {
        const res =await ApiClient.get("/api/categories")
        return res.data
    } catch (error) {
        return rejectWithValue(error)
    }
}
)
export default cateSlice