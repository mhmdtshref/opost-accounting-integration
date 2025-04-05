import axios from "axios"

export const GET = async (request, { params }) => {
    try {
        const { id } = params;

        const url = `${process.env.OPOST_API_URL}/resources/areas`;
        const res = await axios.get(url, {
            params: {
                city: id
            },
            headers: {
                Authorization: `Bearer ${process.env.OPOST_ACCESS_TOKEN}`,
            }
        })
        return new Response(JSON.stringify({ areas: res?.data[0]?.data?.map(c => ({ value: c.id, label: c.name })) }), {
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (err) {
        return new Response(JSON.stringify({ areas: [] }), {
            headers: { 'Content-Type': 'application/json' },
        });
    }
}
