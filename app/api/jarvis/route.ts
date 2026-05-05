import Anthropic from '@anthropic-ai/sdk'
import { NextRequest, NextResponse } from 'next/server'

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
})

export async function POST(request: NextRequest) {
  const { adresse, ville, codePostal, style } = await request.json()

  const message = await client.messages.create({
    model: 'claude-sonnet-4-5',
    max_tokens: 1024,
    messages: [
      {
        role: 'user',
        content: `Tu es Jarvis, l'assistant paysagiste IA de MonJardin.ai. 
        
Un client veut créer un jardin :
- Adresse : ${adresse}, ${ville} (${codePostal})
- Style souhaité : ${style}

Génère un plan d'aménagement avec :
1. 3 plantes recommandées pour cette région
2. Les zones principales du jardin
3. Un budget estimé
4. 2 conseils pour cette région

Réponds en français, de manière chaleureuse.`
      }
    ]
  })

  const response = message.content[0]
  if (response.type === 'text') {
    return NextResponse.json({ result: response.text })
  }

  return NextResponse.json({ error: 'Erreur' }, { status: 500 })
}