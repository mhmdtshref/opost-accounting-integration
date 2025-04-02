"use client"
import { useEffect, useState } from "react";

import { useRouter } from "next/navigation";

import { Box, Button, List, ListItem, ListItemText, Typography } from "@mui/material";
import axios from "axios";

const ShipmentsList = () => {
    const [shipments, setShipments] = useState([]);
    const router = useRouter();

    useEffect(() => {
        axios.get('/api/shipments')
            .then(shipmentsResponse => {
                setShipments(shipmentsResponse.data.shipments || [])
            }).catch(err => console.log(err));
    },  []);

    return (
        <Box>
            <Box pt={2}>
                <Box>
                    <Typography variant="h6">Shipments</Typography>
                    <Button variant="contained" color="primary" onClick={() => router.push('/shipments/create')}>Create Shipment</Button>
                </Box>
                <Box display='flex' flexWrap='wrap' gap={2} marginTop={8}>
                    {shipments.map(shipment => (
                        <Box key={shipment._id} width={'240px'} style={{ border: '1px solid #ccc', borderRadius: '8px', padding: '16px' }}>
                            <Typography variant="h6">{shipment.externalId}</Typography>
                            <Typography variant="body1">Status: {shipment.status}</Typography>
                            <Box>
                            <Typography variant="body1">Content: </Typography>
                            <List>
                                {shipment.content.map(contentItem => (
                                    <ListItem key={contentItem._id} style={{ padding: '0px', margin: '0px' }}>
                                        <ListItemText primary={<Typography variant="body2">{contentItem.product.name}</Typography>} secondary={<Typography variant="body2">Size: {contentItem.size} | Color: {contentItem.color}</Typography>} />
                                    </ListItem>
                                ))}
                            </List>
                            </Box>
                                
                        </Box>
                    ))}
                </Box>
            </Box>
        </Box>
    )
}

export default ShipmentsList;
