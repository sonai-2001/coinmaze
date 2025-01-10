import { createSlice } from "@reduxjs/toolkit";

const initialValue = {
    cartData: window.localStorage.getItem("cartItems") ? JSON.parse(window.localStorage.getItem("cartItems")) : []
}
const CartSlice = createSlice({
    name: "cart",
    initialState: initialValue,
    reducers: {
        addToCart: (state, { payload }) => {
            let allCoins = window.localStorage.getItem("cartItems") ? JSON.parse(window.localStorage.getItem("cartItems")) : [];
            let existingCoinIndex = allCoins.findIndex((coin) => coin.id === payload.id);

            if (existingCoinIndex !== -1) {
                allCoins[existingCoinIndex].quantity += 1;
            } else {
                let updatedCoin = {
                    ...payload,
                    quantity: 1,
                };
                allCoins.push(updatedCoin);
            }

            window.localStorage.setItem("cartItems", JSON.stringify(allCoins));
            state.cartData = allCoins;
        },
        incrementQuantity: (state, { payload }) => {
            const updatedCart = state.cartData.map((coin) =>
                coin.id === payload ? { ...coin, quantity: coin.quantity + 1 } : coin
            );
            window.localStorage.setItem("cartItems", JSON.stringify(updatedCart));
            state.cartData = updatedCart;
        },
        decrementQuantity: (state, { payload }) => {
            const updatedCart = state.cartData.map((coin) =>
                coin.id === payload && coin.quantity > 1
                    ? { ...coin, quantity: coin.quantity - 1 }
                    : coin
            );
            window.localStorage.setItem("cartItems", JSON.stringify(updatedCart));
            state.cartData = updatedCart;
        },
        deleteFromCart: (state, { payload }) => {
            const updatedCart = state.cartData.filter((coin) => coin.id !== payload);
            window.localStorage.setItem("cartItems", JSON.stringify(updatedCart));
            state.cartData = updatedCart;
        },
    },
});

export default CartSlice.reducer;
export const { addToCart, incrementQuantity, decrementQuantity, deleteFromCart } = CartSlice.actions;
