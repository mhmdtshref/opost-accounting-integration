'use client';

import { Card, CardContent, CardHeader } from "@mui/material";
import axios from "axios";

import { ProductForm } from "@/@core/components/product/product-form";

const CreateProductPage = () => {

    const createProduct = async (product) => {
        axios.post('/api/products', product)
            .then(res => {
                console.log('res:', res);
            })
            .catch(err => {
                console.log('err:', err);
            });
    }

    return <Card sx={{ padding: 2, margin: 2 }}>
        <CardHeader title="Create Product" />
        <CardContent>
            <ProductForm action={createProduct} />
        </CardContent>
    </Card>
}

export default CreateProductPage;
