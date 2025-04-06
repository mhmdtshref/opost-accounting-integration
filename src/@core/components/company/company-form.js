import { useState } from "react";

import { Box, Button, TextField } from "@mui/material";

export const CompanyForm = ({ company, action }) => {
    const [formData, setFormData] = useState(company || {
        name: ''
    });

    // const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    }

    return (
        <Box>
            <Box display='flex' justifyContent='space-between' gap={2}>
                <TextField name='name' label="اسم الشركة" variant="outlined" onChange={handleChange} fullWidth />
            </Box>
            <Box pt={4} display='flex' justifyContent='flex-end' gap={2}>
                <Button variant="contained" color="primary" onClick={() => action(formData)}>اضافة</Button>
            </Box>
        </Box>
    );
}
