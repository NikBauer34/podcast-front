import { PodcastCard, ProfileCard, getPodcastsByUser, getUserById } from "@/entities";
import { EmptyState } from "@/features";

export default async function Profile({params: {profileId}}: {params: {profileId: string}}) {
  const user = await getUserById(profileId)
  if (typeof user == 'string') {
    return (
      <h1 className="basic-label">Не найдено профиля</h1>
    )
  }
  const podcasts = await getPodcastsByUser(user._id)
  return (
    <section className="mt-9 flex flex-col">
      <h1 className="text-20 font-bold text-white-1 max-md:text-center">
        Профиль создателя подкастов
      </h1>
      <div className="mt-6 flex flex-col gap-6 max-md:items-center md:flex-row">
        <ProfileCard
          podcastData={podcasts}
          imageUrl={user.imageUrl}
          nikname={user.nikname}
        />
      </div>
      <section className="mt-9 flex flex-col gap-5">
        <h1 className="text-20 font-bold text-white-1">Все подкасты</h1>
        {podcasts && podcasts.length > 0 ? (
          <div className="podcast_grid">
            {podcasts
              ?.slice(0, 4)
              .map((podcast) => (
                <PodcastCard
                  key={podcast._id}
                  imgUrl={podcast.imageUrl!}
                  title={podcast.podcastTitle!}
                  description={podcast.podcastDescription}
                  podcastId={podcast._id}
                />
              ))}
          </div>
        ) : (
          <EmptyState
            title="Не одного подкаста не создано"
          />
        )}
      </section>
    </section>
  )
}