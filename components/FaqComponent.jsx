import React from 'react'
import styles from "@styles/faq.module.css"
const FaqComponent = () => {
  return (
    <div className={styles.mainContainer}>
        <h1>WHAT'S DIFFERENT ABOUT PHRASIFY?</h1>
        <div className={styles.gridContainer}>
            <div className={styles.cardContainer}>
                <div className={styles.imageContainer}>
                    <img src='https://imagesprojects.s3.ap-south-1.amazonaws.com/phrasify/png6.webp' alt='icon'/>
                </div>
                <div className={styles.cardHeading}>
                    Easy
                </div>
                <div className={styles.cardsubText}>
                Start creating immediately with thousands of templates and copyright free videos, images, music, and GIFs. Repurpose content from the internet by pasting a link
                </div>
            </div>

            <div className={styles.cardContainer}>
                <div className={styles.imageContainer}>
                    <img src='https://imagesprojects.s3.ap-south-1.amazonaws.com/phrasify/png5.webp' alt='icon'/>
                </div>
                <div className={styles.cardHeading}>
                    Free
                </div>
                <div className={styles.cardsubText}>
                Phrasify is completely free to start. Just upload a video and start editing. Supercharge your editing workflow with our powerful online tools.
                </div>
            </div>

            <div className={styles.cardContainer}>
                <div className={styles.imageContainer}>
                    <img src='https://imagesprojects.s3.ap-south-1.amazonaws.com/phrasify/png4.webp' alt='icon'/>
                </div>
                <div className={styles.cardHeading}>
                    Accessible
                </div>
                <div className={styles.cardsubText}>
                Automatically subtitle and translate videos with our AI-powered Subtitler tool. Caption your videos in seconds, so that no viewers get left behind.
                </div>
            </div>


            <div className={styles.cardContainer}>
                <div className={styles.imageContainer}>
                    <img src='https://imagesprojects.s3.ap-south-1.amazonaws.com/phrasify/png3.webp' alt='icon'/>
                </div>
                <div className={styles.cardHeading}>
                    Online
                </div>
                <div className={styles.cardsubText}>
                Phrasify is cloud based, which means your videos are wherever you are. Use it on any device and access your content anywhere in the world.

                </div>
            </div>


            <div className={styles.cardContainer}>
                <div className={styles.imageContainer}>
                    <img src='https://imagesprojects.s3.ap-south-1.amazonaws.com/phrasify/png2.webp' alt='icon'/>
                </div>
                <div className={styles.cardHeading}>
                    No spam or ads
                </div>
                <div className={styles.cardsubText}>
                We don't serve ads: we're committed to building a quality, trustworthy website. And we will never spam you nor sell your information to anyone.
                </div>
            </div>


            <div className={styles.cardContainer}>
                <div className={styles.imageContainer}>
                    <img src='https://imagesprojects.s3.ap-south-1.amazonaws.com/phrasify/png1.webp' alt='icon'/>
                </div>
                <div className={styles.cardHeading}>
                    Powerful
                </div>
                <div className={styles.cardsubText}>
                Phrasify works hard to help make the content you want, when you want it. Get started on your project today.
                </div>
            </div>
            
        </div>
    </div>
  )
}

export default FaqComponent