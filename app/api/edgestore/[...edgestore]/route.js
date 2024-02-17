import { initEdgeStore } from "@edgestore/server";
import { createEdgeStoreNextHandler } from "@edgestore/server/adapters/next/app";
import { AWSProvider } from "@edgestore/server/providers/aws";
const es = initEdgeStore.create();

const edgeStoreRouter = es.router({
  phrasifyVideos: es.fileBucket(),
});

const handler = createEdgeStoreNextHandler({
  router: edgeStoreRouter,
  provider: AWSProvider({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    bucketName: process.env.AWS_BUCKET_NAME,
    region: process.env.AWS_REGION,
    ACL: "public-read",
    
  }),
});

export { handler as GET, handler as POST };

export const EdgeStoreRouter = edgeStoreRouter;
