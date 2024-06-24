// @ts-ignore
export const maxDuration = 60
import { signin } from "@/entities";
import { $api } from "@/shared";
import { NextAuthOptions } from "next-auth";
import { JWT } from "next-auth/jwt";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import { redirect } from "next/navigation";
async function refresh(token: JWT): Promise<JWT> {
  try {
    const res = await $api.post<{accessToken: JWT, refreshToken: JWT, expiresIn: number}>('/auth/refresh', {refreshToken: token.refreshToken})
    return {
      ...token,
      accessToken: res.data.accessToken,
      refreshToken: res.data.refreshToken,
      expiresIn: res.data.expiresIn,

    }
  } catch (e: any) {
    redirect('/sign-in?session_over=true')
  }
  
}
export const authOptions: NextAuthOptions = {
  session: {
    strategy: 'jwt'
  },
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        nikname: {
          label: 'nikname',
          type: 'text'
        },
        password: {label: 'password', type: 'password'}
      },
      async authorize(credentials, req) {
        if (!credentials?.nikname || !credentials?.password) return null
        const {nikname, password} = credentials
        console.log({nikname, password})
        const data = await signin(nikname, password)
        if (typeof data == 'string') {
          console.log(data)
          throw new Error(`${data}`)
        }

        return {
          _id: data._id,
          accessToken: data.accessToken,
          refreshToken: data.refreshToken,
          expiresIn: data.expiresIn,
          nikname
        }
      },
    })
  ],
  callbacks: {
    async jwt({token, user}) {
      if (user) return {...token, ...user}
      if (new Date().getTime() < token.expiresIn) {
        return token
      }
      return await refresh(token)
    },
    async session({token, session}) {
      session.user = {...token}
      return session
    },
  }
}
const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }