// @ts-ignore
export const maxDuration = 60
export const dynamic = "force-dynamic";
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { getOnePodcast, getSimilarPodcasts, updateViews } from "@/entities"
import { PodcastItem } from "@/widgets"
import { getServerSession } from "next-auth"
import { unstable_noStore } from "next/cache";

export default async function PodcastDetails({ params: {podcastId}}: {params: {podcastId: string}}) {
  const session = await getServerSession(authOptions)
  const user_id = session?.user?._id
  const podcast = await getOnePodcast(podcastId)
  if (typeof podcast == 'string') {
    return (
      <h1 className="basic-label">Не найден подкаст</h1>//h
    )
  }
  const similarPodcasts = await getSimilarPodcasts(podcast.voiceType, podcast._id)
  let newSimilarPodcasts = similarPodcasts.filter(el => el._id !== podcast._id)
  const isOwner = (user_id as unknown as string || '') === podcast.authorId
  return (
    <PodcastItem podcast={podcast} similarPodcasts={newSimilarPodcasts} isOwner={isOwner}/>
  )
}