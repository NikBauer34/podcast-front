// @ts-ignore
export const maxDuration = 1000
import { PodcastCard, getByTitle } from "@/entities";
import { Searchbar, EmptyState } from "@/features";

export default async function Discover({ searchParams: {search}} : {searchParams: {search: string}}) {
  const podcasts = await getByTitle(search || '')
  return (
    <div className="flex flex-col gap-9">
      <Searchbar />
      <div className="flex flex-col gap-9">
        <h1 className="text-20 basic-label">
          {!search ? 'Найдите нужный подкаст' : 'Результаты на '}
          {search && <span className="text-white-2">{search}</span>}
        </h1>
        {podcasts && (
          <>
            {podcasts.length > 0 ? (
              <div className="podcast_grid">
                {podcasts.map(el => (
                  <PodcastCard
                  key={el._id}
                  imgUrl={el.imageUrl}
                  title={el.podcastTitle}
                  description={el.podcastDescription}
                  podcastId={el._id}
                  />
                ))}
              </div>
            ) : <EmptyState title="Не найдено ничего" />}
          </>
        )}
      </div>
    </div>
  )
}