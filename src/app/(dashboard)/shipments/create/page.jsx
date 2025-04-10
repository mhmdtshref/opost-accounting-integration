'use client';

import { useRouter } from "next/navigation";

import { Card, CardContent, CardHeader } from "@mui/material";

import axios from "axios";

import toast from "react-hot-toast";

import { ShipmentForm } from "@/@core/components/shipment/shipment-form";


const CreateProductPage = () => {

    const router = useRouter();

    const createShipment = async (shipment) => {
        axios.post('/api/shipments', shipment)
            .then(res => {
                router.push('/shipments');
            })
            .catch(err => toast.error('حدث خطأ ما, حاول مجددا', {
                    duration: 3000,
                }));
    }

    return <Card sx={{ padding: 2, margin: 2 }}>
        <CardHeader title="اضافة بضاعة" />
        <CardContent>
            <ShipmentForm action={createShipment} />
        </CardContent>
    </Card>
}

export default CreateProductPage;
