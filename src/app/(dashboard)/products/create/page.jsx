'use client';

import { Card, CardContent, CardHeader } from "@mui/material";
import { useRouter } from "next/navigation";
import axios from "axios";

import { ProductForm } from "@/@core/components/product/product-form";

const CreateProductPage = () => {

    const router = useRouter();

    const createProduct = async (product) => {
        axios.post('/api/products', product)
            .then(res => {
              router.push('/')
            })
            .catch(err => {
                console.log('err:', err);
            });
    }

    return <Card sx={{ padding: 2, margin: 2 }}>
        <CardHeader title="اضافة بضاعة" />
        <CardContent>
            <ProductForm action={createProduct} />
        </CardContent>
    </Card>
}

export default CreateProductPage;
