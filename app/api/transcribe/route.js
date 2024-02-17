import {GetTranscriptionJobCommand, StartTranscriptionJobCommand} from "@aws-sdk/client-transcribe";
import { GetObjectCommand } from "@aws-sdk/client-s3";
import {transcribeClient} from '@lib/transcribeClient'
import {s3client} from '@lib/s3Client'


async function streamToString(stream) {
    const chunks = [];
    return new Promise((resolve, reject) => {
      stream.on('data', chunk => chunks.push(Buffer.from(chunk)));
      stream.on('end', () => resolve(Buffer.concat(chunks).toString('utf8')));
      stream.on('error', reject);
    });
  }

export async function getObjectfromS3(filename){
    const command = new GetObjectCommand({
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: filename+"_transcript"+".json",
    });
    let transcriptionFileResponse = null;
    try{
        transcriptionFileResponse = await s3client.send(command)
    }
    catch(err){
        console.error(err);

    }
    if(transcriptionFileResponse){
        return JSON.parse(await streamToString(transcriptionFileResponse.Body));
    }
    return null;
}



async function createTranscription(filename){
    const input = {
        TranscriptionJobName: filename,
        OutputBucketName: process.env.AWS_BUCKET_NAME,
        IdentifyLanguage: true,
        Media: {
                MediaFileUri: `s3://${process.env.AWS_BUCKET_NAME}/${filename}`
            },
        OutputKey: filename+"_transcript"+".json",
    }
    const transcriptionCommand = new StartTranscriptionJobCommand(input);
    try {
        const transcribeResponse = await transcribeClient.send(transcriptionCommand);
        return transcribeResponse;
    }catch(err){
        
        console.error(err);
        return Response.json({ error: 'Failed to create transcription job' }, { status: 500 });
    }
}

async function getTranscriptionJob(filename){
    const input = {
        TranscriptionJobName: filename
    }
    let transcriptionJobResponse = null;
    const transcriptionCommand = new GetTranscriptionJobCommand(input);
    try {
        transcriptionJobResponse = await transcribeClient.send(transcriptionCommand);
       
    }catch(err){
        console.error(err);
        return Response.json({error: err})
    }
    return transcriptionJobResponse;
}



export async function GET(req){
    try{
        const url = new URL(req.url);
        const filename = new URLSearchParams(url.search).get('filename');

        const transcription = await getObjectfromS3(filename);
        if(transcription){
            return Response.json({
                status: 'COMPLETED',
                transcription
            })
        }
        const  jobExist = await getTranscriptionJob(filename);
        if(jobExist){
            return Response.json({
                status: jobExist.TranscriptionJob.TranscriptionJobStatus,
            })    
        }
        if(!jobExist){
            const newJob = await createTranscription(filename);
            return Response.json({
                status: newJob.TranscriptionJob.TranscriptionJobStatus,
            })
        }
    }catch(err){
        console.error(err);
        return Response.json({error: err})
    }
    return Response.json(null)
}
