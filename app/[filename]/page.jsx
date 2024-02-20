'use client'

import CaptionsComponent from '@/components/CaptionsComponent'
import { clearTranscriptionItems } from '@/lib/helperfunctions'
import styles from '@styles/fileediting.module.css'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { PuffLoader, PulseLoader} from 'react-spinners'
import ResultVideoComponent from '@/components/ResultVideoComponent'

const FileEditingPage = ({params}) => {

  const filename = params.filename;
  const [isTranscribing, setIsTranscribing] = useState(false);
  const [isFetchingInfo, setIsFetchingInfo] = useState(false);
  const [TranscriptionItems, setTranscriptionItems] = useState([]);

  useEffect(() => {
    getTranscription();
  }, [filename]);

  async function getTranscription() {
    setIsFetchingInfo(true);
    await axios.get('/api/transcribe?filename='+filename).then(response => {
      if(response.data.status === "NOT_FOUND"){
        setTimeout(getTranscription, 1000);
      }
      else if(response.data.status === "IN_PROGRESS"){
        setIsTranscribing(true);
        setTimeout(getTranscription, 5000);
      }
      else{
        setIsFetchingInfo(false);
        setIsTranscribing(false);
        setTranscriptionItems(clearTranscriptionItems(response.data.results.items));
      }
    });
  }

  
  if (isTranscribing) {
    return (
      <div className={styles.Loading}>
        <p>Transcribing your video</p>
        <PulseLoader color="#ffff" />
      </div>
    );
  }

  if (isFetchingInfo) {
    return (
      <div className={styles.Loading}>
        <p>Fetching information</p>
        <PulseLoader color="#fff" />
      </div>
    );
  }

  return (
    <>
    {!isFetchingInfo && !isTranscribing && TranscriptionItems.length > 0 ? (
      <div className={styles.mainContainer}>
      <ResultVideoComponent filename={filename} />
      <div className={styles.captionsContainer}>
        <div className={styles.captionBox}>
        <CaptionsComponent transcriptionItems={TranscriptionItems} setTranscriptionItems={setTranscriptionItems}/>
        </div>
      </div>
    </div>
  ):(
    <div className={styles.Loading}>
     <PuffLoader color="#ffff" />
    </div>
  )}
    </>
  )
    }

export default FileEditingPage