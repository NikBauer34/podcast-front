"use client"

import Image from "next/image"
import { useRouter } from "next/navigation"

export default function PodcastCard({
  imgUrl,
  title,
  description, 
  podcastId
} : {
  imgUrl: string,
  title: string,
  description: string,
  podcastId: string
}) {
  const router = useRouter()
  const handleViews = () => {
    router.push(`/podcast/${podcastId}`, {
      scroll: true
    })
  }

  return (
    <div className="cursor-pointer" onClick={handleViews}>
      <figure className="flex flex-col gap-2">
        <Image
          src={imgUrl}
          width={174}
          height={174}
          alt={title}
          className="aspect-square h-fit w-full rounded-xl 2xl:size-[200px]"
        />
        <div className="flex flex-col">
          <h1 className="text-16 truncate basic-label">{title}</h1>
          <h2 className="text-12 truncate font-normal capitalize text-white-4">{description}</h2>
        </div>
      </figure>
    </div>
  )
}