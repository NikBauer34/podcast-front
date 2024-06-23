import { $api } from "@/shared";
import { JWT } from "next-auth/jwt";

export default async function isOwner(podcastId: string, access: JWT | undefined) {
  try {
    const res = await $api.post<{isOwner: boolean}>('/podcast/is-owner', {podcastId}, {
      headers: {
        Authorization: 'Bearer ' + access
      }
    })
    return res.data
  } catch (e: any) {
    return e?.response?.data?.message as string
  }
  
}