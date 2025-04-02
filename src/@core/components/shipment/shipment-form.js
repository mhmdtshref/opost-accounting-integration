import { useEffect, useState } from "react";

import { useRouter } from "next/navigation";

import { Box, Button, Chip, Dialog, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material";
import axios from "axios";

import { ContentItemCard } from "./content-item-card";
import { ContentItemForm } from "./content-item-form";

export const ShipmentForm = ({ shipment, action }) => {
    const router = useRouter();
    const [products, setProducts] = useState([]);
    const [selectedProductsMap, setSelectedProductsMap] = useState({});
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const [formData, setFormData] = useState(shipment || {
        content: [],
        notes: ''
    });

    // const [errors, setErrors] = useState({});

    useEffect(() => {
        axios.get('/api/products')
            .then(productsResponse => {
                setProducts(productsResponse.data.products || [])
            }
            ).catch(err => console.log(err));
    }, []);
    
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    }

    const handleAddProduct = (value) => {
        setFormData({
            ...formData,
            content: [...formData.content, value]
        });
    }

    const handleRemoveProduct = (index) => {
        setFormData({
            ...formData,
            content: formData.content.filter((_, currIndex) => currIndex !== index)
        });
    }

    const createShipment = async (product) => {
        await action(formData);
    }


    return (
        <>
            <Box>
                <Box pt={2}>
                    <Box>
                        <Typography variant="h6">Content</Typography>
                    </Box>
                    <Box>
                        <Button variant="outlined" color="primary" onClick={() => setIsDialogOpen(true)}>
                            Select
                        </Button>
                    </Box>
                    <Box>
                        {formData.content.map((contentItem, i) => (
                            <ContentItemCard
                                key={i}
                                product={selectedProductsMap[contentItem.productId]}
                                contentItem={contentItem}
                                onRemove={() => handleRemoveProduct(i)}
                            />
                        ))}
                    </Box>
                </Box>
                <Box pt={2}>
                    <TextField name='notes' label="Notes" variant="outlined" fullWidth onChange={handleChange} />
                </Box>
                <Box pt={2} display='flex' justifyContent='flex-end'>
                    <Button variant="contained" color="primary" onClick={createShipment}>Create</Button>
                </Box>
            </Box>
            <Dialog open={isDialogOpen} onClose={() => ''} fullScreen>
                <ContentItemForm products={products} action={(conentItemData, prod) => {
                    handleAddProduct(conentItemData);
                    setSelectedProductsMap({
                        ...selectedProductsMap,
                        [prod._id]: prod
                    });
                    setIsDialogOpen(false);
                }} />
            </Dialog>
        </>
    );
}
