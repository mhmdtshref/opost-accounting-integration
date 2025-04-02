'use client'

import { useRouter } from "next/navigation";

import { Box, Button, Typography } from "@mui/material";

import { ProductSearch } from "@/@core/components/product/product-search";

export default function Products() {

  const router = useRouter();

  return (
    <Box>
      <Box display='flex' justifyContent='space-between' alignItems='center' marginBottom={4}>
        <Typography variant="h4">Products</Typography>
        <Button variant="contained" color="primary" onClick={() => router.push('/products/create')}>Add Product</Button>
      </Box>
      <Box>
        <ProductSearch />
      </Box>
    </Box>
  )
}
