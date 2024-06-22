import { ReactNode } from "react";
import Image from "next/image"
import { BgImg, Toaster } from "@/shared";
export default function Layout({ children }: { children: ReactNode }) {
  return (
    <main className="relative h-screen w-full">
      <div className="absolute size-full">
        <Image src={BgImg} alt="background" fill className="size-full" />
      </div>

      {children}
      <Toaster />
    </main>
  )
}