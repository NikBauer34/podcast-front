"use client"
import { Button } from "@/shared"
import { signOut } from "next-auth/react"
import { useRouter } from "next/navigation"

export default function SignOutButton() {
  const router = useRouter()
  return (
    <div className="flex-center w-full pb-14 max-lg:px-4 lg:pr-8">
      <Button className="text-16 w-full bg-orange-1 font-extrabold" onClick={async () => {
        await signOut()
      }}>
        Выйти
      </Button>
    </div>
  )
}