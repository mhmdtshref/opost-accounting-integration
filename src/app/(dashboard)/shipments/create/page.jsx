'use client';

import { useRouter } from "next/navigation";

import { Card, CardContent, CardHeader } from "@mui/material";

import axios from "axios";

import { ShipmentForm } from "@/@core/components/shipment/shipment-form";


const CreateProductPage = () => {

    const router = useRouter();

    const createShipment = async (shipment) => {
        axios.post('/api/shipments', shipment)
            .then(res => {
                router.push('/shipments');
            })
            .catch(err => {
                console.log('err:', err);
            });
    }

    return <Card sx={{ padding: 2, margin: 2 }}>
        <CardHeader title="Create Product" />
        <CardContent>
            <ShipmentForm action={createShipment} />
        </CardContent>
    </Card>
}

export default CreateProductPage;
