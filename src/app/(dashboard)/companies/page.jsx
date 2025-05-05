'use client'

import { useRouter } from 'next/navigation'

import { Box, Button, Typography } from '@mui/material'

import { CompaniesList } from '@/@core/components/company/companies-list'

export default function Companies() {
  const router = useRouter()

  return (
    <Box>
      <Box display='flex' justifyContent='space-between' alignItems='center' marginBottom={4}>
        <Typography variant='h4'>الشركات</Typography>
        <Button variant='contained' color='primary' onClick={() => router.push('/companies/create')}>
          اضافة شركة
        </Button>
      </Box>
      <Box>
        <CompaniesList />
      </Box>
    </Box>
  )
}
