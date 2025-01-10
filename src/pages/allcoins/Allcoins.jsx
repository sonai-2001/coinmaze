import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editCoin, fetchCoins } from "../../redux/slice/CoinSlice";
import { AgGridReact } from "ag-grid-react";
import { ClientSideRowModelModule, DateFilterModule, ModuleRegistry, NumberFilterModule, TextFilterModule, ValidationModule, PaginationModule, } from "ag-grid-community";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import { addToCart } from "../../redux/slice/CartSlice";

ModuleRegistry.registerModules([
    ClientSideRowModelModule,
    TextFilterModule,
    NumberFilterModule,
    DateFilterModule,
    PaginationModule,
    ValidationModule,
]);

const Allcoins = () => {
    const [selectedCoin, setSelectedCoin] = useState(null); // To store the clicked coin's data
    const [open, setOpen] = useState(false); // To control the dialog visibility
    const [formOpen, setFormOpen] = useState(false); // To control the dialog visibility


    const { isLoading, userData } = useSelector((state) => state.coinStore);
    const dispatch = useDispatch();

    const { register, handleSubmit, setValue, formState: { errors }, } = useForm()
    const handleEdit = () => {
        // Prefill form fields
        setValue('rank', selectedCoin.rank);
        setValue('id', selectedCoin.id);
        setValue('symbol', selectedCoin.symbol);
        setValue('name', selectedCoin.name);
        setValue('supply', selectedCoin.supply);
        setValue('maxSupply', selectedCoin.maxSupply);
        setValue('marketCapUsd', selectedCoin.marketCapUsd);
        setValue('priceUsd', selectedCoin.priceUsd);
        setValue('changePercent24Hr', selectedCoin.changePercent24Hr);
        setValue('explorer', selectedCoin.explorer);
        setFormOpen(true);
    };
    const handleFormClose = () => setFormOpen(false);

    const submitHandler = (data) => {
        console.log("form data", data);
        dispatch(editCoin(data));
        setFormOpen(false); // Close the form after editing
    }

    const [colDefs, setColDefs] = useState([
        { field: "rank", filter: "agTextColumnFilter", floatingFilter: true },
        { field: "symbol", filter: "agTextColumnFilter", floatingFilter: true },
        { field: "name", filter: "agTextColumnFilter", floatingFilter: true },
        { field: "priceUsd", filter: "agNumberColumnFilter", floatingFilter: true },
        { field: "supply", filter: "agNumberColumnFilter", floatingFilter: true },
    ]);



    useEffect(() => {
        dispatch(fetchCoins());
    }, [dispatch]);

    const handleRowClick = (event) => {
        setSelectedCoin(event.data);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const existingCart = () => {
        if (selectedCoin) {
            dispatch(addToCart(selectedCoin))
        }
    }

    if (isLoading) {
        return <h1>Loading</h1>;
    } else {
        return (
            <div style={{ height: 500, width: "100%" }}>
                <AgGridReact
                    rowData={userData}
                    columnDefs={colDefs}
                    pagination={true}
                    paginationPageSize={10}
                    paginationPageSizeSelector={[10, 25, 50]}
                    defaultColDef={{
                        sortable: true,
                        // filter: true,
                        // floatingFilter: true,
                        resizable: true,
                    }}
                    onRowClicked={handleRowClick} // Add row click handler
                />

                {/* MUI Dialog for Coin Details */}
                <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
                    <DialogTitle>Coin Details</DialogTitle>
                    <DialogContent>
                        {selectedCoin ? (

                            <>
                                <Typography><strong>ID:</strong> {selectedCoin.id}</Typography>
                                <Typography><strong>Rank:</strong> {selectedCoin.rank}</Typography>
                                <Typography><strong>Symbol:</strong> {selectedCoin.symbol}</Typography>
                                <Typography><strong>Name:</strong> {selectedCoin.name}</Typography>
                                <Typography><strong>Supply:</strong> {selectedCoin.supply}</Typography>
                                <Typography><strong>Max Supply:</strong> {selectedCoin.maxSupply}</Typography>
                                <Typography><strong>Market Cap (USD):</strong> {selectedCoin.marketCapUsd}</Typography>
                                <Typography><strong>Price (USD):</strong> {selectedCoin.priceUsd}</Typography>
                                <Typography><strong>24Hr Change (%):</strong> {selectedCoin.changePercent24Hr}</Typography>
                                <Typography><strong>Explorer:</strong> <a href={selectedCoin.explorer} target="_blank" rel="noopener noreferrer">{selectedCoin.explorer}</a></Typography>

                                <Button onClick={() => existingCart()}>Add to cart</Button>
                                <Button variant="contained" onClick={handleEdit}>Edit here</Button>

                                <Dialog open={formOpen} onClose={handleFormClose} fullWidth maxWidth="sm">
                                    <DialogTitle>Edit {selectedCoin.name}</DialogTitle>
                                    <DialogContent>
                                        <form onSubmit={handleSubmit(submitHandler)}>
                                            <TextField
                                                label="Rank"
                                                fullWidth
                                                margin="normal"
                                                size="small"
                                                {...register('rank', { required: 'rank is required' })}
                                            />
                                            <TextField
                                                label="ID"
                                                fullWidth
                                                margin="normal"
                                                size="small"
                                                {...register('id', { required: 'id is required' })}
                                            />
                                            <TextField
                                                label="Symbol"
                                                fullWidth
                                                margin="normal"
                                                size="small"
                                                {...register('symbol', { required: 'symbol is required' })}
                                            />
                                            <TextField
                                                label="Name"
                                                fullWidth
                                                margin="normal"
                                                size="small"
                                                {...register('name', { required: 'Name is required' })}
                                            />
                                            <TextField
                                                label="Supply"
                                                fullWidth
                                                margin="normal"
                                                size="small"
                                                {...register('supply', { required: 'supply is required' })}
                                            />
                                            <TextField
                                                label="Max supply"
                                                fullWidth
                                                margin="normal"
                                                size="small"
                                                {...register('maxSupply')}
                                            />
                                            <TextField
                                                label="Market Cap Usd"
                                                fullWidth
                                                margin="normal"
                                                size="small"
                                                {...register('marketCapUsd', { required: 'Market Cap Usd is required' })}
                                            />
                                            <TextField
                                                label="Price"
                                                fullWidth
                                                margin="normal"
                                                size="small"
                                                {...register('priceUsd', { required: 'Price is required' })}
                                            />
                                            <TextField
                                                label="Change percent 24Hr"
                                                fullWidth
                                                margin="normal"
                                                size="small"
                                                {...register('changePercent24Hr', { required: 'Change percent is required' })}
                                            />
                                            <TextField
                                                label="Change percent 24Hr"
                                                fullWidth
                                                margin="normal"
                                                size="small"
                                                {...register('changePercent24Hr', { required: 'Change percent is required' })}
                                            />
                                            <TextField
                                                label="Explorer"
                                                fullWidth
                                                margin="normal"
                                                size="small"
                                                {...register('explorer', { required: 'explorer percent is required' })}
                                            />
                                            <DialogActions>
                                                <Button onClick={handleFormClose} variant='outlined' color='dark'>Cancel</Button>
                                                <Button type="submit" variant="contained" sx={{ backgroundColor: "#fec33d", color: "#000" }}>
                                                    Save
                                                </Button>
                                            </DialogActions>
                                        </form>
                                    </DialogContent>
                                </Dialog>
                            </>
                        ) : (
                            <Typography>No data available</Typography>
                        )}
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} color="primary">
                            Close
                        </Button>
                    </DialogActions>
                </Dialog>
            </div >
        );
    }
};

export default Allcoins;
