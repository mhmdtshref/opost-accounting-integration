import { dbConnect } from "../../../../lib/db-connect";
import { Company } from "../../../../models/company";
import { Product } from "../../../../models/product";

export const GET = async (request) => {

    await dbConnect();
    const { searchParams } = new URL(request.url);
    const search = searchParams.get('search');

    const products = await Product.find({ name: { $regex: search || '', $options: 'i' } });

    return new Response(JSON.stringify({ products }), {
        headers: { 'Content-Type': 'application/json' },
    });
}

export const POST = async (request) => {

    await dbConnect();

    const data = await request.json();

    const company = await Company.findById(data.companyId);

    if (!company) {
        return new Response(JSON.stringify({ error: 'Company not found' }), {
            status: 404,
            headers: { 'Content-Type': 'application/json' },
        });
    }

    const product = await Product.create({
        name: `${company.name} ${data.code}`,
        searchString: `${company.name.toLowerCase()} ${company.tags.join(' ')} ${data.code.toLowerCase()} ${data.tags.join(' ').toLowerCase()}`,
        ...data,
    });

    return new Response(JSON.stringify({ product }), {
        headers: { 'Content-Type': 'application/json' },
    });
}
