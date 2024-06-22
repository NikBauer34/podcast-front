"use client"

import { DestructiveAlert, FormSkeleton } from "@/entities"
import { Badge, BaseInput, BasePasswordInput, Button, CardContent, CardFooter, Input, Label, PasswordInput, SubmitButton, cn, useInputValidation } from "@/shared"
import { Loader, Loader2 } from "lucide-react"
import { signIn } from "next-auth/react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { SyntheticEvent, useEffect, useState } from "react"

export default function UserAuthForm() {
  let niknameInput = useInputValidation('', {isEmpty: {value: true, message: 'Никнейм не может быть пустым'}, minLength: {value: 3, message: 'Никнейм не может быть меньше трех символов'}, maxLength: {value: 12, message: 'Никнейм не может быть больше 12 символов'}})
  let passwordInput = useInputValidation('', {isEmpty: {value: true, message: 'Пароль не может быть пустым'}, minLength: {value: 3, message: 'Пароль не может быть меньше трех символов'}, maxLength: {value: 12, message: 'Пароль не может быть больше 12 символов'}})
  let [loading, setLoading] = useState(false)
  let [serverError, setServerError] = useState('')
  let router = useRouter()
  async function onSubmit(e: React.SyntheticEvent) {
    e.preventDefault()
    setLoading(true)
    let nikname = niknameInput.value
    let password = passwordInput.value
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
          <Label className="basic-label">Входите в приложение в первый раз?{' '}

            <Link 
              href='/sign-up'
              className="underline underline-offset-4"
            >Зарегистрируйтесь</Link>
          </Label>
        </CardContent>
        <CardFooter>
        <div className="flex flex-col w-full">
        <SubmitButton className="w-full" loading={loading} text="Войти" submitText="Входим" disabled={loading || (!niknameInput.isInputValid || !passwordInput.isInputValid)}/>
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