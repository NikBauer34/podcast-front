"use server"

import { $api } from "@/shared"
import { LoginData } from "../model"

export default async function signin(nikname: string, password: string): Promise<LoginData | string> {
  try {
    const res = await $api.post<LoginData>(`/auth/login`, {nikname, password})
    return res.data
  } catch (e: any) {
    return e?.response?.data?.message
  }
}