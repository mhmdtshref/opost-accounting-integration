import axios from 'axios'

import { dbConnect } from '../../../../lib/db-connect'
import { Shipment } from '../../../../models/shipment'
import { Product } from '../../../../models/product'

export const GET = async request => {
  await dbConnect()

  const shipments = await Shipment.aggregate([
    {
      $match: {
        status: 'pending'
      }
    },
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
  ])

  return new Response(JSON.stringify({ shipments }), {
    headers: { 'Content-Type': 'application/json' }
  })
}

export const POST = async request => {
  try {
    await dbConnect()

    const data = await request.json()

    const { content, name, cityId, areaId, address, phone, total, notes, hasReturn } = data

    const products = await Product.find({ _id: { $in: content.map(c => c.productId) } }).select('_id name')

    const contentString = content.map(c => {
      const product = products.find(p => p._id.toString() === c.productId)

      return `name: ${product.name} | size: ${c.size} | color: ${c.color}\n`
    })

    const createShipmentResponse = await axios.post(
      `${process.env.OPOST_API_URL}/resources/shipments`,
      {
        business: Number(process.env.OPOST_BUSINESS_ID),
        business_address: Number(process.env.OPOST_BUSINESS_ADDRESS),
        consignee: {
          name,
          city: cityId,
          area: areaId,
          address,
          phone
        },
        items_description: `${contentString}\n\n${notes}`,
        cod_amount: total,
        has_return: hasReturn || false,
        width: 40,
        height: 40,
        length: 40,
        shipment_types: [
          {
            id: Number(process.env.OPOST_DEFAULT_SHIPMENT_TYPE_ID),
            name: process.env.OPOST_DEFAULT_SHIPMENT_TYPE_NAME
          }
        ],
        quantity: 1,
        box_dimensions: false,
        recipient_can_try_product: false,
        consignee_is_foreign: false
      },
      {
        params: {
          business_id: process.env.OPOST_BUSINESS_ID
        },
        headers: {
          Authorization: `Bearer ${process.env.OPOST_ACCESS_TOKEN}`,
          'Content-Type': 'application/json'
        }
      }
    )

    const externalId = `${createShipmentResponse.data.id}`
    const shipmentFees = createShipmentResponse.data.resource.fees

    const shipment = await Shipment.create({
      content,
      notes,
      total,
      externalId,
      shipmentFees
    })

    return new Response(JSON.stringify({ shipment }), {
      headers: { 'Content-Type': 'application/json' }
    })
  } catch (err) {
    console.log('Error creating shipment:', JSON.stringify(err, null, 2))

    return new Response(JSON.stringify({ error: 'Error creating shipment' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    })
  }
}
