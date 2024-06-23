import { $api } from "@/shared";
import { IPodcast } from "../model";

export default async function getPodcastsByUser(userId: string) {
  const res = await $api.post<IPodcast[]>('/podcast/by-user', {userId})
  return res.data
}