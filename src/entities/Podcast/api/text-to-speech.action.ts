"use server"
import { $api } from "@/shared"
import axios from "axios"

export default async function TextToSpeech(voiceType: string, voicePrompt: string): Promise<any> {
  try {
    console.log(`https://tts.api.cloud.yandex.net/speech/v1/tts:synthesize?text="${voicePrompt}"&voice=${voiceType}&format=mp3`)
    const res = await axios.post(`https://tts.api.cloud.yandex.net/speech/v1/tts:synthesize?text="${voicePrompt}"&voice=${voiceType}&format=mp3`, null, {
      headers: {
        Authorization: 'Api-Key ' + process.env.API_KEY
      }
    })
    // const data = await res.arrayBuffer()
    // const blob = new Blob([data], {type: 'audio/mpeg'})
    // return blob
    return res.data
  } catch (e: any) {
    return e?.response?.data?.error_message
  }
}