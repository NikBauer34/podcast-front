"use server"

import { $api } from "@/shared"

export default async function generateImage(text: string) {
  try {
    const res = await $api.post<{id: string}>('/bucket/gen-image', {text})
    return res.data
  } catch (e: any) {
    return e?.response?.data?.message as string
  }
}