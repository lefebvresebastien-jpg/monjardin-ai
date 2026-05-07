import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const lat = searchParams.get('lat');
  const lon = searchParams.get('lon');

  if (!lat || !lon) {
    return NextResponse.json({ error: 'Paramètres lat et lon requis' }, { status: 400 });
  }

  const d = 0.0008;
  const geom = {
    type: 'Polygon',
    coordinates: [[
      [parseFloat(lon) - d, parseFloat(lat) - d],
      [parseFloat(lon) + d, parseFloat(lat) - d],
      [parseFloat(lon) + d, parseFloat(lat) + d],
      [parseFloat(lon) - d, parseFloat(lat) + d],
      [parseFloat(lon) - d, parseFloat(lat) - d],
    ]],
  };

  const url = `https://apicarto.ign.fr/api/cadastre/parcelle?geom=${encodeURIComponent(JSON.stringify(geom))}&_limit=20`;

  try {
    const response = await fetch(url, {
      headers: { Accept: 'application/json' },
    });
    if (!response.ok) {
      return NextResponse.json({ error: `API IGN: ${response.status}` }, { status: response.status });
    }
    const data = await response.json();
    return NextResponse.json(data);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}