'use client';
import { Progress } from "@/components/ui/progress";
import { AnimatePresence, motion } from 'framer-motion';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { FaUpload } from "react-icons/fa6";
import PulseLoader from 'react-spinners/PulseLoader';


import SparklesIcon from '@/icons/sparklesIcon';
import styles from "@styles/jumbotron.module.css";
import axios from 'axios';

import { useUploadButtonContext } from '@/lib/appContext';

const JumbotronComponent = () => {
    const router = useRouter();
    const { data: session } = useSession();

    const [isScrolling, setIsScrolling] = useState(false);


    const {
        buttonText, setButtonText,
        progress, setProgress,
        isUploading, setIsUploading,
        transcribebuttonClicked, setTranscribeButtonClicked,
        newFileName, setNewFileName
    } = useUploadButtonContext();

    const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms));

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        }
    }, []);

    const handleScroll = () => {
        setIsScrolling(window.scrollY >= 10);
    }

    const handleUpload = async (ev) => {
        ev.preventDefault();
        const file = ev.target.files[0];
        const metadata = {
            name: file.name,
            type: file.type,
        }
        if (file) {
            const formData = new FormData();
            formData.append('file', metadata);

            const {data} = await axios.post('/api/upload', metadata, {
                headers: {
                    'Content-Type': 'application/json'
                },
                onUploadProgress: (progressEvent) => {
                    const { loaded, total } = progressEvent;
                    const percentCompleted = Math.floor((loaded * 100) / total);
                    (async () => {
                        setProgress(20);
                        await wait(500);
                        setProgress(percentCompleted);
                    })();
                }
            });
            const {signedUrl, newName} = data;

            if (signedUrl) {

                const uploadResponse = await axios.put(signedUrl, file, {
                    headers: {
                        "Content-Type": file.type
                    }
                })

                if(uploadResponse.status === 200){
                    // console.log(`File uploaded successfully to ${newName}`)
                    setNewFileName(newName);
                    setIsUploading(false);
                    setButtonText('Uploaded');
                    await wait(1500);
                    setProgress(0);
                    setIsUploading(false);
                    setButtonText('Transcribe Video');
                }else{
                    console.log(`Failed to upload file to S3`)
                }


            }
        }
    }

    const handleTranscribeButton = async (e) => {
        setTranscribeButtonClicked(true);
        e.preventDefault();

        if (session) {
            await axios.post(`/api/transcribe?filename=${newFileName}`).then((res) => {
                if (res.data.status === "IN_PROGRESS") {
                    router.push(`${newFileName}`);
                }
            });
        } else {
            localStorage.setItem('newFileName', newFileName);
            await axios.post(`/api/transcribe?filename=${newFileName}`);
            router.push('/signin');
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
                    <div className={styles.desktopUploadButtonContainer}>
                        {isUploading && (
                            <div className={styles.uploadVideoButtonContainer}>
                                    <div className={styles.uploadVideo}>
                                        <div>
                                            <FaUpload className='h-5 w-5' />
                                        </div>
                                        <div><span>{buttonText}</span></div>
                                        <input type='file' onChange={handleUpload} />
                                    </div>
                                <div>
                                    {progress > 0 && (
                                    <div className='h-[6px] w-32 mt-2 border rounded overflow-hidden'>
                                        <div
                                            className='h-full bg-white transition-all duration-300 ease-in-out'
                                            style={{ width: `${progress}%` }}
                                        ></div>
                                    </div>
                                    )}
                                </div>
                            </div>
                        )}
                        {!isUploading && (
                            <div className={styles.transcribeButtonContainer}>
                                {!transcribebuttonClicked &&
                                <div>
                                    <SparklesIcon className='h-5 w-5 ' />
                                </div>
                                }
                                <div className={styles.transcribeButton}>
                                    <button onClick={handleTranscribeButton}>
                                        {transcribebuttonClicked ? <PulseLoader color='white' size={12} /> : 'Transcribe Video'}
                                    </button>
                                </div>
                            </div>
                        )}

                    </div>
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
                                {isUploading && (
                                    <>
                                        <div className={styles.uploadText}>
                                            <div>
                                                <FaUpload className='h-5 w-5' />
                                            </div>
                                            <div><span>{buttonText}</span></div>
                                        </div>
                                        {progress > 0 && (
                                            <div className='h-[6px] w-32 border rounded overflow-hidden'>
                                                <div
                                                    className='h-full bg-white transition-all duration-300 ease-in-out'
                                                    style={{ width: `${progress}%` }}
                                                ></div>
                                            </div>
                                        )}
                                    </>
                                )}
                                {!isUploading && (
                                    <div className={styles.transcribeButtonContainer}>
                                        {!transcribebuttonClicked && <div>
                                            <SparklesIcon className='h-5 w-5' />
                                        </div>}
                                        <div className={styles.transcribeButton}>
                                            <button onClick={handleTranscribeButton}>
                                                {transcribebuttonClicked ? <PulseLoader color='white' size={12} /> : 'Transcribe Video'}
                                            </button>
                                        </div>
                                    </div>
                                )}
                                <input type='file' className='hidden' onChange={handleUpload} />
                            </motion.label>
                        ) : null}
                    </AnimatePresence>
                    <div className={styles.subInfo}>
                        <span>Free use forever</span>
                        <span>No credit card required</span>
                    </div>
                </div>
            </div>
            <div className={styles.rightContainer}>
                <img src="https://imagesprojects.s3.ap-south-1.amazonaws.com/phrasify/image2.png" alt="jumotronImage"></img>
            </div>
        </div>
    );
};

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
};

export default JumbotronComponent;

