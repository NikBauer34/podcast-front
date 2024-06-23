
import { IUser } from "@/entities";
import { $api } from "@/shared"

export default async function getTopPodcasters() {
  const res = await $api.get<IUser[]>('/podcast/get-top')
  return res.data
}