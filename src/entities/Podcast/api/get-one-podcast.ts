import { $api } from "@/shared";
import { IPodcast } from "../model";

export default async function getOnePodcast(id: string) {
  try {
    const res = await $api.get<IPodcast>('/podcast/get-one/' + id)
    return res.data
  } catch (e: any) {
    return e?.response?.data?.message as string
  }
}