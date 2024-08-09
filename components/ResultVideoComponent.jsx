import React, { useEffect, useRef, useState} from 'react'
import ReactPlayer from 'react-player'
import  SparklesIcon  from '../icons/sparklesIcon'
import styles from '@styles/fileediting.module.css'
import { FFmpeg } from '@ffmpeg/ffmpeg'
import { fetchFile, toBlobURL } from '@ffmpeg/util'
import { transcriptionItemsToSrt } from '@/lib/helperfunctions'
import { Progress } from "@/components/ui/progress"


import montserrat from "@/fonts/Montserrat-Regular.ttf"
import montserratBold from "@/fonts/Montserrat-Bold.ttf"

const ResultVideoComponent = ({filename, transcriptionItems}) => {

  const [loaded, setLoaded] = useState(false);
  const [fontColor, setFontColor] = useState('#ffffff');
  const [outlineColor, setOutlineColor] = useState('#000000');
  const ffmpegRef = useRef(new FFmpeg());
  const videoRef = useRef(null);
  const videoUrl = `https://phrasify-uploads.s3.ap-south-1.amazonaws.com/${filename}`;
  const [progress, setProgress] = useState(1);

  useEffect(()=>{
    videoRef.current.src = videoUrl;
    load();
  },[])


  const load = async () => {
    const baseURL = 'https://unpkg.com/@ffmpeg/core@0.12.6/dist/umd'
    const ffmpeg = ffmpegRef.current;

    // ffmpeg.on('log', ({ message }) => {
      // console.log(message);
    // });

    await ffmpeg.load({
        coreURL: await toBlobURL(`${baseURL}/ffmpeg-core.js`, 'text/javascript'),
        wasmURL: await toBlobURL(`${baseURL}/ffmpeg-core.wasm`, 'application/wasm'),
    });

    await ffmpeg.writeFile('/tmp/montserrat.ttf', await fetchFile(montserrat));
    await ffmpeg.writeFile('/tmp/montserrat-bold.ttf', await fetchFile(montserratBold));
    setLoaded(true);
}

const generateCaptions = async() => {
  const ffmpeg = ffmpegRef.current;
  const srt = transcriptionItemsToSrt(transcriptionItems);
  await ffmpeg.writeFile(filename, await fetchFile(videoUrl));
  await ffmpeg.writeFile('captions.srt', srt);

  videoRef.current.src=videoUrl;
  await new Promise((resolve, reject) => {
      videoRef.current.onloadedmetadata = resolve;
    });

  const duration = videoRef.current.duration;
  ffmpeg.on('log', ({ message }) => {
    const regexResult = /time=([0-9:.]+)/.exec(message);
      if (regexResult && regexResult?.[1]) {
        const howMuchIsDone = regexResult?.[1];
        const [hours, minutes, seconds] = howMuchIsDone.split(":");
        const doneTotalSeconds = hours * 3600 + minutes * 60 + seconds;
        const videoProgress = doneTotalSeconds / duration;
        setProgress(videoProgress*100);
      }

  });

    await ffmpeg.exec([
    '-i', filename,
    '-preset', 'ultrafast',
    '-vf', `subtitles=captions.srt:fontsdir=/tmp:force_style='Fontname=Montserrat Bold,FontSize=40,MarginV=80,PrimaryColour=${rgbToffmepgColor(fontColor)},OutlineColour=${rgbToffmepgColor(outlineColor)},Outline=1'`,
    'output.mp4'
  ]);

  const data = await ffmpeg.readFile('output.mp4');
  videoRef.current.src =
      URL.createObjectURL(new Blob([data.buffer], {type: 'video/mp4'}));
  setProgress(1);
}

function rgbToffmepgColor(rgb) {
  const bgr = rgb.slice(5,7) + rgb.slice(3,5) + rgb.slice(1,3);
  return '&H' + bgr + '&';
}


  return (
    <div className={`flex mt-8 justify-center relative w-[560px] ${styles.videoContainer}`}>
    <video data-video={0} ref={videoRef} controls className={styles.video} />
      {progress && progress > 1 && (
        <div className={styles.textOverlay}>
          <Progress value={progress} className={styles.progressBar} />
          <h3 className="text-white text-xl">{parseInt(progress)}%</h3>
        </div>
      )}


    <div className={styles.buttonsDiv}>
    <div>
      <button
      className={styles.captionGenerateButton}
      onClick={generateCaptions}
      disabled={progress>1}
      >
        <SparklesIcon className='h-7 w-7'/>
        Generate Caption
      </button>
    </div>
    <div className={styles.colorContainer}>
      <div>
        <label>Font-Color:</label>
        <input type='color' value={fontColor} onChange={(e) => setFontColor(e.target.value)} />
      </div>
      <div>
        <label>Outline-Color:</label>
        <input type='color' value={outlineColor} onChange={(e) => setOutlineColor(e.target.value)} />
      </div>
    </div>

  </div>

  </div>
  )
}

export default ResultVideoComponent
