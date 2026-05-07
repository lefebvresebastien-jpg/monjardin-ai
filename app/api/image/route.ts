import { NextRequest, NextResponse } from 'next/server';

const STYLES: Record<string, string> = {
  'Naturel Zen': 'natural zen garden, ornamental grasses, hydrangeas, stepping stone path, small wooden deck, soft flowing organic shapes, moss and ground cover',
  'Convivial et Terrasse': 'large wooden terrace for outdoor dining, pergola with climbing roses, colorful flower borders, open central lawn, barbecue corner',
  'Paysager Classique': 'formal garden design, central ornamental pond with water lilies, sculpted boxwood hedges, elegant stone paving, ornamental trees',
  'Mediterraneen': 'Mediterranean garden, lavender, olive trees, terracotta pots, stone paving, dry stone walls, cypress trees',
  'Potager Mixte': 'kitchen garden with raised vegetable beds, fruit trees, herb spiral, compost area, greenhouse',
};

const REGION_CONTEXT: Record<string, string> = {
  normandie: 'Normandy France, hydrangeas, apple trees, lush green Atlantic vegetation',
  bretagne: 'Brittany France coastal, wind-resistant plants, heather, maritime atmosphere',
  paca: 'Provence France, lavender, olive trees, Mediterranean plants, warm sunlight',
  idf: 'Ile-de-France, classic French garden plants, suburban setting',
  default: 'French garden, varied regional plants',
};

function descriptionMaison(batiments: any[], surfaceParcelle: number): string {
  if (!batiments || batiments.length === 0) return '';

  const principale = batiments[0];
  const surf = principale.surface;
  const ratio = surf / surfaceParcelle;

  let position = 'in one corner of the plot';
  const { lat, lon } = principale.centroide || {};

  // Position approximative dans le terrain
  if (lat && lon) {
    position = 'positioned in the upper portion of the plot';
  }

  return `existing house of approximately ${surf}m² ${position}, occupying about ${Math.round(ratio * 100)}% of the plot, shown as a light grey rooftop in the illustration,`;
}

export async function POST(req: NextRequest) {
  const { style, ville, surface, batiments, region } = await req.json();

  const openaiKey = process.env.OPENAI_API_KEY;
  if (!openaiKey) {
    return NextResponse.json({ error: 'Clé OpenAI manquante' }, { status: 500 });
  }

  const styleDesc = STYLES[style] || STYLES['Naturel Zen'];
  const regionCtx = REGION_CONTEXT[region || 'default'] || REGION_CONTEXT.default;
  const maisonDesc = descriptionMaison(batiments || [], surface || 500);

  const prompt = `Isometric architectural garden illustration, professional landscape design rendering,
3/4 top-down view, ${surface || 500}m² residential plot in ${ville || 'France'}, ${regionCtx},
${maisonDesc}
garden design: ${styleDesc},
cream off-white background (#FAF7F2), soft natural daylight with gentle shadows,
lush realistic vegetation with detailed textures, warm wooden tones,
high-end editorial illustration style, clean crisp lines, no people, no text, no labels,
professional landscape architecture portfolio style`;

  try {
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
    return NextResponse.json({ plans: [{ nom: style, url: data.data[0].url }] });

  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}