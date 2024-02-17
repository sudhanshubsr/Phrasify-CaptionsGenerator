import styles from "@styles/footer.module.css";

export default function FooterComponent() {
  return (
    <>
    
    <div className={styles.mainContainer}>
        <div className={styles.logoContainer}>
          <img src="https://imagesprojects.s3.ap-south-1.amazonaws.com/phrasify/phrasify-logos_transparent.png" alt="logo" className="w-20 h-20 mx-auto" />
          <p>PHRASIFY</p>
        </div>
        <p className="order-2 text-xs tracking-wide text-gray-500 md:order-1 dark:text-gray-400">
          © 2023 Phrasify. All Rights Reserved.
        </p>
    </div>
    </>
  )
}

