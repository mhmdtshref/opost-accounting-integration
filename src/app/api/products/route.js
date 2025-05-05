import { dbConnect } from '../../../../lib/db-connect'
import { Company } from '../../../../models/company'
import { GlobalConfig } from '../../../../models/global-config'
import { Product } from '../../../../models/product'

export const GET = async request => {
  await dbConnect()
  const searchParams = request.nextUrl.searchParams
  const tags = searchParams.get('tags')

  const filter = {}

  if (tags && tags.length) {
    const tagsArray = tags.split(',')

    filter.tags = { $all: tagsArray }
  }

  const products = await Product.find(filter).limit(12)

  return new Response(JSON.stringify({ products }), {
    headers: { 'Content-Type': 'application/json' }
  })
}

export const POST = async request => {
  try {
    await dbConnect()

    const data = await request.json()

    const company = await Company.findById(data.companyId)

    if (!company) {
      return new Response(JSON.stringify({ error: 'Company not found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' }
      })
    }

    const name = `${company.name} ${data.code}`

    const tags = [...data.tags.map(tag => tag.toLowerCase()), ...company.tags, company.name, name]

    const globalConfig = await GlobalConfig.findOne({})

    if (globalConfig) {
      const newGlobalTagsSet = new Set([...(globalConfig.tags || []), ...tags])

      globalConfig.tags = Array.from(newGlobalTagsSet)
      await globalConfig.save()
    }

    const product = await Product.create({
      ...data,
      name,
      tags
    })

    return new Response(JSON.stringify({ product }), {
      headers: { 'Content-Type': 'application/json' }
    })
  } catch (error) {
    console.error('error:', JSON.stringify(error, null, 2))

    return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    })
  }
}
