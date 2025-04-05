
import { NextResponse } from "next/server";

import { v4 as uuidv4 } from 'uuid';
import { S3 } from "aws-sdk";

export const POST = async (request) => {
  try {
    const formData = await request.formData();
    const file = formData.get("file");

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // const filedata = new Blob([buffer], { type: file.type });
    const filename = file.name || `file-${uuidv4()}`;
    const filetype = file.type || "application/octet-stream";

    if (!file) {
      return NextResponse.json({ message: "No file provided" }, { status: 400 });
    }

    const s3 = new S3({
      accessKeyId: process.env.FILES_BUCKET_ACCESS_KEY_ID,
      secretAccessKey: process.env.FILES_BUCKET_SECRET_ACCESS_KEY,
      region: process.env.FILES_BUCKET_REGION,
    });

    const params = {
      Bucket: process.env.FILES_BUCKET_NAME,
      Key: `products/${uuidv4()}-${filename}`,
      Body: buffer,
      ContentType: filetype
    };

    const uploadResult = await s3.upload(params).promise();

    return NextResponse.json({ url: uploadResult.Location });
  } catch (error) {
    console.error("Error uploading file:", error);
    
return NextResponse.json({ message: "File upload failed" }, { status: 500 });
  }
}
