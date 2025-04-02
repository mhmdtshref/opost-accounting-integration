import { useEffect, useState } from "react";

import { useRouter } from "next/navigation";

import { Accordion, AccordionDetails, AccordionSummary, Box, Button, Card, CardContent, Chip, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material";
import axios from "axios";

import { ProductSearch } from "../product/product-search";

export const ContentItemForm = ({ products, action }) => {
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [isProductSearchExpanded, setIsProductSearchExpanded] = useState(false);

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

    return (
        <Card style={{ margin: 0 }}>
            <CardContent>
                <Box>
                    <Accordion expanded={isProductSearchExpanded}>
                        <AccordionSummary onClick={() => setIsProductSearchExpanded(!isProductSearchExpanded)}>
                            <Typography variant="h6">Product Selection</Typography>
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
                    {selectedProduct && <Typography variant="h6">Selected Product: {selectedProduct.name}</Typography>}
                </Box>
                <Box pt={2}>
                    <TextField name='size' type='number' label="Size" variant="outlined" fullWidth onChange={handleChange} />
                </Box>
                <Box pt={2}>
                    <TextField name='color' type='text' label="Color" variant="outlined" fullWidth onChange={handleChange} />
                </Box>
                <Box pt={2} display='flex' justifyContent='flex-end'>
                    <Button variant="contained" color="primary" onClick={() => action(formData, selectedProduct)}>Add</Button>
                </Box>
            </CardContent>
        </Card>
    );
}
