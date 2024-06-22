"use server"
import { $api } from "@/shared"
import axios from "axios"

export default async function getImage(id: string) {
  try {
    console.log('/bucket/image/'+id)
    const res = await $api.get<{file_path: string}>('/bucket/image/' + id)
    return res.data
  } catch (e: any) {
    return e?.response?.data?.message as string
  }
}