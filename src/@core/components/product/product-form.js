import { useEffect, useState } from "react";

import { Box, Button, Chip, TextField, Autocomplete } from "@mui/material";

import axios from "axios";

import toast from "react-hot-toast";

import { ImageUploader } from "../image-uploader";

export const ProductForm = ({ product, action }) => {
    const [companies, setCompanies] = useState([]);

    const [formData, setFormData] = useState(product || {
        companyId: null,
        code: '',
        tags: [],
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
            ).catch(err => toast.error('حدث خطأ ما, حاول مجددا', {
                duration: 3000,
            }))
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
                <TextField name='code' type='text' label="الكود" variant="outlined" fullWidth onChange={handleChange} />
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
