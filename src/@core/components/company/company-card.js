import { Box, Card, CardContent, Typography } from "@mui/material"

export const CompanyCard = ({ company }) => {
    return (
        <Card>
            <CardContent>
                <Box>
                    <Typography variant="h4">Name: {company.name}</Typography>
                </Box>
            </CardContent>
        </Card>
    )
}
