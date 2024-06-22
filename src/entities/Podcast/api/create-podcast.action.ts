"use server"

import { $api } from "@/shared"
import { JWT } from "next-auth/jwt"
import { IPodcast } from "../model"

export default async function createPodcast(
  {
    podcastTitle, 
    podcastDescription,
    audioUrl,
    imageUrl,
    voiceType,
    imagePrompt,
    voicePrompt,
    views,
    audioDuration,
    refresh,
    type
  } : {
    podcastTitle: string,
    podcastDescription: string
    audioUrl: string
    imageUrl: string
    voiceType: string
    imagePrompt: string
    voicePrompt: string
    views: number
    audioDuration: number
    refresh: JWT | undefined,
    type: 'public' | 'private'
  }
) {
  try {
    const res = await $api.post<IPodcast>('/podcast/create', {podcastDescription, podcastTitle, audioUrl, imageUrl, voiceType, imagePrompt, voicePrompt, views, audioDuration, type}, {
      headers: {
        Authorization: 'Bearer ' + refresh
      }
    })
    return res.data
  } catch (e: any) {
    return e?.response?.data?.message as string
  }
}