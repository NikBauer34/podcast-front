import { $api } from "@/shared"
import { IUser } from "../model"

export default async function getUserById(userId: string) {
  try {
    const res = await $api.post<IUser>('/user/get-by-id', {userId})
    return res.data
  } catch (e: any) {
    return e?.response?.data?.message as string
  }
}