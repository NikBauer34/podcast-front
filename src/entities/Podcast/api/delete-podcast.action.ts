"use server"

import { $api } from "@/shared"
import { IPodcast } from "../model"
import { JWT } from "next-auth/jwt"

export default async function deletePodcast(podcastId: string, token: JWT | undefined) {
  try {
    const res = await $api.post<IPodcast>('/podcast/delete', {podcastId}, {
      headers: {
        Authorization: 'Bearer ' + token
      }
    })
    return res.data
  } catch (e: any) {
    return e?.response?.data?.message as string
  }
}