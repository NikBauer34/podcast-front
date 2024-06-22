"use server"
import { $api } from "@/shared"
import axios from "axios"

export default async function getAudio(audio: string): Promise<any> {
  try {
    const res = await $api.get<{file_path: string}>('/bucket/audio/' + audio)
    return res.data
  } catch (e: any) {
    return e?.response?.data?.message as string
  }
}