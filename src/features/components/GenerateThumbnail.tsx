"use client"

import { FileUpload, ImageUploader, generateImage, getImage } from "@/entities"
import { Button, Label, SubmitButton, Textarea, cn, useToast } from "@/shared"
import { Loader } from "lucide-react"
import Image from "next/image"
import { ChangeEvent, Dispatch, SetStateAction, useRef, useState } from "react"
const useGenerateThumbnail = ({
  setIsImageLoading,
  setGeneratingProcess,
  setImage,
  imagePrompt
} : {
  setIsImageLoading: Dispatch<SetStateAction<boolean>>,
  setGeneratingProcess: Dispatch<SetStateAction<string>>,
  setImage: Dispatch<SetStateAction<string>>,
  imagePrompt: string
}) => {
  const {toast} = useToast()
  const uploadCustomImage = async (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    try {
      setIsImageLoading(true)
    setGeneratingProcess('Загружаем изображение')
    const file = e.target.files![0]
    let formdata = new FormData()
    formdata.append('file', file)
    let filename = await FileUpload(formdata)
    if (typeof filename != 'string') {
      setImage(filename.file_path)
    } else {
      setIsImageLoading(false)
      setGeneratingProcess('')
      toast({
        title: `Ошибка:${filename}`
      })
      return
    }
    setIsImageLoading(false)
    setGeneratingProcess('')
    toast({
      title: 'Картинка загружена успешно'
    })
    } catch (e: any) {
      toast({
        title: `Ошибка: ${e}`,
        variant: 'destructive'
      })
      setIsImageLoading(false)
      setGeneratingProcess('')
    }
  }
  const generateAiImage = async (e: any) => {
    e.preventDefault()
    setIsImageLoading(true)
    setGeneratingProcess('Генерируем изображение')
    let data = await generateImage(imagePrompt)
    if (typeof data == 'string') {
      setIsImageLoading(false)
      setGeneratingProcess('')
      toast({title: `Ошибка: ${data}`, variant: 'destructive'})
      return
    }
    console.log(data)
    setTimeout(async () => {
      let image = await getImage(data.id)
    if (typeof image == 'string') {
      // setIsImageLoading(false)
      // setGeneratingProcess('')
      toast({title: `Занимает больше времени, сейчас...`, variant: 'destructive'})
      setTimeout(async () => {
        let image = await getImage(data.id)
    if (typeof image == 'string') {
      // setIsImageLoading(false)
      // setGeneratingProcess('')
      toast({title: `Еще чуть-чуть...`, variant: 'destructive'})
      setTimeout(async () => {
        let image = await getImage(data.id)
    if (typeof image == 'string') {
      setIsImageLoading(false)
      setGeneratingProcess('')
      toast({title: `К сожалению, изображение не сгенерировалось, напишите менее сложный запрос`, variant: 'destructive'})
      return
    }
    setImage(image.file_path)
    setIsImageLoading(false)
    setGeneratingProcess('')
    toast({
      title: 'Обложка успешно сгенерирована'
    })
      }, 20000)
      return
    }
    setImage(image.file_path)
    setIsImageLoading(false)
    setGeneratingProcess('')
    toast({
      title: 'Обложка успешно сгенерирована'
    })
      }, 20000)
      return
    }
    setImage(image.file_path)
    setIsImageLoading(false)
    setGeneratingProcess('')
    toast({
      title: 'Обложка успешно сгенерирована'
    })
    }, 20000)
  }
  return {
    generateAiImage,
    uploadCustomImage
  }
}
export default function GenerateThumbnail({
  setImage,
  image,
  imagePrompt,
  setImagePrompt
} : {
  setImage: Dispatch<SetStateAction<string>>,
  image: string,
  imagePrompt: string,
  setImagePrompt: Dispatch<SetStateAction<string>>
}) {
  const [isAiThumbnail, setIsAiThumbnail] = useState(false)
  const [isImageLoading, setIsImageLoading] = useState(false)
  const [generatingProcess, setGeneratingProcess] = useState('')
  const imageRef = useRef<HTMLInputElement>(null)
  const {toast} = useToast()
  let {uploadCustomImage, generateAiImage} = useGenerateThumbnail({setGeneratingProcess, setIsImageLoading, setImage, imagePrompt})

  return (
    <>
      <div className="generate_thumbnail">
        <Button 
          type="button"
          variant='plain'
          onClick={() => setIsAiThumbnail(true)}
          className={cn('', {
            'bg-black-6': isAiThumbnail
          })}
        >
          Использовать ИИ
        </Button>
        <Button
          type="button"
          variant='plain'
          onClick={() => setIsAiThumbnail(false)}
          className={cn('', {
            'bg-black-6': !isAiThumbnail
          })}
        >
          Выложить свою обложку
        </Button>
      </div>
      {isAiThumbnail ? (
        <div className="flex flex-col gap-5">
          <div className="mt-5 flex flex-col gap-2.5">
            <Label className="text-16 basic-label">
              ИИ запрос для генерации обложки
            </Label>
            <Textarea
              className="input-class font-light focus-visible:ring-offset-1"
              placeholder="Введите текст"
              rows={5}
              value={imagePrompt}
              onChange={(e) => setImagePrompt(e.target.value)}
            />
          </div>
          <div className="w-full max-w-[200px]">
            <Button type="submit" className="text-16 bg-orange-1 py-4 basic-label" onClick={generateAiImage}>
              {isImageLoading ? (
                <>
                  {generatingProcess ? generatingProcess : 'Загрузка'}
                  <Loader size={20} className="animate-spin ml-2" />
                </>
              ) : (
                'Сгенерировать'
              )}
            </Button>
          </div>
        </div>
      ) : (
        <ImageUploader fileRef={imageRef} onChange={(e) => uploadCustomImage(e)} isFileLoading={isImageLoading} file={image}/>
      )}
      {isAiThumbnail && 
        image ? (
          <div className="flex-center w-full">
          <Image 
            src={image}
            width={300}
            height={300}
            className="mt-5"
            alt="thumbnail"
          />
        </div>
        ) : (<></>)
      }
    </>
  )
}