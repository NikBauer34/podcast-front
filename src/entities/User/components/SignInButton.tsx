import { Button } from "@/shared";
import Link from "next/link";

export default function SignInButton() {
  return (
    <div className="flex-center w-full pb-14 max-lg:px-4 lg:pr-8">
      <Button asChild className="text-16 w-full bg-orange-1 font-extrabold">
        <Link href="/sign-in">Войти</Link>
      </Button>
    </div>
  )
}