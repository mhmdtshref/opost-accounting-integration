'use client';

import { useEffect, useState } from "react"

import { Box, TextField } from "@mui/material"

import axios from "axios";

import { ProductCard } from "./product-card";


export const ProductSearch = ({ products: prods, selectable = false, setSelectedProduct = null, selectedProduct = null }) => {

    const [products, setProducts] = useState(prods || []);
    const [filteredProducts, setFilteredProducts] = useState(prods || []);
    const [search, setSearch] = useState('');

    useEffect(() => {
        if (!prods) {
            axios.get(`/api/products?search=${search}`)
            .then(productsResponse => {
                setProducts(productsResponse.data.products || [])
                setFilteredProducts(productsResponse.data.products || []);
            }).catch(err => console.log(err));
        }
    }, [products, search]);

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
            <Box display='flex' flexWrap='wrap' gap={2} marginTop={8}>
                {filteredProducts.map(product => (
                    <Box key={product._id} width={'240px'} onClick={() => {
                        if (selectable) {
                            setSelectedProduct(product);
                        }
                    }} style={{ border: selectable && selectedProduct?._id === product._id ? '2px solid #1976d2' : 'none', borderRadius: '8px', cursor: selectable ? 'pointer' : 'default' }}>
                        <ProductCard product={product} />
                    </Box>
                ))}
            </Box>
        </Box>
    )
}
