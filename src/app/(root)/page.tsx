// @ts-ignore
export const maxDuration = 1000
import axios from "axios"
import { getServerSession } from "next-auth"
import { authOptions } from "../api/auth/[...nextauth]/route"
import getTranding from "@/entities/Podcast/api/get-tranding"
import { PodcastCard } from "@/entities"

export default async function Page() {
  const trendingPodcasts = await getTranding()
  return (
    <div className="mt-9 flex flex-col gap-9 md:overflow-hidden">
      <section className="flex flex-col gap-5">
        <h1 className="text-20 basic-label">Подкасты в тренде</h1>
        <div className="podcast_grid">
          {trendingPodcasts.map(el => (
            <PodcastCard
              key={el._id}
              imgUrl={el.imageUrl}
              title={el.podcastTitle}
              description={el.podcastDescription}
              podcastId={el._id}
            />
          ))}
        </div>
      </section>
    </div>
  )
}