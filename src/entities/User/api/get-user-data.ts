import { $api } from "@/shared";
import { JWT } from "next-auth/jwt";
import { IUser } from "../model";

export default async function getUserData(access: JWT | undefined) {
  try {
    const res = await $api.get<IUser>('/user/get-user-data', {
      headers: {
        Authorization: 'Bearer ' + access || ''
      }
    })
    return res.data
  } catch (e: any) {
    return e?.response?.data?.message as string
  }
}