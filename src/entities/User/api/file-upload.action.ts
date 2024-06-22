"use server"

import { $api } from "@/shared"

export default async function FileUpload(formdata: FormData): Promise<{file_path: string} | string> {
  try {
    const res = await $api.post<{file_path: string}>('/bucket/upload', formdata)
    return res.data
  } catch (e: any) {
    return e?.response?.data?.message
  }

}