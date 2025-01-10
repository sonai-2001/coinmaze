import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { Typography, Box } from "@mui/material";

const CoinDetails = () => {
    const { id } = useParams(); // Extract the coin ID from the URL
    const { userData } = useSelector((state) => state.coinStore);
    
    // Find the coin data by ID
    const coin = userData?.data?.find((item) => item.id === id);

    if (!coin) {
        return <Typography variant="h6">Coin not found!</Typography>;
    }

    return (
        <Box sx={{ padding: 2 }}>
            <Typography variant="h4">Coin Details</Typography>
            <Typography><strong>ID:</strong> {coin.id}</Typography>
            <Typography><strong>Rank:</strong> {coin.rank}</Typography>
            <Typography><strong>Symbol:</strong> {coin.symbol}</Typography>
            <Typography><strong>Name:</strong> {coin.name}</Typography>
            <Typography><strong>Supply:</strong> {coin.supply}</Typography>
            <Typography><strong>Max Supply:</strong> {coin.maxSupply}</Typography>
            <Typography><strong>Market Cap (USD):</strong> {coin.marketCapUsd}</Typography>
            <Typography><strong>Price (USD):</strong> {coin.priceUsd}</Typography>
            <Typography><strong>24Hr Change (%):</strong> {coin.changePercent24Hr}</Typography>
            <Typography><strong>Explorer:</strong> <a href={coin.explorer} target="_blank" rel="noopener noreferrer">{coin.explorer}</a></Typography>
        </Box>
    );
};

export default CoinDetails;
