'use client'
import {createContext, useContext, useState} from 'react';

const AppContext = createContext(); 

export const ContextProvider = ({children})=>{
    const [buttonText, setButtonText] = useState('Upload Video');
    const [progress, setProgress] = useState(0);
    const [isUploading, setIsUploading] = useState(true);
    const [transcribebuttonClicked, setTranscribeButtonClicked] = useState(false);
    const [newFileName, setNewFileName] = useState('');
return (
    <AppContext.Provider value={{
        buttonText, setButtonText,
        progress, setProgress,
        isUploading, setIsUploading,
        transcribebuttonClicked, setTranscribeButtonClicked,
        newFileName, setNewFileName
        }}>
        {children}
    </AppContext.Provider>
)
}
export const useUploadButtonContext = ()=>{
    return useContext(AppContext);
}

