'use client'

import styles from '@styles/fileediting.module.css'
import { useEffect, useState } from 'react'
import axios from 'axios'
import {useQuery} from '@tanstack/react-query'
import CaptionsComponent from '@/components/CaptionsComponent'
import SparklesIcon from '@/icons/sparklesIcon'
import {clearTranscriptionItems} from '@/lib/helperfunctions'
const FileEditingPage = ({params}) => {

  const filename = params.filename;
  const [isTranscribing, setIsTranscribing] = useState(false);
  const [isFetchingInfo, setIsFetchingInfo] = useState(false);
  const [TranscriptionItems, setTranscriptionItems] = useState([]);

  useEffect(() => {
    getTranscription();
  }, [filename]);

  function getTranscription() {
    setIsFetchingInfo(true);
    axios.get('/api/transcribe?filename='+filename).then(response => {
      setIsFetchingInfo(false);
      const status = response.data?.status;
      const transcription = response.data?.transcription;
      if (status === 'IN_PROGRESS') {
        setIsTranscribing(true);
        setTimeout(getTranscription, 3000);
      } else {
        setIsTranscribing(false);
        setTranscriptionItems(
          clearTranscriptionItems(transcription.results?.items)
        );
      }
    });
  }
  console.log(TranscriptionItems)

  if (isTranscribing) {
    return (
      <div>Transcribing your video...</div>
    );
  }

  if (isFetchingInfo) {
    return (
      <div>Fetching information...</div>
    );
  }

  return (
    <div className={styles.mainContainer}>
       <div className={styles.videoContainer}>
        <video src={`https://phrasify-uploads.s3.ap-south-1.amazonaws.com/${filename}`} controls ></video>
      </div>
      <div className={styles.captionsContainer}>
      <div className={styles.captionBox}>
      <CaptionsComponent transcriptionItems={TranscriptionItems} setTranscriptionItems={setTranscriptionItems}/>
      </div>
      <div className={styles.buttonsDiv}>
        <button className={styles.captionGenerateButton}>
          <SparklesIcon className='h-7 w-7'/>
          Generate Captions
        </button>
      </div>
      </div>
    </div>
  )
}

export default FileEditingPage