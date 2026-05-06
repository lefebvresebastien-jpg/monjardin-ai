import OpenAI from 'openai'
import { NextRequest, NextResponse } from 'next/server'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function POST(request: NextRequest) {
  const { style, ville, zones } = await request.json()

  const prompt = `Vue aérienne d'un jardin ${style} à ${ville}, Normandie, France. 
Style aquarelle professionnelle de paysagiste architecte. 
Rendu vue du dessus avec : ${zones}
Couleurs douces et naturelles, style illustration botanique professionnelle, 
fond blanc légèrement texturé comme du papier aquarelle.
Format plan d'architecte paysagiste, très détaillé et réaliste.`

  const response = await openai.images.generate({
    model: 'dall-e-3',
    prompt: prompt,
    n: 1,
    size: '1024x1024',
    quality: 'standard',
  })

  const imageUrl = response.data?.[0]?.url ?? ''

  return NextResponse.json({ imageUrl })
}