import { $api } from "@/shared";
import { IPodcast } from "../model";

export default async function getTranding() {
  const res = await $api.get<IPodcast[]>('/podcast/get-tranding')
  return res.data
}