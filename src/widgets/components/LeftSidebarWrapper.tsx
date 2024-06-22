"use client"
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import LeftSidebar from "./LeftSidebar";
import { useSession } from "next-auth/react";

export default function LeftSidebarWrapper() {
  const {status} = useSession()
  return (
    <LeftSidebar status={status}/>
  )
}