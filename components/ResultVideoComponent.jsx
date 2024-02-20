import React from 'react'
import ReactPlayer from 'react-player'
import  SparklesIcon  from '../icons/sparklesIcon'
import styles from '@styles/fileediting.module.css'
const ResultVideoComponent = ({filename}) => {
  return (
    <div className={styles.videoContainer}>
    <ReactPlayer url={`https://phrasify-uploads.s3.ap-south-1.amazonaws.com/${filename}`} controls={true} playsinline width={240} height='full'></ReactPlayer>
    <div className={styles.buttonsDiv}>
    <button className={styles.captionGenerateButton}>
      <SparklesIcon className='h-7 w-7'/>
      Generate Caption
    </button>
  </div>
  </div>
  )
}

export default ResultVideoComponent