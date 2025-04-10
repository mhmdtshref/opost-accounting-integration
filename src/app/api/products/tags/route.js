import { dbConnect } from "../../../../../lib/db-connect";
import { GlobalConfig } from "../../../../../models/global-config";

export const GET = async (request) => {
    await dbConnect();

    const globalConfig = await GlobalConfig.findOne();

    if (!globalConfig) {
        return new Response(JSON.stringify({ error: 'Global config not found' }), {
            status: 404,
            headers: { 'Content-Type': 'application/json' },
        });
    }

    const tags = globalConfig.tags;

    if (!tags) {
        return new Response(JSON.stringify({ error: 'Tags not found' }), {
            status: 404,
            headers: { 'Content-Type': 'application/json' },
        });
    }
    
    return new Response(JSON.stringify({ tags }), {
        headers: { 'Content-Type': 'application/json' },
    });
}
