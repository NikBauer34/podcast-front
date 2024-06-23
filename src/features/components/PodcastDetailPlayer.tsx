"use client"
import Image from "next/image"
import { deletePodcast } from "@/entities"
import { Button, DeleteLogo, PlayLogo, ThreeDotsLogo, useAudio, useToast } from "@/shared"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useState } from "react"
export default function PodcastDetailPlayer({
  audioUrl,
  podcastTitle,
  author, 
  imageUrl,
  podcastId,
  isOwner,
  authorImageUrl,
  authorId
} : {
  audioUrl: string,
  podcastTitle: string,
  author: string,
  imageUrl: string,
  podcastId: string,
  isOwner: boolean,
  authorImageUrl: string,
  authorId: string
}) {
  const router = useRouter()
  const {data} = useSession()
  const {setAudio} = useAudio()
  const { toast } = useToast()
  const [isDeleting, setIsDeleting] = useState(false)
  const handleDelete = async () => {
    const podcast = await deletePodcast(podcastId, data?.user?.accessToken)
    if (typeof podcast == 'string') {
      toast({
        title: 'Ошибка: ' + podcast
      })
      return
    }
    toast({
      title: 'Подкаст удален'
    })
    router.push('/')
  }
  const handlePlay = () => {
    setAudio({
      title: podcastTitle,
      audioUrl,
      imageUrl,
      author,
      podcastId
    })
  }
  return (
    <div className="mt-6 flex w-full justify-between max-md:justify-center">
      <div className="flex flex-col gap-8 max-md:items-center md:flex-row">
        <Image
          src={imageUrl}
          width={250}
          height={250}
          alt="Podcast image"
          className="aspect-square rounded-lg"
        />
        <div className="flex w-full flex-col gap-5 max-md:items-center md:gap-9">
          <article className="flex flex-col gap-2 max-md:items-center">
            <h1 className="text-32 font-extrabold tracking-[-0.32px] text-white-1">
              {podcastTitle}
            </h1>
            <figure
              className="flex cursor-pointer items-center gap-2"
              onClick={() => {
                router.push(`/profile/${authorId}`);
              }}
            >
              <Image
                src={authorImageUrl}
                width={30}
                height={30}
                alt="Caster icon"
                className="size-[30px] rounded-full object-cover"
              />
              <h2 className="text-16 font-normal text-white-3">{author}</h2>
            </figure>
          </article>

          <Button
            onClick={handlePlay}
            className="text-16 w-full max-w-[250px] bg-orange-1 font-extrabold text-white-1"
          >
            <Image
              src={PlayLogo}
              width={20}
              height={20}
              alt="random play"
            />{" "}
            &nbsp; Включить подкаст
          </Button>
        </div>
      </div>
      {isOwner && (
        <div className="relative mt-2">
          <Image
            src={ThreeDotsLogo}
            width={20}
            height={30}
            alt="Three dots icon"
            className="cursor-pointer"
            onClick={() => setIsDeleting((prev) => !prev)}
          />
          {isDeleting && (
            <div
              className="absolute -left-32 -top-2 z-10 flex w-32 cursor-pointer justify-center gap-2 rounded-md bg-black-6 py-1.5 hover:bg-black-2"
              onClick={handleDelete}
            >
              <Image
                src={DeleteLogo}
                width={16}
                height={16}
                alt="Delete icon"
              />
              <h2 className="text-16 font-normal text-white-1">Удалить</h2>
            </div>
          )}
        </div>
      )}
    </div>
  )
}