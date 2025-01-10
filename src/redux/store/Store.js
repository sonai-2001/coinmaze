import { configureStore } from "@reduxjs/toolkit";
import CoinSlice from '../slice/CoinSlice'
import CartSlice from '../slice/CartSlice'

const Store = configureStore({
    reducer:{
        coinStore: CoinSlice,
        cartStore: CartSlice,
    }
})

export default Store