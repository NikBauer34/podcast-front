import { UserRegisterForm } from "@/features";
import { Card, CardDescription, CardHeader, CardTitle } from "@/shared";

export default function RegistrationForm() {
  return (
    <Card className="w-full max-w-sm bg-black-3">
      <CardHeader>
        <CardTitle className="text-2xl text-20 basic-label">Регистрация</CardTitle>
        <CardDescription className='font-bold text-white-1'>
          Введите ваши данные для создания аккаунта
        </CardDescription>
      </CardHeader>
      <UserRegisterForm />
    </Card>
  )
}