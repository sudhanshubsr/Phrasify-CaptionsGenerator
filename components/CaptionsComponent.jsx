import React from 'react'
import { ScrollArea } from '@/components/ui/scroll-area'
import TranscriptionItem from '@/components/TranscriptionItem'
import styles from '@/styles/fileediting.module.css'

const CaptionsComponent = ({transcriptionItems,setTranscriptionItems}) => {


  function updateTranscriptionItem(index, prop, ev) {
    const newAwsItems = [...transcriptionItems];
    const newItem = {...newAwsItems[index]};
    newItem[prop] = ev.target.value;
    newAwsItems[index] = newItem;
    setTranscriptionItems(newAwsItems);
  }
  return (
  <>
    <div className="grid grid-cols-3 w-full sticky top-0 bg-[--color-info-primary] text-white p-2 rounded-md ml-2 mb-1 mt-4">
        <div>From</div>
        <div>End</div>
        <div>Content</div>
      </div>
      
    <ScrollArea className={styles.scrollArea}>
    {transcriptionItems?.length > 0 &&  transcriptionItems.map((item, key) => (
       <div key={key}>
       <TranscriptionItem
         handleStartTimeChange={ev => updateTranscriptionItem(key, 'start_time', ev)}
         handleEndTimeChange={ev => updateTranscriptionItem(key, 'end_time', ev)}
         handleContentChange={ev => updateTranscriptionItem(key, 'content', ev)}
         item={item} />
     </div>
    ))}
    </ScrollArea>
  </>
    
  )  
}

export default CaptionsComponent