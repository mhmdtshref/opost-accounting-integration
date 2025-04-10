import { ShipmentStatuses } from "@/@core/constants/shipment";
import { dbConnect } from "../../../../../../lib/db-connect";
import { Shipment } from "../../../../../../models/shipment";

export const PATCH = async (_request, { params }) => {
    try {
        await dbConnect();

        const { id } = params;

        const shipment = await Shipment.findById(id);

        if (!shipment) {
            return new Response(JSON.stringify({ error: 'Shipment not found' }), {
                status: 404,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        shipment.status = ShipmentStatuses.DONE;
        await shipment.save();

        return new Response(JSON.stringify({ shipment }), {
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (err) {
        console.log('Error solving shipment:', JSON.stringify(err, null, 2));
        
return new Response(JSON.stringify({ error: 'Error solving shipment' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}
