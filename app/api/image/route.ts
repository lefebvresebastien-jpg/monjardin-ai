import OpenAI from 'openai'
import { NextRequest, NextResponse } from 'next/server'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function POST(request: NextRequest) {
  const { style, ville, zones } = await request.json()

  const stylePrompts: Record<string, string> = {
    'Naturel Zen': 'bambous, graminées ondulantes, galets blancs, bassin zen, terrasse bois gris, pelouse naturelle, massifs de fougères et mousses',
    'Convivial et Terrasse': 'grande terrasse composite, salon de jardin, barbecue, massifs de rosiers, gazon impeccable, éclairage LED, pergola bois',
    'Paysager Classique': 'parterres symétriques, ifs taillés en boule, bassin central, allées gravillonnées, haies formelles, roses anciennes',
    'Mediterraneen': 'oliviers, lavandes, cyprès, terrasse pierre naturelle, poterie terra cotta, garrigue, couleurs ocre et bleu',
    'Potager Mixte': 'carrés potagers surélevés, serre en verre, composteur, chemin en bois, arbres fruitiers, herbes aromatiques',
  }

  const styleDetail = stylePrompts[style] || stylePrompts['Naturel Zen']

  const prompt = `Professional landscape architecture watercolor rendering, bird's eye isometric view at 45 degrees, garden design plan for ${ville} Normandy France.

Style: ${style} garden featuring ${styleDetail}.

Technical specifications:
- Architectural watercolor illustration, hand-drawn quality
- Perfect isometric projection, 45-degree angle view
- Lush photorealistic vegetation with detailed textures
- Natural shadows and light from top-left
- Stone or composite pathways clearly visible
- Surrounding hedge or fence boundary
- Color palette: deep greens, warm earth tones, soft whites
- Paper texture background, professional landscape architect presentation
- Ultra detailed, 4K quality, sharp edges

The garden should look like a professional French landscape architect's presentation drawing, similar to high-end garden design studios. Include realistic tree canopies with shadows, flower beds in bloom, and clear zone separation.`

  const response = await openai.images.generate({
    model: 'dall-e-3',
    prompt: prompt,
    n: 1,
    size: '1024x1024',
    quality: 'hd',
  })

  const imageUrl = response.data?.[0]?.url ?? ''

  return NextResponse.json({ imageUrl })
}