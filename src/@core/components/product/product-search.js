'use client';

import { useCallback, useEffect, useState } from "react"

import { Autocomplete, Box, CircularProgress, Grid2, TextField } from "@mui/material"

import axios from "axios";

import { ProductCard } from "./product-card";


export const ProductSearch = ({ products: prods, selectable = false, setSelectedProduct = null, selectedProduct = null }) => {

    const [products, setProducts] = useState(prods || []);
    const [tags, setTags] = useState([]);
    const [selectedTags, setSelectedTags] = useState([]);
    const [loadingTagsStatus,setLoadingTagsStatus] = useState('none');
    const [loadingStatus, setLoadingStatus] = useState('none');
    const [dirtyTags, setDirtyTags] = useState(false);

    useEffect(() => {
        if (!tags.length && loadingTagsStatus === 'none') {
            axios.get(`/api/products/tags`)
            .then(tagsResponse => {
                setTags(tagsResponse.data.tags || []);
            }).catch(err => console.log(err))
            .finally(() => {
                setLoadingTagsStatus('ready');
            });
        }
    }, [loadingTagsStatus, tags])

    const getProducts = useCallback(async () => {
        const params = {};

        if (selectedTags.length) {
            params.tags = selectedTags.join(',');
        }

        
return await axios.get(`/api/products`, { params })
            .then(productsResponse => {
                setProducts(productsResponse.data.products || [])
            }).catch(err => console.log(err))
    }, [selectedTags]);

    useEffect(() => {
        if (!prods && loadingStatus === 'none') {
            getProducts()
            .finally(() => {
                setLoadingStatus('ready');
            });
        }

        if (prods) {
            setLoadingStatus('ready');
        }
    }, [products, loadingStatus, prods, getProducts]);

    useEffect(() => {
        if (selectedTags.length) {
            setDirtyTags(true);
            getProducts();
        } else {
            if (dirtyTags) {
                getProducts();
            }
        }
    }, [selectedTags, dirtyTags, getProducts]);

    return (
        <Box>
            <Box pt={2}>
                <Autocomplete
                    options={tags}
                    renderInput={(params) => <TextField {...params} label="ابحث" variant="outlined" />}
                    getOptionLabel={(option) => option}
                    multiple
                    getOptionKey={(option) => `${option}-${option}`}
                    onChange={(_, newValue) => {
                        setSelectedTags(newValue);
                    }}
                    value={selectedTags}
                    sx={{ mt: 2 }}
                />
            </Box>
            {loadingStatus === 'ready' ? <Box display='flex' flexWrap='wrap' gap={2} marginTop={8}>
                {products.map(product => (
                    <Grid2 key={product._id} size={{ xs: 12, sm: 6, md: 3, lg: 3, xl: 3 }} display='flex' justifyContent='center' alignItems='center' width={'100%'}>
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
