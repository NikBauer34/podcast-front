'use client'

import { usePathname } from "next/navigation";
import { ReactNode, createContext, useContext, useEffect, useState } from "react";

interface AudioProps {
  title: string;
  audioUrl: string;
  author: string;
  imageUrl: string;
  podcastId: string;
}

interface AudioContextType {
  audio: AudioProps | undefined;
  setAudio: React.Dispatch<React.SetStateAction<AudioProps | undefined>>;
}
const AudioContext = createContext<AudioContextType | undefined>(undefined)
const AudioProvider = ({children}: {children: ReactNode}) => {
  const [audio, setAudio] = useState<AudioProps | undefined>()
  const pathname = usePathname()

  useEffect(() => {
    if (pathname === '/create-podcast') setAudio(undefined)
  }, [pathname])

  return (
    <AudioContext.Provider value={{ audio, setAudio }}>
      {children}
    </AudioContext.Provider>
  )
}
export const useAudio = () => {
  const context = useContext(AudioContext);

  if(!context) throw new Error('useAudio должен быть использован в AudioProvider');

  return context;
}
export default AudioProvider