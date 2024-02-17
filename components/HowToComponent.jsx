import React from 'react'
import styles from "@styles/howto.module.css"
import { LuUpload } from "react-icons/lu";
import { LuPencil } from "react-icons/lu";
import { RiAiGenerate } from "react-icons/ri";
const HowToComponent = () => {
  return (
    <div className={styles.mainContainer}>
   
        <h1>How to add caption to videos. </h1>
        
        <div className={styles.sectionCard}>
            <div>
                <LuUpload className='w-10 h-10'/>
            </div>
            <div className={styles.cardRightSection}>
                <h2>1.Upload your video.</h2>
                <p>Choose a video to upload ot hte online caption generator. Select the language spoken in the video.</p>
            </div>
        </div>
        <div className={styles.sectionCard}>
            <div>
                <RiAiGenerate className='w-10 h-10 bg-[--primary]'/>
            </div>
            <div className={styles.cardRightSection}>
                <h2>2.Generate captions</h2>
                <p>Edit your video captions if needed, then choose a font style to add to your new video.</p>
            </div>
        </div>
        <div className={styles.sectionCard}>
            <div>
                <LuPencil className='w-10 h-10'/>
            </div>
            <div className={styles.cardRightSection}>
                <h2>3.Continue Editing</h2>
                <p>Download your new video with captions as an MP4 file or keep editing in Adobe Express.</p>
            </div>
        </div>
        
    </div>
  )
}

export default HowToComponent