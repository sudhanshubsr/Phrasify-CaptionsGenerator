'use client'
import { UploadIcon } from '@radix-ui/react-icons'
import styles from "@styles/jumbotron.module.css"
import axios from 'axios'
import { AnimatePresence, motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
const JumbotronComponent = () => {
    // const {edgestore} = useEdgeStore();
    const [progress, setProgress] = useState(0);
    const [isScrolling, setIsScrolling] = useState(false);
    const router = useRouter();

    const handleScroll = () => {
        if(window.scrollY >= 100){
            setIsScrolling(true)
        }else{
            setIsScrolling(false)
        }
    }

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        }
    }, [])

    const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms))
    const handleUpload = async (ev) => {
        ev.preventDefault();
        const file = ev.target.files[0];
        if(file){

            // const res = await edgestore.phrasifyVideos.upload({
            //     file,
            //     onProgressChange: (progress)=>{
            //         setProgress(progress)
            //     }
            // })

            // ! If I don't want to use edgeStore as a medium to upload files to AWS I can use axios with S3 client
            const formData = new FormData();
            formData.append('file', file);
            const res = await axios.post('/api/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                onUploadProgress: (progressEvent) => {
                    const {loaded, total} = progressEvent;
                    const percentCompleted = Math.floor((loaded * 100) / total);
                    (async () => {
                        setProgress(20);
                        await wait(1500);
                        setProgress(percentCompleted);
                    })();
                }
            });
            router.push(`${res.data.newName}`)
        }
        
        
    }


  return (
    <div className={styles.mainContainer}>
        <div className={styles.leftContainer}>
            <div className={styles.subSection1}>
                <h1 className={styles.leftContainerHeading}>Add captions to your videos for free.</h1>
                <p>Quickly generate captions for any video with Phraisfy online. No experience necessary</p>
            </div>
            
            <div className={styles.subSection2}>
            <AnimatePresence>
                {isScrolling ? (
                        <motion.label
                        key={'uploadButton'}
                        initial='initial'
                        animate='animate'
                        exit='exit'
                        variants={NavAnimation}
                        className={styles.uploadButton} 

                        >
                            <div className={styles.uploadText}>
                            <UploadIcon className='w-4 h-4'/>
                            <span>Upload Video</span>
                            </div>
                            {progress > 0 && (
                                <div className='h-[6px] w-32 border rounded overflow-hidden'>
                                <div
                                className='h-full bg-white transition-all duration-300 ease-in-out'
                                style={{width: `${progress}%`}}
                                ></div>
                                 </div>
                            )}
                        
                            <input type='file' className='hidden' multiple onChange={handleUpload}/>
                        </motion.label>
                ) : null}
                </AnimatePresence>
                    
        
                
                <div className={styles.subInfo}>
                    <span>Free use foreover</span>
                    <span>No credit card required</span>
                </div>
            </div>
        </div>
        <div className={styles.rightContainer}>
            <img src="https://imagesprojects.s3.ap-south-1.amazonaws.com/phrasify/image2.png" alt="jumotronImage"></img>
        </div>
    </div>

  )
}
const NavAnimation = {
    initial: {
        y: 50,
        opacity: 0,
        scale: 0.8 // Added scale property
    },
    animate: {
        y: 0,
        opacity: 1,
        scale: 1, // Added scale property
        transition: {
            ease: 'easeInOut' // Use easeInOut for smoother transition
        }
    },
    exit: {
        y: -100,
        opacity: 0,
        scale: 0.8, // Added scale property
        transition: {
            type: 'spring',
            damping: 10,
            stiffness: 100,
            duration: 0.5,
            ease: 'easeInOut' // Use easeInOut for smoother transition
        }
    }
}


export default JumbotronComponent