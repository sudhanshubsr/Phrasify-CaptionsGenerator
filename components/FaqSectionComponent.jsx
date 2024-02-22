import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import React from 'react'
import styles from '@styles/faq.module.css'
const FaqSection = () => {
  const faqs = [
    {
      question: "Is there a way to auto-generate captions?",
      answer: "Phrasify can automatically generate captions for your videos. Here's how it works: Phrasify uses machine learning to analyze the audio in your video and automatically generate captions. You can then edit the captions to make sure they're accurate. Once you're done, you can download the captions and add them to your video. It's that easy!"
    },
    {
      question: "Is Phrasify auto captions generator free to use?",
      answer: "Yes, Phrasify is free to use. You can create an account and start using Phrasify for free. There are no hidden fees or charges. You can use Phrasify to generate captions for your videos without paying anything. If you need more advanced features, you can upgrade to a paid plan. But the basic features are free to use."
    },
    {
        question: "I'm wondering how to generate subtitles without software?",
        answer: "Phrasify is a web-based tool that allows you to generate subtitles without any software. You can upload your video to Phrasify and it will automatically generate subtitles for you. You can then edit the subtitles to make sure they're accurate. Once you're done, you can download the subtitles and add them to your video. It's that easy!"
    }

  ]
  return (
   <div className={styles.desktopMainContainer}>
    <div className="flex justify-center mb-4 mt-4">
      <h2 className="font-bold lg:font-extrabold lg:text-3xl lg:mb-4 ">Frequently Asked Questions</h2>
    </div>
    <div className={styles.catAndQuestionsContainer}>
      <div className={styles.cuteCatContainer}>
        <img src="https://cdn-useast1.kapwing.com/static/7Nb-bob-thinking.webp" alt="cute-cat" />
      </div>
      <div className={styles.QuestionsContainer}>
      <Accordion type="single" collapsible>
        <AccordionItem value="question 1">
          <AccordionTrigger>
            {faqs[0].question}
          </AccordionTrigger>
          <AccordionContent>
            {faqs[0].answer}
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="question 2">
          <AccordionTrigger>
            {faqs[1].question}
          </AccordionTrigger>
          <AccordionContent>
            {faqs[1].answer}
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="question 3">
          <AccordionTrigger>
            {faqs[2].question}
          </AccordionTrigger>
          <AccordionContent>
            {faqs[2].answer}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      </div>
    </div>

   </div> 
    

  )
}

export default FaqSection