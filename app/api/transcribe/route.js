import {
  GetTranscriptionJobCommand,
  StartTranscriptionJobCommand,
} from "@aws-sdk/client-transcribe";
import { GetObjectCommand } from "@aws-sdk/client-s3";
import { transcribeClient } from "@lib/transcribeClient";
import { s3client } from "@lib/s3Client";

async function streamToString(stream) {
  const chunks = [];
  return new Promise((resolve, reject) => {
    stream.on("data", (chunk) => chunks.push(Buffer.from(chunk)));
    stream.on("end", () => resolve(Buffer.concat(chunks).toString("utf8")));
    stream.on("error", reject);
  });
}

export async function getObjectfromS3(filename) {
  const command = new GetObjectCommand({
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: filename + "_transcript" + ".json",
  });
  let transcriptionFileResponse = null;
  try {
    transcriptionFileResponse = await s3client.send(command);
  } catch (err) {
    console.error(err);
  }
  if (transcriptionFileResponse) {
    const finalOutput = JSON.parse(
      await streamToString(transcriptionFileResponse.Body)
    );
    return finalOutput;
  }
  return null;
}

async function createTranscription(filename) {
  console.log("create Transcription entered");
  const input = {
    TranscriptionJobName: filename,
    OutputBucketName: process.env.AWS_BUCKET_NAME,
    IdentifyLanguage: true,
    Media: {
      MediaFileUri: `s3://${process.env.AWS_BUCKET_NAME}/${filename}`,
    },
    OutputKey: filename + "_transcript" + ".json",
  };
  const transcriptionCommand = new StartTranscriptionJobCommand(input);
  try {
    const transcribeResponse = await transcribeClient.send(
      transcriptionCommand
    );
    console.log("transcribeResponse", transcribeResponse);
    return transcribeResponse;
  } catch (err) {
    console.error(err);
    return Response.json(
      { error: "Failed to create transcription job" },
      { status: 500 }
    );
  }
}

async function getTranscriptionJob(filename) {
  console.log("getTranscriptionJob entered");
  const input = {
    TranscriptionJobName: filename,
  };
  let transcriptionJobResponse = null;
  const transcriptionCommand = new GetTranscriptionJobCommand(input);
  try {
    transcriptionJobResponse = await transcribeClient.send(
      transcriptionCommand
    );
  } catch (err) {
    console.error(err);
    return Response.json({ error: err });
  }
  return transcriptionJobResponse;
}

export async function GET(req) {
  const url = new URL(req.url);
  const filename = url.searchParams.get("filename");
  const existingTranscription = await getTranscriptionJob(filename);
  if(!existingTranscription.TranscriptionJob){
    return Response.json({status: "NOT_FOUND"});
  }
else if(existingTranscription){
    if(existingTranscription.TranscriptionJob.TranscriptionJobStatus === "IN_PROGRESS"){
        return Response.json({status: "IN_PROGRESS"});
    }
    else if(existingTranscription.TranscriptionJob.TranscriptionJobStatus === "COMPLETED"){
        const transcription = await getObjectfromS3(filename);
        return Response.json(transcription)
    }
}
 
}



export async function POST(req) {
    const url = new URL(req.url);
    const filename = url.searchParams.get("filename");
    const res = await createTranscription(filename);
    return Response.json({status: res.TranscriptionJob.TranscriptionJobStatus});
}