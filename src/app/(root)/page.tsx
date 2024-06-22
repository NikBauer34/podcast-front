import axios from "axios"
import { getServerSession } from "next-auth"
import { authOptions } from "../api/auth/[...nextauth]/route"

export default async function Page() {
  const data = await axios.get<any[]>('https://jsonplaceholder.typicode.com/posts?_limit=10')
  const session = await getServerSession(authOptions)
  return (
    <h1 className="text-white-1">{session?.user?.accessToken as unknown as string || ''}</h1>
  )
}