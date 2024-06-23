
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { IUser, getTopPodcasters, getUserData } from "@/entities";
import { getServerSession } from "next-auth";
import RightSidebar from "./RightSidebar";

export default async function RightSidebarWrapper() {
  const session = await getServerSession(authOptions)
  const token = session?.user?.accessToken
  let user: IUser | string = await getUserData(token) 
  const topPodcasters = await getTopPodcasters()
  console.log(user)

  return (
    <RightSidebar user={user} topPodcasters={topPodcasters} />
  )
}