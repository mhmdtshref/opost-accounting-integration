'use client'

import { useRouter } from 'next/navigation'

import { Card, CardContent, CardHeader } from '@mui/material'

import axios from 'axios'

import toast from 'react-hot-toast'

import { ProductForm } from '@/@core/components/product/product-form'

const CreateProductPage = () => {
  const router = useRouter()

  const createProduct = async product => {
    axios
      .post('/api/products', product)
      .then(res => {
        router.push('/home')
      })
      .catch(err => {
        toast.error('حدث خطأ ما, حاول مجددا', {
          duration: 3000
        })
      })
  }

  return (
    <Card sx={{ padding: 2, margin: 2 }}>
      <CardHeader title='اضافة بضاعة' />
      <CardContent>
        <ProductForm action={createProduct} />
      </CardContent>
    </Card>
  )
}

export default CreateProductPage
