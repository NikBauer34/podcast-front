import { $api } from "@/shared";
import { IPodcast } from "../model";

export default async function getByTitle(search: string) {
  const res = await $api.post<IPodcast[]>('/podcast/get-by-title', {search})
  return res.data
}