'use client';

import { useEffect, useState } from "react"

import { Box, CircularProgress, Grid2, TextField } from "@mui/material"
import axios from "axios";

import toast from "react-hot-toast";

import { CompanyCard } from "./company-card";

export const CompaniesList = ({ companies: comps }) => {

    const [companies, setCompanies] = useState(comps || []);
    const [filteredCompanies, setFilteredCompanies] = useState(comps || []);
    const [search, setSearch] = useState('');
    const [loadingStatus, setLoadingStatus] = useState('none');

    useEffect(() => {
        if (!comps && loadingStatus === 'none') {
            axios.get(`/api/companies?search=${search}`)
            .then(companiesResponse => {
                setCompanies(companiesResponse.data.companies || [])
                setFilteredCompanies(companiesResponse.data.companies || []);
            }).catch(err => toast.error('حدث خطأ ما, حاول مجددا', {
                    duration: 3000,
                }))
            .finally(() => {
                setLoadingStatus('ready');
            });
        }

        if (comps) {
            setLoadingStatus('ready');
        }
    }, [companies, search, loadingStatus, comps]);

    const handleSearch = (e) => {
        setSearch(e.target.value);

        const searchArr = e.target.value.toLowerCase().split(' ')
        .map((word) => word.trim())
        .filter((word) => word !== '');

        const newFilteredCompanies = companies.filter(company => {
            const searchString = company.name.toLowerCase();

            
return searchArr.every((word) => searchString.includes(word));
        });

        setFilteredCompanies(newFilteredCompanies);
    }

    return (
        <Box>
            <Box>
                <TextField label="البحث" variant="outlined" fullWidth onChange={handleSearch} />
            </Box>
            {loadingStatus === 'ready' ? <Box display='flex' flexWrap='wrap' gap={2} marginTop={8}>
                {filteredCompanies.map(company => (
                    <Grid2 key={company._id} size={{ xs: 12, sm: 12, md: 3, lg: 3, xl: 3 }} display='flex' justifyContent='center' alignItems='center' width={'100%'}>
                    <Box key={company._id} width={'100%'} onClick={() => {
                    }}>
                        <CompanyCard company={company} />
                    </Box>
                    </Grid2>
                ))}
            </Box> : (
                <Box display='flex' justifyContent='center' alignItems='center' p={8} width='100%' height='100%'>
                    <CircularProgress />
                </Box>
            )}
        </Box>
    )
}
