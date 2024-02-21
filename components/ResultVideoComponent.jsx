import React, { useEffect, useRef, useState} from 'react'
import ReactPlayer from 'react-player'
import  SparklesIcon  from '../icons/sparklesIcon'
import styles from '@styles/fileediting.module.css'
import { FFmpeg } from '@ffmpeg/ffmpeg'
import { fetchFile, toBlobURL } from '@ffmpeg/util'
import { transcriptionItemsToSrt } from '@/lib/helperfunctions'

import montserrat from "@/fonts/Montserrat-Regular.ttf"
import montserratBold from "@/fonts/Montserrat-Bold.ttf"

const ResultVideoComponent = ({filename, transcriptionItems}) => {

  const [loaded, setLoaded] = useState(false);
  const ffmpegRef = useRef(new FFmpeg());
  const videoRef = useRef(null);
  const videoUrl = `https://phrasify-uploads.s3.ap-south-1.amazonaws.com/${filename}`;


  useEffect(()=>{
    videoRef.current.src = videoUrl;
    load();
  },[])


  const load = async () => {
    const baseURL = 'https://unpkg.com/@ffmpeg/core@0.12.6/dist/umd'
    const ffmpeg = ffmpegRef.current;

    ffmpeg.on('log', ({ message }) => {
      console.log(message);
  });

    await ffmpeg.load({
        coreURL: await toBlobURL(`${baseURL}/ffmpeg-core.js`, 'text/javascript'),
        wasmURL: await toBlobURL(`${baseURL}/ffmpeg-core.wasm`, 'application/wasm'),
    });

    await ffmpeg.writeFile('/tmp/montserrat.ttf', await fetchFile(montserrat));
    await ffmpeg.writeFile('/tmp/montserrat-bold.ttf', await fetchFile(montserratBold));
    setLoaded(true);
}

const generateCaptions = async () => {
  const ffmpeg = ffmpegRef.current;
  const srt = transcriptionItemsToSrt(transcriptionItems);
  await ffmpeg.writeFile(filename, await fetchFile(videoUrl));
  await ffmpeg.writeFile('captions.srt', srt);
  videoRef.current.src=videoUrl;

  await new Promise((resolve, reject) => {
      videoRef.current.onloadedmetadata = resolve;
    });
  
    await ffmpeg.exec([
    '-i', filename,
    '-preset', 'ultrafast',
    '-t', '5',  
    '-vf', `subtitles=captions.srt:fontsdir=/tmp:force_style='Fontname=Montserrat Bold,FontSize=40,MarginV=80`,
    'output.mp4'
  ]);
  
  const data = await ffmpeg.readFile('output.mp4');
  videoRef.current.src =
      URL.createObjectURL(new Blob([data.buffer], {type: 'video/mp4'}));
}
 



  return (
    <div className={styles.videoContainer}>
    <video ref={videoRef} controls></video>
    <div className={styles.buttonsDiv}>
    <button 
    className={styles.captionGenerateButton}
    onClick={generateCaptions}
    >
      <SparklesIcon className='h-7 w-7'/>
      Generate Caption
    </button>
  </div>
  </div>
  )
}

export default ResultVideoComponent