import { LeftSidebarWrapper } from "@/widgets";
import { ReactNode } from "react";
import Image from 'next/image'
import { MainLogo, Toaster } from "@/shared";
export default async function RootLayout({children}: {children: ReactNode}) {
  return (
    <div className="relative flex flex-col overflow-y-scroll no-scrollbar">
      <main className="relative flex bg-black-3">
        <LeftSidebarWrapper />

        <section className="flex min-h-screen flex-1 flex-col px-4 sm:px-14">
          <div className="mx-auto flex w-full max-w-5xl flex-col max-sm:px-4">
            <div className="flex h-16 items-center justify-between md:hidden">
              <Image 
                src={MainLogo}
                width={30}
                height={30}
                alt="main logo"
              />
            </div>
            <div className="flex flex-col md:pb-14">
            </div>
            
          </div>
          <Toaster />
          {children}
        </section>
      </main>
    </div>
  )
}