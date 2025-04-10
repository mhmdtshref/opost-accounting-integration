import { useEffect, useState } from "react";

import { useRouter } from "next/navigation";

import { Autocomplete, Box, Button, Chip, FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import axios from "axios";

import { ImageUploader } from "../image-uploader";

export const ProductForm = ({ product, action }) => {
    const router = useRouter();
    const [companies, setCompanies] = useState([]);

    const [formData, setFormData] = useState(product || {
        companyId: null,
        code: '',
        tags: [],
        price: '',
        sellPrice: '',
        imageUrl: ''
    });

    const [loadingCompaniesStatus, setLoadingCompaniesStatus] = useState('none');

    // const [errors, setErrors] = useState({});

    useEffect(() => {
        if (loadingCompaniesStatus === 'none') {
            axios.get('/api/companies')
            .then(companiesResponse => {
                setCompanies(companiesResponse.data?.companies || [])
            }
            ).catch(err => console.log(err))
            .finally(() => {
                setLoadingCompaniesStatus('ready');
            });
        }
    }, [loadingCompaniesStatus]);
    
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

    return (
        <Box>
            <Box pt={2}>
                <Autocomplete
                    options={companies}
                    renderInput={(params) => <TextField {...params} label="الشركة" variant="outlined" />}
                    getOptionLabel={(option) => option?.name}
                    getOptionKey={(option) => `${option._id}-${option.name}`}
                    onChange={(_, newValue) => {
                        setFormData({
                            ...formData,
                            companyId: newValue
                        });
                    }}
                    value={formData.companyId}
                    sx={{ mt: 2 }}
                />
            </Box>
            <Box pt={2}>
                <TextField name='tags' label="الكلمات المفتاحية" variant="outlined" fullWidth onKeyUp={(e) => {
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
                <TextField name='price' type='number' label="السعر" variant="outlined" fullWidth onChange={handleChange} />
            </Box>
            <Box pt={2}>
                <TextField name='sellPrice' type='number' label="سعر البيع" variant="outlined" fullWidth onChange={handleChange} />
            </Box>
            <Box pt={2}>
                <ImageUploader name={'imageUrl'} title='الصورة' value={formData.imageUrl} onChange={(value) => setFormData({ ...formData, imageUrl: value })} />
            </Box>
            <Box pt={4} display='flex' justifyContent='flex-end' gap={2}>
                <Button variant="contained" color="primary" onClick={createAndViewProducts}>اضافة</Button>
            </Box>
        </Box>
    );
}
