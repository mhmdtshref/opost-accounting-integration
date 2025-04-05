import axios from "axios"

export const GET = async () => {
    try {
        const url = `${process.env.OPOST_API_URL}/resources/cities`;

        const res = await axios.get(url, {
            headers: {
                Authorization: `Bearer ${process.env.OPOST_ACCESS_TOKEN}`,
            }
        })

        
return new Response(JSON.stringify({ cities: res?.data[0]?.data?.map(c => ({ value: c.id, label: c.name })) }), {
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (err) {
        return new Response(JSON.stringify({ cities: [] }), {
            headers: { 'Content-Type': 'application/json' },
        });
    }
}
