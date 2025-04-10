import { useEffect, useState } from "react";

import { useRouter } from "next/navigation";

import { Accordion, AccordionDetails, AccordionSummary, Box, Button, Card, CardContent, Chip, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material";
import axios from "axios";

import toast from "react-hot-toast";

import { ProductSearch } from "../product/product-search";

export const ContentItemForm = ({ products, action }) => {
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [isProductSearchExpanded, setIsProductSearchExpanded] = useState(true);

    const [formData, setFormData] = useState({
        productId: '',
        size: '',
        color: ''
    });

    // const [errors, setErrors] = useState({});
    
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    }

    const handleAdd = () => {
        if (!formData.productId || !formData.size || !formData.color) {
            toast.error('يرجى ملئ جميع الحقول', {
                duration: 3000,
            });
        }

        action(formData, selectedProduct);
    }

    return (
        <Card style={{ margin: 0 }}>
            <CardContent>
                <Box>
                    <Accordion expanded={isProductSearchExpanded}>
                        <AccordionSummary onClick={() => setIsProductSearchExpanded(!isProductSearchExpanded)}>
                            <Typography variant="h6">اختيار بضاعة</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <ProductSearch
                                products={products}
                                selectable={true}
                                setSelectedProduct={(prod) => {
                                    setFormData({
                                        ...formData,
                                        productId: prod._id,
                                    });
                                    setSelectedProduct(prod);
                                    setIsProductSearchExpanded(false);
                                }}
                                selectedProduct={selectedProduct}
                                />
                        </AccordionDetails>
                    </Accordion>
                </Box>
                <Box pt={2}>
                    {selectedProduct && <Typography variant="h6">البضاعة المحددة: {selectedProduct.name}</Typography>}
                </Box>
                <Box pt={2}>
                    <TextField name='size' type='number' label="القياس" variant="outlined" fullWidth onChange={handleChange} />
                </Box>
                <Box pt={2}>
                    <TextField name='color' type='text' label="اللون" variant="outlined" fullWidth onChange={handleChange} />
                </Box>
                <Box pt={2} display='flex' justifyContent='flex-end'>
                    <Button variant="contained" color="primary" onClick={handleAdd}>اضافة</Button>
                </Box>
            </CardContent>
        </Card>
    );
}
