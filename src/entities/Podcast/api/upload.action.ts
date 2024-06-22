
export default async function Upload(voiceType: string, voicePrompt: string): Promise<any> {
  try {
    console.log(`https://tts.api.cloud.yandex.net/speech/v1/tts:synthesize?text="${voicePrompt}"&voice=${voiceType}&format=mp3`)
    const res = await fetch(`https://tts.api.cloud.yandex.net/speech/v1/tts:synthesize?text="${voicePrompt}"&voice=${voiceType}&format=mp3`,  {
      mode: 'no-cors',
      headers: {
        Authorization: 'Api-Key ' + process.env.API_KEY
      }
    })
    const data = await res.arrayBuffer()
    return data
  } catch (e: any) {
    return e?.response?.data?.error_message
  }
}