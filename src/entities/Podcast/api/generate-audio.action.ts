"use server"
import { $api } from "@/shared"

export default async function generateAudio(voiceType: string, voicePrompt: string) {
  try {
    const res = await $api.post<string>('/bucket/buffer', {voice: voicePrompt, type: voiceType})
    return {mp3: res.data}
  } catch (e: any) {
    return e?.response?.data?.message as string
  }
}