"use client"

import { Button, LoaderSpinner, MainLogo, cn, useAudio } from "@/shared"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import Image from "next/image"
import { SignInButton, SignOutButton, privateLinks, publicLinks } from "@/entities"
import { signOut } from "next-auth/react"
export default function LeftSidebar({status}: {status: 'authenticated' | 'unauthenticated' | 'loading'}) {
  const pathname = usePathname()
  const router = useRouter()
  let {audio} = useAudio()
  return (
    <section className={cn("left_sidebar h-[calc(100vh-5px)]", {
      'h-[calc(100vh-140px)]': audio?.audioUrl
    })}>
      <nav className="flex flex-col gap-6 w-[200px] items-start">
        <Link href='/' className="cursor-pointer items-center gap-3 pb-10 max-lg:justify-center flex md:flex-row">
          <Image src={MainLogo} alt="logo" width={23} height={27} />
          <h1 className="text-24 font-extrabold text-white-1 max-lg:hidden">ПодкастИИ</h1>
        </Link>
        {status == 'unauthenticated' && publicLinks.map(el => {
          const isActive = pathname === el.route || pathname.startsWith(`${el.route}/`)
          return <Link href={el.route} key={el.label} className={cn('flex gap-3 items-center py-4 max-lg:px-4 justify-center lg:justify-start w-full', {
            'bg-nav-focus border-r-4 border-orange-1': isActive
          })}>
            <Image src={el.imgUrl} alt={el.label} width={24} height={24} />
            <p>{el.label}</p>
          </Link>
        })}
        {status == 'authenticated' && privateLinks.map(el => {
          const isActive = pathname === el.route || pathname.startsWith(`${el.route}/`)
          return <Link href={el.route} key={el.label} className={cn('flex gap-3 items-center py-4 max-lg:px-4 justify-center lg:justify-start w-full', {
            'bg-nav-focus border-r-4 border-orange-1': isActive
          })}>
            <Image src={el.imgUrl} alt={el.label} width={24} height={24} />
            <p>{el.label}</p>
          </Link>
        })}
        {status == 'loading' && <div className="flex items-center justify-center w-full h-full"><LoaderSpinner className="self-center"/></div>}
      </nav>
      {status == 'authenticated' &&
        <SignOutButton />
      }
      {status == 'unauthenticated' &&
        <SignInButton />
      }

    </section>
  )
}