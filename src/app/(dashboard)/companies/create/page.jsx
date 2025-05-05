'use client'

import { useRouter } from 'next/navigation'

import { Card, CardContent, CardHeader } from '@mui/material'
import axios from 'axios'

import { CompanyForm } from '@/@core/components/company/company-form'

const CreateProductPage = () => {
  const router = useRouter()

  const createCompany = async company => {
    axios
      .post('/api/companies', company)
      .then(res => {
        router.push('/companies')
      })
      .catch(err => {
        console.log('err:', err)
      })
  }

  return (
    <Card sx={{ padding: 2, margin: 2 }}>
      <CardHeader title='اضافة شركة' />
      <CardContent>
        <CompanyForm action={createCompany} />
      </CardContent>
    </Card>
  )
}

export default CreateProductPage
