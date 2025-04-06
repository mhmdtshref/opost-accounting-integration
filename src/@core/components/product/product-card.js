import { Box, Card, CardContent, Chip, Typography } from "@mui/material"

export const ProductCard = ({ product }) => {
    return (
        <Card>
            <CardContent>
                <Typography variant="h6">Name: {product.name}</Typography>
                <Typography mt={2} variant="body1">NIS {product.sellPrice}</Typography>
                <Box mt={2}>
                    {product.tags.map(tag => (
                        <Chip key={tag} label={tag} size='medium' />
                    ))}
                </Box>
                <Box display='flex' justifyContent='center' alignItems='center' mt={2} width='100%' height='100%'>
                    <Box mt={2} width='200px' height='260px' style={{ backgroundImage: `url(${product.imageUrl})`, backgroundSize: 'contain', backgroundRepeat: 'no-repeat', }}>
                </Box>
                </Box>
            </CardContent>
        </Card>
    )
}
