import axios from 'axios'

const getConsigneesByPhone = async phone => {
  const url = `${process.env.OPOST_API_URL}/resources/related/shipments/consignee`

  const res = await axios.get(url, {
    params: {
      phone,
      limit: 5,
      'is-search': 1
    },
    headers: {
      Authorization: `Bearer ${process.env.OPOST_ACCESS_TOKEN}`
    }
  })

  return res?.data?.data?.map(c => ({
    id: c.id,
    name: c.name,
    phone: c.phone,
    phone2: c.phone2,
    address: c.address,
    cityName: c['city.name'],
    areaName: c['area.name']
  }))
}

export const GET = async request => {
  try {
    const searchParams = request.nextUrl.searchParams
    const phone = searchParams.get('phone')

    const consignees = await getConsigneesByPhone(phone)

    return new Response(JSON.stringify({ consignees }), {
      headers: { 'Content-Type': 'application/json' }
    })
  } catch (err) {
    return new Response(JSON.stringify({ cities: [] }), {
      headers: { 'Content-Type': 'application/json' }
    })
  }
}
