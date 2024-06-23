'use server'

import { $api } from "@/shared"

export default async function updateViews(podcastId: string) {
  const res = await $api.get('/podcast/update-views/' + podcastId)
  return res.data
}