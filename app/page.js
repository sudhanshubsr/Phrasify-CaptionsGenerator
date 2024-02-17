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
      
      <div className="text-center w-full bg-[--color-info-accent] text-white text-[1.7rem] font-extrabold py-8 px-2 rounded-lg mt-14">
      <div>
      <h1>Easily add captions to your videos with Phrasify. No experience necessary.</h1>
      </div>
      <div className="px-3 py-4 mt-2">
      <img src="https://imagesprojects.s3.ap-south-1.amazonaws.com/phrasify/maingif.gif" className="rounded-xl" />
      </div>
      </div>
      <FaqComponent />
      </SmoothScrolling>
    </main>
  );
}
