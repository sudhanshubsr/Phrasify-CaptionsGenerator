import Image from "next/image";
import styles from "@styles/home.module.css";
import JumbotronComponent from "@/components/JumbotronComponent";
import HowToComponent from "@/components/HowToComponent";
import FaqComponent from "@/components/FaqComponent";
import FaqSection from "@/components/FaqSectionComponent";
import SmoothScrolling from "@/lib/smoothscrolling";

export default function Home() {
  return (
  
    <main>
      <SmoothScrolling>
      <JumbotronComponent />
      <HowToComponent />
      <FaqSection />
      
      <div className={styles.videoSection}>
      <div className={styles.headingContainer}>
      <h1>Easily add captions to your videos with Phrasify. No experience necessary.</h1>
      </div>
      <div className={styles.videoContainer}>
      <img src="https://imagesprojects.s3.ap-south-1.amazonaws.com/phrasify/maingif.gif" className="rounded-xl" />
      </div>
      </div>


      <FaqComponent />
      </SmoothScrolling>
    </main>
  );
}
