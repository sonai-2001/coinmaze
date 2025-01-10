import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { end_points } from "../../api/Api";
import { axiosInstance } from "../../api/axiosInstance";



const api = end_points.assets

export const fetchCoins = createAsyncThunk("coins/fetchCoins",
    async()=>{
        const res = await axiosInstance.get(api)
        console.log("fetch all coins",res.data);
        return res?.data
    }
)


const initialValue = {
    isLoading: true,
    userData: [],
    error: null
}

const CoinSlice = createSlice({
    name:"coins",
    initialState:initialValue,
    reducers: {
        editCoin: (state, { payload }) => {
            // const index = state.userData.findIndex((coin) => coin.id === payload.id);
            // if (index !== -1) {
            //     // Update the specific coin with the new data
            //     state.userData[index] = { ...state.userData[index], ...payload };
            // } else {
            //     console.error("Coin with the given ID not found.");
            // }
            state.userData=state.userData.map((data)=>{
                if(data.id===payload.id){
                    return payload
                }else{
                    return data
                }
            })
        },
        // editCoin: (state, { payload }) => {
        //     if (!Array.isArray(state.userData)) {
        //         console.error("userData is not an array:", state.userData);
        //         return;
        //     }
        
        //     const index = state.userData.findIndex((coin) => coin.id === payload.id);
        //     if (index !== -1) {
        //         state.userData[index] = { ...state.userData[index], ...payload };
        //     } else {
        //         console.error("Coin with the given ID not found.");
        //     }
        // },
        
        
    },
    
    extraReducers:(builder)=>{
        
        builder.addCase(fetchCoins.pending,(state,action)=>{
            state.isLoading = true
        })
        
        builder.addCase(fetchCoins.fulfilled,(state,action)=>{
            state.isLoading = false
            // console.log("userdata fulfilled", action);
            
            state.userData = action.payload?.data
            state.error = null
        })
        // builder.addCase(fetchCoins.fulfilled, (state, action) => {
        //     console.log("Fetched data:", action.payload);
        //     state.isLoading = false;
        //     state.userData = Array.isArray(action.payload) ? action.payload : action.payload || [];
        //     state.error = null;
        // });
        
       
        builder.addCase(fetchCoins.rejected,(state,action)=>{
            state.isLoading = false
            state.userData = []
            state.error = action.error.message
        })
    }
    
})
export default CoinSlice.reducer
export const { editCoin } = CoinSlice.actions;