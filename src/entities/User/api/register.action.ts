"use server"

import { $api } from "@/shared"
import { LoginData } from "../model"

export default async function register(nikname: string, password: string, imageUrl: string, email: string): Promise<LoginData | string> {
  try {
    const res = await $api.post<LoginData>('/auth/registration', {nikname, password, imageUrl, email})
    return res.data
  } catch (e: any) {
    return e?.response?.data?.message
  }
}