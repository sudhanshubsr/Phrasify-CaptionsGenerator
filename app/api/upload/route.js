import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { v4 as uuidv4 } from 'uuid';

export async function POST(req) {
  try {
    const formData = await req.formData();
    const file = formData.get('file');
    const { name, type } = file;

    const id = uuidv4();
    const ext = name.split('.').pop();
    const newName = `${id}.${ext}`;

    const client = new S3Client({
      region: process.env.AWS_REGION,
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      },
    });

    const command = new PutObjectCommand({
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: newName,
      ACL: 'public-read',
      ContentType: type,
    });

    // Generate a pre-signed URL with an expiration time
    const signedUrl = await getSignedUrl(client, command, { expiresIn: 60 }); // 60 seconds expiration
    // Return the signed URL to the client
    return new Response(
      JSON.stringify({ signedUrl, newName }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ message: `Internal Server Error in Uploading File: ${error.message}` }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }
}
