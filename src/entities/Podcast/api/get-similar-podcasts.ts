import { $api } from "@/shared";
import { IPodcast } from "../model";

export default async function getSimilarPodcasts(voiceType: string, podcastId: string) {
  const res = await $api.post<IPodcast[]>('/podcast/get-similar', {voiceType, podcastId})
  return res.data
}