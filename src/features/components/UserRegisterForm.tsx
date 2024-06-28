"use client"

import { DestructiveAlert, FileUpload, FileUploader, FormSkeleton, register } from "@/entities"
import { Badge, BaseInput, BasePasswordInput, Button, CardContent, CardFooter, Input, Label, PasswordInput, SubmitButton, cn, useInputValidation, useToast } from "@/shared"
import { Loader, Loader2 } from "lucide-react"
import { signIn } from "next-auth/react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ChangeEvent, SyntheticEvent, useEffect, useRef, useState } from "react"

export default function UserRegisterForm() {
  let niknameInput = useInputValidation('', {isEmpty: {value: true, message: 'Никнейм не может быть пустым'}, minLength: {value: 3, message: 'Никнейм не может быть меньше трех символов'}, maxLength: {value: 12, message: 'Никнейм не может быть больше 12 символов'}})
  let passwordInput = useInputValidation('', {isEmpty: {value: true, message: 'Пароль не может быть пустым'}, minLength: {value: 3, message: 'Пароль не может быть меньше трех символов'}, maxLength: {value: 12, message: 'Пароль не может быть больше 12 символов'}})
  let emailInput = useInputValidation('', {isEmail: {value: false, message: 'Напиши нормальную почту'}})
  let [loading, setLoading] = useState(false)
  let [serverError, setServerError] = useState('')
  let [imageUrl, setImageUrl] = useState('https://unilib-storage.storage.yandexcloud.net/test/a1074fdc-a146-4c5f-99c3-aedadd7c83f9.jpg')
  let [imageLoading, setImageLoading] = useState(false)
  let {toast} = useToast()
  let [isHidedImage, setIsHidedImage] = useState(false)
  let imageRef = useRef<HTMLInputElement>(null)
  let uploadImage = async (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    setImageLoading(true)
    const file = e.target.files![0]
    let formdata = new FormData()
    formdata.append('file', file)
    let filename = await FileUpload(formdata)
    console.log(filename)
    if (typeof filename != 'string') {
      setImageUrl(filename?.file_path)
    } else {
      alert(filename)
    }
    setImageLoading(false)
    if (!imageUrl) {
      toast({
        title: 'Если изображение не загрузилось, повторите попытку'
      })
    }
  }
  let router = useRouter()
  async function onSubmit(e: React.SyntheticEvent) {
    e.preventDefault()
    setLoading(true)
    let nikname = niknameInput.value
    let password = passwordInput.value
    let data = await register(nikname, password, imageUrl, emailInput.value)
    if (typeof data == 'string') {
      setServerError(data)
      setLoading(false)
      return
    }
    console.log(nikname)
    console.log(password)
    const res = await signIn('credentials', {
      nikname, password, redirect: false
    })
    if (!res?.ok) {
      setServerError(res?.error || '')
      setLoading(false)
    } else {
      setLoading(false)
      setServerError('')
      router.push('/')
    }
  }

  return (
    <div className={cn("grid gap-6")}>

    <form onSubmit={onSubmit}>
      <CardContent className="grid gap-4">
          <div className="grid gap-2">
            <Label className="basic-label">Никнейм</Label>
            <BaseInput type="text" placeholder="nikbau34" required {...niknameInput}/>
            {(niknameInput.isDirty && niknameInput.isEmpty.value) && <Badge variant={'destructive'} className="text-white-1">{niknameInput.isEmpty.message}</Badge>}
            {(niknameInput.isDirty && niknameInput.minLengthError.value) && <Badge variant={'destructive'} className="text-white-1">{niknameInput.minLengthError.message}</Badge>}
            {(niknameInput.isDirty && niknameInput.maxLengthError.value) && <Badge variant={'destructive'} className="text-white-1">{niknameInput.maxLengthError.message}</Badge>}
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password" className="basic-label">Пароль</Label>
            <BaseInput type="password" required {...passwordInput}/>
            {(passwordInput.isDirty && passwordInput.isEmpty.value) && <Badge variant={'destructive'} className="text-white-1">{passwordInput.isEmpty.message}</Badge>}
            {(niknameInput.isDirty && passwordInput.minLengthError.value) && <Badge variant={'destructive'} className="text-white-1">{passwordInput.minLengthError.message}</Badge>}
            {(niknameInput.isDirty && passwordInput.maxLengthError.value) && <Badge variant={'destructive'} className="text-white-1">{passwordInput.maxLengthError.message}</Badge>}
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password" className="basic-label">Почта</Label>
            <BaseInput type="email" id="email" required {...emailInput}/>
            {(emailInput.isDirty && !emailInput.isEmail.value) && <Badge variant={'destructive'} className="text-white-1">{emailInput.isEmail.message}</Badge>}

          </div>
          {/* <FileUploader fileRef={imageRef} onChange={(e) => uploadImage(e)} isFileLoading={imageLoading} file={imageUrl} isHidedImage={isHidedImage} setIsHidedImage={setIsHidedImage}/> */}
          <Label className="basic-label">Уже есть аккаунт?{' '}

            <Link 
              href='/sign-in'
              className="underline underline-offset-4"
            >Войдите</Link>
          </Label>
        </CardContent>
        <CardFooter>
        <div className="flex flex-col w-full">
        <SubmitButton className="w-full" loading={loading} text="Зарегистрироваться" submitText="Загружаем" disabled={loading || (!niknameInput.isInputValid || !passwordInput.isInputValid || emailInput.isInputValid || !imageUrl)}/>
        <div className="pt-[15px]" />
          {serverError &&
                <DestructiveAlert 
                  title="Упс, ошибка сервера"
                  description={serverError}
                />
              }
          </div>
        </CardFooter>
    </form>
    </div>
  )
}