export interface IPodcast {
  _id: string
  author: string
  authorId: string
  authorImageUrl: string
  podcastTitle: string
  podcastDescription: string
  audioUrl: string
  imageUrl: string
  voicePrompt: string
  imagePrompt: string
  voiceType: string
  audioDuration: number
  views: number
  type: 'private' | 'public'
}
export interface CreatePodcast {
  podcastTitle: string
  podcastDescription: string
  audioUrl: string
  imageUrl: string
  voicePrompt: string
  imagePrompt: string
  voiceType: string
  audioDuration: number
  views: number
  type: 'private' | 'public'
}