'use client'
import Image from "next/image";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { IUser } from "@/entities";
import { Header, RightArrowLogo, cn, useAudio } from "@/shared";
import { getServerSession } from "next-auth";
import { useRouter } from "next/navigation";
import { SignedIn } from "@/features";
import Link from "next/link";
import { useSession } from "next-auth/react";

export default function RightSidebar({
  user,
  topPodcasters
} : {
  user: IUser | string,
  topPodcasters: IUser[]
}) {
  console.log(user)
  const router = useRouter()
  const {audio} = useAudio()

  return (
    <section className={cn('right_sidebar h-[calc(100vh-5px)]', {
      'h-[calc(100vh-140px)]': audio?.audioUrl
    })}>
      {typeof user !== 'string' && 
        <Link href={`/profile/${user?._id}`} className="flex gap-3 pb-12">
        <Image
         src={user.imageUrl}
         width={20}
         height={20}
         className="rounded-md"
         alt='logo'
        />
        <div className="flex w-full items-center justify-between">
          <h1 className="basic-label">{user.nikname}</h1>
          <Image 
            src={RightArrowLogo}
            alt="arrow"
            width={24}
            height={24}
          />
        </div>
      </Link>
      }
      
      <section>
      {/* <Carousel fansLikeDetail={topPodcasters!}/>  */}
      </section>
      <section className="flex flex-col gap-8 pt-12">
        <Header headerTitle="Крутые подкастеры" />
        <div className="flex flex-col gap-6">
          {topPodcasters?.slice(0, 3).map((podcaster) => (
            <div key={podcaster._id} className="flex cursor-pointer justify-between" onClick={() => router.push(`/profile/${podcaster._id}`)}>
              <figure className="flex items-center gap-2">
                <Image
                  src={podcaster.imageUrl}
                  alt={podcaster.nikname}
                  width={44}
                  height={44}
                  className="aspect-square rounded-lg"
                />
                <h2 className="text-14 font-semibold text-white-1">{podcaster.nikname}</h2>
              </figure>
            </div>
          ))}
        </div>
      </section>
    </section>
  )
}