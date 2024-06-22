"use client"

import { TextToSpeech } from "@/entities"
import { GeneratePodcast } from "@/features"
import { Badge, BaseInput, Button, Label, Select, SelectContent, SelectItem, SelectTrigger, SelectValue, Textarea, cn, useInputValidation, useToast } from "@/shared"
import { useRouter } from "next/navigation"
import { useState } from "react"
let voiceCategories = ['alena', 'ermil', 'filipp', 'jane', 'madirus', 'marina', 'omazh', 'zahar']
export default function PodcastForm() {
  const router = useRouter()
  const [imagePrompt, setImagePrompt] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const [audioUrl, setAudioUrl] = useState('')
  const [audioDuration, setAudioDuration] = useState(0)
  const [voiceType, setVoiceType] = useState<string | null>(null)
  const [voicePrompt, setVoicePrompt] = useState('')
  const {toast} = useToast()
  let titleInput = useInputValidation('', {isEmpty: {value: true, message: 'Название не должно быть пустым'}})
  let descriptionInput = useInputValidation('', {isEmpty: {value: true, message: 'Описание не должно быть пустым'}})
  return (
    <section className="mt-10 flex flex-col">
      <h1 className="text-20 font-bold text-white-1">Создать Подкаст</h1>

      <form className="mt-12 flex w-full flex-col">
        <div className="flex flex-col gap-[30px] border-b border-black-5 pb-10">
          <div className="flex flex-col gap-2.5">
            <Label className="text-16 basic-label">Название</Label>
            <BaseInput className="input-class" placeholder="Мое поздравление дедушке" {...titleInput}/>
            {(titleInput.isDirty && titleInput.isEmpty.value) && <Badge variant={'destructive'} className="text-white-1">{titleInput.isEmpty.message}</Badge>}
          </div>
          <div className="flex flex-col gap-2.5">
            <Label className="text-16 basic-label">
              Выберите ИИ голос
            </Label>

            <Select onValueChange={(value) => setVoiceType(value)}>
              <SelectTrigger className={cn('text-16 w-full border-none bg-black-1 text-gray-1 focus-visible:ring-offset-orange-1')}>
                <SelectValue placeholder='Выбери голос' className="placeholder:text-gray-1" />
              </SelectTrigger>
              <SelectContent className="text-16 border-none bg-black-1 font-bold text-white-1 focus:ring-orange-1">
                {voiceCategories.map((category) => (
                  <SelectItem key={category} value={category} className="capitalize focus:bg-orange-1">
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
              {voiceType && (
                <audio
                  src={`/voices/${voiceType}.mp3`}
                  autoPlay
                  className="hidden"
                />
              )}
            </Select>
          </div>
          <div className="flex flex-col gap-2.5">
            <Label className="text-16 basic-label">Описание</Label>
            <Textarea className="input-class focus-visible:ring-offset-orange-1" placeholder="Напишите небольшое написание" {...descriptionInput}/>
            {(descriptionInput.isDirty && descriptionInput.isEmpty.value) && <Badge variant={'destructive'} className="text-white-1">{descriptionInput.isEmpty.message}</Badge>}
          </div>
        </div>
        <div className="flex flex-col pt-10">
          <GeneratePodcast 
            setAudio={setAudioUrl}
            voiceType={voiceType!}
            audio={audioUrl}
            voicePrompt={voicePrompt}
            setAudioDuration={setAudioDuration}
            setVoicePrompt={setVoicePrompt}
          />
        </div>
      </form>
    </section>
  )
}