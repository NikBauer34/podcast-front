import { IPodcast, PodcastCard } from "@/entities";
import { EmptyState, PodcastDetailPlayer } from "@/features";
import { HeadPhoneLogo } from "@/shared";
import Image from "next/image";
export default function PodcastItem({
  podcast,
  similarPodcasts,
  isOwner
} : {
  podcast: IPodcast,
  similarPodcasts: IPodcast[],
  isOwner: boolean
}) {
  return (
    <section className="flex w-full flex-col">
      <header className="mt-9 flex items-center justify-between">
        <h1 className="text-20 font-bold text-white-1">
          Currenty Playing
        </h1>
        <figure className="flex gap-3">
          <Image
            src={HeadPhoneLogo}
            width={24}
            height={24}
            alt="headphone"
          />
          <h2 className="text-16 font-bold text-white-1">{podcast?.views}</h2>
        </figure>
      </header>

      <PodcastDetailPlayer 
        isOwner={isOwner}
        podcastId={podcast._id}
        {...podcast}
      />

      <p className="text-white-2 text-16 pb-8 pt-[45px] font-medium max-md:text-center">{podcast?.podcastDescription}</p>

      <div className="flex flex-col gap-8">
        <div className='flex flex-col gap-4'>
          <h1 className='text-18 font-bold text-white-1'>Транскрипция</h1>
          <p className="text-16 font-medium text-white-2">{podcast.voicePrompt}</p>
        </div>
        {podcast.imagePrompt && 
          <div className='flex flex-col gap-4'>
          <h1 className='text-18 font-bold text-white-1'>Запрос для сгенерированного изображения</h1>
          <p className="text-16 font-medium text-white-2">{podcast.imagePrompt}</p>
        </div>
        }
      </div>
      <section className="mt-8 flex flex-col gap-5">
        <h1 className="text-20 font-bold text-white-1">Похожие подкасты</h1>

        {similarPodcasts && similarPodcasts.length > 0 ? (
          <div className="podcast_grid">
            {similarPodcasts?.map(({ _id, podcastTitle, podcastDescription, imageUrl }) => (
              <PodcastCard 
                key={_id}
                imgUrl={imageUrl as string}
                title={podcastTitle}
                description={podcastDescription}
                podcastId={_id}
              />
            ))}
          </div>
        ) : (
          <> 
            <EmptyState 
              title="Не найдено похожих подкастов"
              buttonLink="/discover"
              buttonText="Больше подкастов"
            />
          </>
        )}
      </section>

    </section>
  )
}