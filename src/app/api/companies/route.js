import { dbConnect } from "../../../../lib/db-connect";
import { Company } from "../../../../models/company";

export const GET = async () => {

    await dbConnect();

    const companies = await Company.find();

    return new Response(JSON.stringify({ companies }), {
        headers: { 'Content-Type': 'application/json' },
    });
}
