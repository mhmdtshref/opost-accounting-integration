import { dbConnect } from "../../../../lib/db-connect";
import { Product } from "../../../../models/product";
import { Shipment } from "../../../../models/shipment";

export const GET = async (request) => {

    await dbConnect();

    const shipments = await Shipment.aggregate([
        {
            $lookup: {
                from: 'products',
                localField: 'content.productId',
                foreignField: '_id',
                as: 'productDetails'
            }
        },
        {
            $addFields: {
                content: {
                    $map: {
                        input: '$content',
                        as: 'item',
                        in: {
                            $mergeObjects: [
                                '$$item',
                                {
                                    product: {
                                        $arrayElemAt: [
                                            {
                                                $filter: {
                                                    input: '$productDetails',
                                                    as: 'product',
                                                    cond: { $eq: ['$$product._id', '$$item.productId'] }
                                                }
                                            },
                                            0
                                        ]
                                    }
                                }
                            ]
                        }
                    }
                }
            }
        },
        {
            $project: {
                productDetails: 0
            }
        }
    ]);

    
return new Response(JSON.stringify({ shipments }), {
        headers: { 'Content-Type': 'application/json' },
    });
}

export const POST = async (request) => {

    await dbConnect();

    const data = await request.json();

    const {
        content,
        notes,
        price
    } = data;

    const externalId = 'test-external-id'; // TODO: Generate a unique external ID

    const shipment = await Shipment.create({
        content,
        notes,
        price,
        externalId
    });

    return new Response(JSON.stringify({ shipment }), {
        headers: { 'Content-Type': 'application/json' },
    });
}
