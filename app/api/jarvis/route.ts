import Anthropic from '@anthropic-ai/sdk'
import { NextRequest, NextResponse } from 'next/server'

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
})

export async function POST(request: NextRequest) {
  const { adresse, ville, codePostal, style } = await request.json()

  const message = await client.messages.create({
    model: 'claude-sonnet-4-5',
    max_tokens: 2048,
    messages: [
      {
        role: 'user',
        content: `Tu es Jarvis, l'expert paysagiste IA de MonJardin.ai. Tu as 20 ans d'expérience en aménagement paysager en France.

Un client souhaite aménager son jardin :
- Adresse : ${adresse}, ${ville} (${codePostal})
- Style souhaité : ${style}

Génère un plan d'aménagement COMPLET et PROFESSIONNEL avec exactement cette structure :

## 🌿 Plan d'aménagement — ${style} à ${ville}

### 📍 Analyse de votre terrain
Décris le climat local, le type de sol probable, l'exposition, et les contraintes spécifiques à cette région de France. Sois précis et local.

### 🗺️ Zones d'aménagement
Liste 4 à 5 zones distinctes du jardin avec pour chaque zone :
- Nom de la zone
- Surface recommandée en m²
- Description de l'aménagement
- Matériaux suggérés

### 🌱 Liste des végétaux recommandés
Pour chaque plante (8 à 10 plantes), indique :
- Nom commun et nom latin
- Quantité recommandée
- Prix unitaire approximatif
- Raison du choix pour cette région

### 💰 Budget estimé détaillé
Présente un tableau avec :
- Végétaux : X €
- Terrasse/Allées : X €
- Préparation du sol : X €
- Mobilier de jardin : X €
- **TOTAL : X €**
Donne une fourchette basse et haute.

### 📅 Calendrier d'entretien annuel
Pour chaque saison, liste les 3 tâches prioritaires adaptées à ${ville}.

### 💡 3 Conseils d'expert
Donne 3 conseils spécifiques et actionnables pour réussir ce jardin dans cette région.

Sois précis, professionnel et vraiment personnalisé pour ${ville} et la région. Utilise des emojis pour rendre le plan agréable à lire.`
      }
    ]
  })

  const response = message.content[0]
  if (response.type === 'text') {
    return NextResponse.json({ result: response.text })
  }

  return NextResponse.json({ error: 'Erreur' }, { status: 500 })
}