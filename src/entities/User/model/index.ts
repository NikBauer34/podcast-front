import { JWT } from "next-auth/jwt"

export interface IUser {
  email: string
  imageUrl: string
  _id: string
  nickname: string
}
export interface CreateUser {
  email: string
  imageUrl: string
  nickname: string
}
export interface LoginData {
  accessToken: JWT,
  refreshToken: JWT,
  expiresIn: number,
  _id: string
}