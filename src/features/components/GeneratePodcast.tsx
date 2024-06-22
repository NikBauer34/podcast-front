"use client"
import { FileUpload, generateAudio, getAudio } from "@/entities";
import { Button, Label, Textarea, useToast } from "@/shared";
import axios from "axios";
import { Loader } from "lucide-react";
import { Dispatch, SetStateAction, useState } from "react";
import { arrayBuffer } from "stream/consumers";
import { v4 as uuidv4 } from 'uuid';

const useGeneratePodcast = ({
  setAudio,
  voiceType,
  voicePrompt
}: {
  setAudio: Dispatch<SetStateAction<string>>,
  voiceType: string,
  voicePrompt: string,
}) => {
  const [isGenerating, setIsGenerating] = useState(false)
  const [GeneratingProcess, setGeneratingProcess] = useState('')
  const {toast} = useToast()
  const generatePodcast = async () => {
    setIsGenerating(true)
    setAudio('')
    if (!voicePrompt) {
      toast({
        title: 'Необходим текст для генерации подкаста'
      })
      return setIsGenerating(false)
    }
    if (!voiceType) {
      toast({
        title: 'Необходим тип голоса для генерации подкаста'
      })
      return setIsGenerating(false)
    }
    try {
      setGeneratingProcess('Генерируем аудио')
      let data = await generateAudio(voiceType, voicePrompt)
      console.log('data')
      console.log(data)
      if (typeof data == 'string') {
        setIsGenerating(false)
        setGeneratingProcess('')
        toast({title: `Ошибка: ${data}`, variant: 'destructive'})
        return
      }
      console.log(data)
      setGeneratingProcess('Загружаем аудио')
      let audio = await getAudio(data.mp3)
      if (typeof audio == 'string') {
        setIsGenerating(false)
        setGeneratingProcess('')
        toast({title: `Ошибка: ${audio}`, variant: 'destructive'})
        return
      }
      setAudio(audio.file_path)
      setIsGenerating(false)
      setGeneratingProcess('')
      toast({
        title: 'Подкаст успешно сгенерирован'
      })
    } catch (e: any) {
      toast({
        title: `Ошибка: ${e}`,
        variant: 'destructive'
      })
      setIsGenerating(false)
      setGeneratingProcess('')
    }
  }

  return { isGenerating, GeneratingProcess, generatePodcast}
}

export default function GeneratePodcast({
  setAudio,
  voiceType,
  audio,
  voicePrompt,
  setAudioDuration,
  setVoicePrompt
}: {
  setAudio: Dispatch<SetStateAction<string>>,
  voiceType: string,
  voicePrompt: string,
  audio: string,
  setAudioDuration: Dispatch<SetStateAction<number>>,
  setVoicePrompt: Dispatch<SetStateAction<string>>
}) {
  const {isGenerating, generatePodcast, GeneratingProcess} = useGeneratePodcast({setAudio, voicePrompt, voiceType})

  return (
    <div>
      <div className="flex flex-col gap-2.5">
        <Label className="text-16 basic-label">
          Текст подкаста
        </Label>
        <Textarea 
          className="input-class font-light focus-visible:ring-offset-orange-1"
          placeholder="Введите текст для генерации подкаста"
          rows={5}
          value={voicePrompt}
          onChange={(e) => setVoicePrompt(e.target.value)}
        />
      </div>
      <div className="mt-5 w-full max-w-[200px]">
        <Button type="submit" className="text-16 bg-orange-1 py-4 basic-label" onClick={async (e) => {
          e.preventDefault()
          await generatePodcast()
        }}>
          {isGenerating ? (
            <>
              {GeneratingProcess ? GeneratingProcess : 'Загрузка'}
              <Loader size={20} className="animate-spin ml-2" />
            </>
          ) : (
            'Сгенерировать'
          )}
        </Button>
      </div>
      {audio && (
        <audio 
          controls
          src={audio}
          autoPlay
          className="mt-5"
          onLoadedMetadata={(e) => setAudioDuration(e.currentTarget.duration)}
        />
      )}
    </div>
  )
}