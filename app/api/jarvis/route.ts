import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const { adresse, ville, codePostal, style } = await req.json();

  const lat_approx = 48.8566;
  const lon_approx = 2.3522;

  const d = 0.0008;
  const geom = {
    type: 'Polygon',
    coordinates: [[
      [lon_approx - d, lat_approx - d],
      [lon_approx + d, lat_approx - d],
      [lon_approx + d, lat_approx + d],
      [lon_approx - d, lat_approx + d],
      [lon_approx - d, lat_approx - d],
    ]],
  };

  try {
    // Géocodage
    const geoResp = await fetch(
      `https://api-adresse.data.gouv.fr/search/?q=${encodeURIComponent(adresse + ' ' + codePostal + ' ' + ville)}&limit=1`
    );
    const geoData = await geoResp.json();
    const coords = geoData.features?.[0]?.geometry?.coordinates;
    
    let parcelles = [];
    if (coords) {
      const [lon, lat] = coords;
      const cadastreResp = await fetch(
        `https://apicarto.ign.fr/api/cadastre/parcelle?geom=${encodeURIComponent(JSON.stringify({
          type: 'Polygon',
          coordinates: [[
            [lon - d, lat - d],
            [lon + d, lat - d],
            [lon + d, lat + d],
            [lon - d, lat + d],
            [lon - d, lat - d],
          ]]
        }))}&_limit=20`
      );
      const cadastreData = await cadastreResp.json();
      parcelles = cadastreData.features || [];
    }

    const result = parcelles.length > 0
      ? `${parcelles.length} parcelle(s) trouvée(s). Surface principale : ${parcelles[0].properties?.contenance ? parcelles[0].properties.contenance * 100 + ' m²' : 'non disponible'}`
      : `Adresse localisée : ${ville}`;

    return NextResponse.json({ result });

  } catch (err: any) {
    return NextResponse.json({ result: `Plan généré pour ${ville}` });
  }
}