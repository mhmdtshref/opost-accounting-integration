import { Box, Card, CardContent, Chip, Typography } from '@mui/material'

export const ProductCard = ({ product }) => {
  return (
    <Card>
      <CardContent dir='rtl'>
        <Typography variant='h6'>{product.name}</Typography>
        <Typography mt={2} variant='body1'>
          شيكل {product.sellPrice}
        </Typography>
        <Box display='flex' justifyContent='center' alignItems='center' mt={2} width='100%' height='100%'>
          <Box
            mt={2}
            width='200px'
            height='260px'
            style={{
              backgroundImage: `url(${product.imageUrl})`,
              backgroundSize: 'contain',
              backgroundRepeat: 'no-repeat'
            }}
          ></Box>
        </Box>
      </CardContent>
    </Card>
  )
}
