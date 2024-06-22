import { UserAuthForm } from '@/features'
import { Button, Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, Input, Label } from '@/shared'
export default function LoginForm() {
  return (
    <Card className="w-full max-w-sm bg-black-3">
      <CardHeader>
        <CardTitle className="text-2xl text-20 basic-label">Вход</CardTitle>
        <CardDescription className='font-bold text-white-1'>
          Введите никнейм и пароль для входа в аккаунт
        </CardDescription>
      </CardHeader>
      <UserAuthForm />
    </Card>
  )
}