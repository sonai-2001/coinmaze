import { Box, Button, Divider, Typography } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import DeleteIcon from "@mui/icons-material/Delete";
import { incrementQuantity, decrementQuantity, deleteFromCart } from "../../redux/slice/CartSlice";

const Cart = () => {
    const { cartData } = useSelector((state) => state.cartStore);
    const dispatch = useDispatch();

    // Calculate total price
    const totalPrice = cartData.reduce(
        (total, item) => total + item.priceUsd * item.quantity,
        0
    );

    return (
        <Box
            sx={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
                padding: "20px 0",
                backgroundColor: "#f9f9f9",
                // border:"2px solid red"
            }}
        >
            <Box
                sx={{
                    width: "80%",
                    
                    backgroundColor: "#ffffff",
                    border: "1px solid #ddd",
                    borderRadius: "8px",
                    boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
                    padding: "20px",
                    display: "flex",
                    flexDirection: { xs: "column", md: "row" },
                    gap: "20px",
                
                }}
            >
                {/* Cart Items Section */}
                <Box sx={{ flex: 2 }}>
                    <Box sx={{ display: "flex", justifyContent: "space-between", paddingBottom: "10px" }}>
                        <Typography variant="h6" sx={{ flex: 1, fontWeight: "bold" }}>
                            Name
                        </Typography>
                        <Typography variant="h6" sx={{ flex: 1, textAlign: "center", fontWeight: "bold" }}>
                            Quantity
                        </Typography>
                        <Typography variant="h6" sx={{ flex: 1, textAlign: "center", fontWeight: "bold" }}>
                            Price
                        </Typography>
                        <Box sx={{ width: "100px" }}></Box>
                    </Box>

                    {cartData?.length > 0 ? (
                        cartData.map((usr, index) => (
                            <React.Fragment key={usr.id}>
                                <Box
                                    sx={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        alignItems: "center",
                                        padding: "10px 0",
                                    }}
                                >
                                    <Box sx={{ flex: 1, minWidth: "150px" }}>
                                        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                                            {usr.name}
                                        </Typography>
                                        <Typography variant="body2" color="textSecondary">
                                            ({usr.symbol})
                                        </Typography>
                                    </Box>

                                    <Box
                                        sx={{
                                            display: "flex",
                                            alignItems: "center",
                                            gap: "10px",
                                            flex: 1,
                                            justifyContent: "center",
                                        }}
                                    >
                                        <Button
                                            variant="outlined"
                                            size="small"
                                            color="error"
                                            sx={{ minWidth: "30px" }}
                                            onClick={() => dispatch(decrementQuantity(usr.id))}
                                        >
                                            -
                                        </Button>
                                        <Typography variant="body1">{usr.quantity}</Typography>
                                        <Button
                                            variant="outlined"
                                            size="small"
                                            color="primary"
                                            sx={{ minWidth: "30px" }}
                                            onClick={() => dispatch(incrementQuantity(usr.id))}
                                        >
                                            +
                                        </Button>
                                    </Box>

                                    <Box sx={{ flex: 1, display: "flex", justifyContent: "center" }}>
                                        <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                                            ${parseFloat(usr.priceUsd * usr.quantity).toFixed(2)}
                                        </Typography>
                                    </Box>

                                    <Button
                                        variant="outlined"
                                        startIcon={<DeleteIcon />}
                                        onClick={() => dispatch(deleteFromCart(usr.id))}
                                    >
                                        Delete
                                    </Button>
                                </Box>

                                {index < cartData.length - 1 && <Divider sx={{ margin: "10px 0" }} />}
                            </React.Fragment>
                        ))
                    ) : (
                        <Typography variant="h6" color="textSecondary" align="center">
                            Your cart is empty.
                        </Typography>
                    )}
                </Box>

                {/* Total Section */}
                <Box
                    sx={{
                        flex: 1,
                        padding: "20px",
                        border: "1px solid #ddd",
                        borderRadius: "8px",
                        backgroundColor: "#f5f5f5",
                        display: "flex",
                        flexDirection: "column",
                        gap: "20px",
                        height:"300px"
                    }}
                >
                    <Typography variant="h5" sx={{ fontWeight: "bold", textAlign: "center" }}>
                        Order Summary
                    </Typography>
                    <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                        <Typography variant="body1">Total Items:</Typography>
                        <Typography variant="body1">
                            {cartData.reduce((total, item) => total + item.quantity, 0)}
                        </Typography>
                    </Box>
                    <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                        <Typography variant="body1">Total Price:</Typography>
                        <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                            ${totalPrice.toFixed(2)}
                        </Typography>
                    </Box>
                    <Box sx={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                        <Button variant="contained" color="primary" fullWidth>
                            Continue Shopping
                        </Button>
                        <Button variant="contained" color="success" fullWidth>
                            Buy Now
                        </Button>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

export default Cart;
