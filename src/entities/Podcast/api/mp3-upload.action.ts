"use server"

import { $api } from "@/shared"

export default async function Mp3Upload(file: string) {
  try {
    const res = await $api.post<{file_path: string}>('/bucket/upload-mp3', {file})
    return res.data
  } catch (e: any) {
    return e?.response?.data?.message
  }
}