import { Box, Card, CardContent, Chip, Typography } from "@mui/material"

export const CompanyCard = ({ company }) => {
    return (
        <Card>
            <CardContent>
                <Box>
                    <Typography variant="h4">Name: {company.name}</Typography>
                </Box>
                <Box>
                    {company.tags.map(tag => (
                        <Chip color='primary' key={tag} label={tag} />
                    ))}
                </Box>
            </CardContent>
        </Card>
    )
}
