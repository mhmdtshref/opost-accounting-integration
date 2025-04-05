import { useEffect, useState } from "react";

import { useRouter } from "next/navigation";

import { Box, Button, Chip, FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import axios from "axios";
import { ImageUploader } from "../image-uploader";

export const ProductForm = ({ product, action }) => {
    const router = useRouter();
    const [companies, setCompanies] = useState([]);

    const [formData, setFormData] = useState(product || {
        companyId: '',
        code: '',
        tags: [],
        price: '',
        sellPrice: '',
        imageUrl: ''
    });

    // const [errors, setErrors] = useState({});

    useEffect(() => {
        axios.get('/api/companies')
            .then(companiesResponse => {
                setCompanies(companiesResponse.data.companies || [])
            }
            ).catch(err => console.log(err));
    }, []);
    
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    }

    const handleAddTag = (value) => {
        const preparedValue = value.trim().toLowerCase();

        if (preparedValue === '' || formData.tags.includes(preparedValue)) {
            return
        }

        setFormData({
            ...formData,
            tags: [...formData.tags, preparedValue]
        });
    }

    const handleRemoveTag = (value) => {
        setFormData({
            ...formData,
            tags: formData.tags.filter(tag => tag !== value)
        });
    }

    const createAndViewProducts = async (product) => {
        await action(formData);
        router.push('/')
    }

    const createAndAddNew = async (product) => {
        await action(formData);
        setFormData({
            companyId: '',
            code: '',
            tags: [],
            price: '',
            sellPrice: '',
            imageUrl: ''
        });
    }


    return (
        <Box>
            <Box display='flex' justifyContent='space-between' gap={2}>
                <FormControl fullWidth>
                    <InputLabel id="company-select-label">Company</InputLabel>
                    <Select name='companyId' value={formData.companyId} labelId='company-select-label' label='Company' variant='outlined' onChange={handleChange}>
                        {companies.map(company => (
                            <MenuItem key={company._id} value={company._id}>{company.name} </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <TextField name='code' label="Code" variant="outlined" onChange={handleChange} fullWidth />
            </Box>
            <Box pt={2}>
                <TextField name='tags' label="Tags" variant="outlined" fullWidth onKeyUp={(e) => {
                    if (e.key === 'Enter') {
                        handleAddTag(e.target.value)
                        e.target.value = '';
                    }
                }}
                />
                <Box>
                    {formData.tags.map(tag => (
                        <Chip color='primary' key={tag} label={tag} onDelete={() => handleRemoveTag(tag)} />
                    ))}
                </Box>
            </Box>
            <Box pt={2}>
                <TextField name='price' type='number' label="Price" variant="outlined" fullWidth onChange={handleChange} />
            </Box>
            <Box pt={2}>
                <TextField name='sellPrice' type='number' label="Sell Price" variant="outlined" fullWidth onChange={handleChange} />
            </Box>
            <Box pt={2}>
                <ImageUploader name={'imageUrl'} title='Image' value={formData.imageUrl} onChange={(value) => setFormData({ ...formData, imageUrl: value })} />
            </Box>
            <Box pt={4} display='flex' justifyContent='flex-end' gap={2}>
                <Button variant="contained" color="primary" onClick={createAndViewProducts}>Create & View Prodcuts</Button>
                <Button variant="contained" color="primary" onClick={createAndAddNew}>Create & Add New</Button>
            </Box>
        </Box>
    );
}
