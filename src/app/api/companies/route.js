import { dbConnect } from "../../../../lib/db-connect";
import { Company } from "../../../../models/company";
import { GlobalConfig } from "../../../../models/global-config";

export const GET = async () => {

    try {
        await dbConnect();

        const companies = await Company.find();

        return new Response(JSON.stringify({ companies }), {
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        console.error('Error fetching companies:', error);
        
return new Response(JSON.stringify({ error: 'فشل تحميل الشركات' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}

export const POST = async (request) => {
    try {
        const body = await request.json();

        await dbConnect();

        const globalConfig = await GlobalConfig.findOne({});
        
        if (globalConfig) {
            const newGlobalTagsSet = new Set([
                ...(globalConfig.tags || []),
                body.name,
                ...body.tags
            ]);

            globalConfig.tags = Array.from(newGlobalTagsSet);
            await globalConfig.save();
        }

        const company = new Company(body);

        await company.save();

        return new Response(JSON.stringify({ company }), {
            headers: { 'Content-Type': 'application/json' },
        }); 
    } catch (error) {
        console.error('Error creating company:', error);
        
return new Response(JSON.stringify({ error: 'فشل انشاء الشركة' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}
