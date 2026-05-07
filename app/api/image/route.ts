import { NextRequest, NextResponse } from 'next/server';

const PLANS = [
  {
    nom: 'Naturel & Zen',
    desc: 'natural zen garden, ornamental grasses, hydrangeas, stepping stone path, small wooden deck, soft flowing organic shapes, moss and ground cover',
  },
  {
    nom: 'Convivial & Terrasse',
    desc: 'large wooden terrace for outdoor dining, pergola with climbing roses, colorful flower borders, open central lawn, barbecue corner',
  },
  {
    nom: 'Paysager & Prestige',
    desc: 'formal garden design, central ornamental pond with water lilies, sculpted boxwood hedges, elegant stone paving, ornamental trees, curved borders',
  },
];

const REGION_CONTEXT: Record<string, string> = {
  normandie: 'Normandy France, hydrangeas, apple trees, lush green Atlantic vegetation',
  bretagne: 'Brittany France coastal, wind-resistant plants, heather, maritime atmosphere',
  paca: 'Provence France, lavender, olive trees, Mediterranean plants, warm sunlight',
  idf: 'Ile-de-France, classic French garden plants, suburban setting',
  default: 'French garden, varied regional plants',
};

export async function POST(req: NextRequest) {
  const { surface, region, style, ville } = await req.json();

  const openaiKey = process.env.OPENAI_API_KEY;
  if (!openaiKey) {
    return NextResponse.json({ error: 'Clé OpenAI manquante' }, { status: 500 });
  }

  const regionCtx = REGION_CONTEXT[region] || REGION_CONTEXT.default;

  try {
    const results = await Promise.all(
      PLANS.map(async (plan) => {
        const prompt = `Isometric architectural garden illustration, professional landscape design rendering, 
3/4 top-down view, ${surface || 500}m² residential garden in ${ville || 'France'}, ${regionCtx},
${plan.desc},
cream off-white background (#FAF7F2), soft natural daylight with gentle shadows,
lush realistic vegetation with detailed textures, warm wooden tones,
high-end editorial illustration style, clean crisp lines, no people, no text, no labels,
professional landscape architecture portfolio style`;

        const response = await fetch('https://api.openai.com/v1/images/generations', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${openaiKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            model: 'dall-e-3',
            prompt,
            n: 1,
            size: '1024x1024',
            quality: 'hd',
            style: 'natural',
          }),
        });

        if (!response.ok) {
          const err = await response.json();
          throw new Error(err.error?.message || `OpenAI: ${response.status}`);
        }

        const data = await response.json();
        return { nom: plan.nom, url: data.data[0].url };
      })
    );

    return NextResponse.json({ plans: results });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}