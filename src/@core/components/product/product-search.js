'use client';

import { useEffect, useState } from "react"

import { Box, CircularProgress, Grid2, TextField } from "@mui/material"

import axios from "axios";

import { ProductCard } from "./product-card";


export const ProductSearch = ({ products: prods, selectable = false, setSelectedProduct = null, selectedProduct = null }) => {

    const [products, setProducts] = useState(prods || []);
    const [filteredProducts, setFilteredProducts] = useState(prods || []);
    const [search, setSearch] = useState('');
    const [loadingStatus, setLoadingStatus] = useState('none');

    useEffect(() => {
        if (!prods && loadingStatus === 'none') {
            axios.get(`/api/products?search=${search}`)
            .then(productsResponse => {
                setProducts(productsResponse.data.products || [])
                setFilteredProducts(productsResponse.data.products || []);
            }).catch(err => console.log(err))
            .finally(() => {
                setLoadingStatus('ready');
            });
        }

        if (prods) {
            setLoadingStatus('ready');
        }
    }, [products, search, loadingStatus, prods]);

    const handleSearch = (e) => {
        setSearch(e.target.value);
        const newFilteredProducts = products.filter(product => product.searchString.includes(e.target.value.toLowerCase()));

        setFilteredProducts(newFilteredProducts);
    }

    return (
        <Box>
            <Box>
                <TextField label="Search" variant="outlined" fullWidth onChange={handleSearch} />
            </Box>
            {loadingStatus === 'ready' ? <Box display='flex' flexWrap='wrap' gap={2} marginTop={8}>
                {filteredProducts.map(product => (
                    <Grid2 key={product._id} size={{ xs: 12, sm: 12, md: 3, lg: 3, xl: 3 }} display='flex' justifyContent='center' alignItems='center' width={'100%'}>
                    <Box key={product._id} width={'100%'} onClick={() => {
                        if (selectable) {
                            setSelectedProduct(product);
                        }
                    }} style={{ border: selectable && selectedProduct?._id === product._id ? '2px solid #1976d2' : 'none', borderRadius: '8px', cursor: selectable ? 'pointer' : 'default' }}>
                        <ProductCard product={product} />
                    </Box>
                    </Grid2>
                ))}
            </Box> : (
                <Box display='flex' justifyContent='center' alignItems='center' p={8} width='100%' height='100%'>
                    <CircularProgress />
                </Box>
            )}
        </Box>
    )
}
