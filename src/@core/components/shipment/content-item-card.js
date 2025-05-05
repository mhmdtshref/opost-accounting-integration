import { Box, Card, CardContent, Chip, Typography } from '@mui/material'

export const ContentItemCard = ({ contentItem, product, onRemove }) => {
  return (
    <Card>
      <CardContent>
        <Box display='flex' justifyContent='space-between' alignItems='center'>
          <Chip label='حذف' color='error' onClick={onRemove} />
        </Box>
        <Typography variant='h6'>Name: {product.name}</Typography>
        <Box
          mt={2}
          width='200px'
          height='200px'
          style={{ backgroundImage: `url(${product.imageUrl})`, backgroundSize: 'cover' }}
        ></Box>
        <Box>
          <Typography variant='body1'>Size: {contentItem.size}</Typography>
          <Typography variant='body1'>Color: {contentItem.color}</Typography>
        </Box>
      </CardContent>
    </Card>
  )
}
