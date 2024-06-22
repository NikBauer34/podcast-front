"use client"
import { FileUpload, TextToSpeech } from "@/entities";
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
      const res = await axios({
        method: 'POST',
        url: 'https://tts.api.cloud.yandex.net/speech/v1/tts:synthesize?text="Хайхай"&voice=ermil&format=mp3'
      })
      // let fileReader = new FileReader()
      // console.log(Buffer.from(blob))
      // let new_blob = new Blob([new Uint8Array(blob).buffer], {type: 'audio/mpeg'})
      // console.log(URL.createObjectURL(new_blob))
      
      // console.log(URL.createObjectURL(file))
      // let blob = new Blob([file], {type: 'audio/mpeg'})
      // console.log(URL.createObjectURL(blob))
      // if (typeof file == 'string') {
      //   setIsGenerating(false)
      //   setGeneratingProcess('')
      //   toast({title: `Ошибка: ${file}`, variant: 'destructive'})
      //   return
      // }
      setGeneratingProcess('Загружаем аудио')
      
      // const blob = new Blob([file], {type: 'audio/mpeg'})
      // console.log(URL.createObjectURL(blob))
      // const new_blob = new Blob([new Uint8Array([...file].map(Number))], {
      //   type: 'audio/mpeg'
      // })
      // const wow_blob = new Blob([Buffer.from(file)], {type: 'audio/mpeg'})
      // console.log(URL.createObjectURL(new_blob))
      // console.log(URL.createObjectURL(wow_blob))
      // console.log(blob)
      // let fileName = `podcast-${uuidv4()}.mp3`
      // const new_file = new File([blob], fileName, {type: 'audio/mpeg'})

      // console.log(new_file)
      // console.log(URL.createObjectURL(blob))
      // console.log(file)

      // let formdata = new FormData()
      // formdata.append('file', new_file)
      // const data = await FileUpload(formdata)
      // if (typeof data == 'string') {
      //   setIsGenerating(false)
      //   setGeneratingProcess('')
      //   toast({title: `Ошибка: ${file}`, variant: 'destructive'})
      //   return
      // }
      // setAudio(data.file_path)
      setIsGenerating(false)
      setGeneratingProcess('')
      // toast({
      //   title: 'Подкаст успешно сгенерирован'
      // })
    } catch (e: any) {
      toast({
        title: `Ошибка: ${e}`,
        variant: 'destructive'
      })
      setIsGenerating(false)
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