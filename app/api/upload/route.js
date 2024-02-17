import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { v4 as uuidv4 } from 'uuid';


export async function POST(req){
  
    const formData = await req.formData();
    const file = formData.get('file');
    const {name, type} = file;
    const data = await file.arrayBuffer();

  const id = uuidv4();
  const ext = name.split(".").slice(-1);
  const newName = `${id}.${ext}`;

  const client = new S3Client({
    region: process.env.AWS_REGION,
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
  });

  const uploadCommand = new PutObjectCommand({
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: newName,
    Body: data,
    ACL: "public-read",
    ContentType: type,
  });

    const res = await client.send(uploadCommand);

    return Response.json({newName, id, ext});
}
