import { useState } from "react";

import { Box, Button, Chip, TextField } from "@mui/material";

export const CompanyForm = ({ company, action }) => {
    const [formData, setFormData] = useState(company || {
        name: '',
        tags: []
    });

    // const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    }

    const handleAddTag = (value) => {
        const preparedValue = value.trim();

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

    return (
        <Box>
            <Box display='flex' justifyContent='space-between' gap={2}>
                <TextField name='name' label="اسم الشركة" variant="outlined" onChange={handleChange} fullWidth />
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
            <Box pt={4} display='flex' justifyContent='flex-end' gap={2}>
                <Button variant="contained" color="primary" onClick={() => action(formData)}>اضافة</Button>
            </Box>
        </Box>
    );
}
