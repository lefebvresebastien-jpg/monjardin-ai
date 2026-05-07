import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const { adresse, ville, codePostal } = await req.json();

  try {
    const geoResp = await fetch(
      `https://api-adresse.data.gouv.fr/search/?q=${encodeURIComponent(adresse + ' ' + codePostal + ' ' + ville)}&limit=1`
    );
    const geoData = await geoResp.json();
    const coords = geoData.features?.[0]?.geometry?.coordinates;

    if (!coords) {
      return NextResponse.json({ result: 'Adresse non trouvée', parcelles: [] });
    }

    const [lon, lat] = coords;
    const d = 0.0008;
    const geom = {
      type: 'Polygon',
      coordinates: [[
        [lon - d, lat - d],
        [lon + d, lat - d],
        [lon + d, lat + d],
        [lon - d, lat + d],
        [lon - d, lat - d],
      ]]
    };
    const geomStr = encodeURIComponent(JSON.stringify(geom));

    const [cadastreResp, batimentResp] = await Promise.all([
      fetch(`https://apicarto.ign.fr/api/cadastre/parcelle?geom=${geomStr}&_limit=20`),
      fetch(`https://apicarto.ign.fr/api/cadastre/batiment?geom=${geomStr}&_limit=20`)
    ]);

    const cadastreData = await cadastreResp.json();
    const batimentData = await batimentResp.json();

    const parcelles = (cadastreData.features || []).map((f: any) => ({
      id: `${f.properties.section}-${f.properties.numero}`,
      section: f.properties.section,
      numero: f.properties.numero,
      commune: f.properties.nom_com,
      surface: Math.round((f.properties.contenance || 0) * 100),
      geometry: f.geometry,
    })).filter((p: any) => p.surface > 0)
      .sort((a: any, b: any) => b.surface - a.surface);

    const batiments = (batimentData.features || []).map((f: any) => {
      const coords = f.geometry?.coordinates?.[0] || [];
      let surface = 0;
      if (coords.length > 2) {
        for (let i = 0; i < coords.length - 1; i++) {
          surface += coords[i][0] * coords[i + 1][1];
          surface -= coords[i + 1][0] * coords[i][1];
        }
        surface = Math.abs(surface / 2) * 111000 * 111000;
      }
      const lons = coords.map((c: number[]) => c[0]);
      const lats = coords.map((c: number[]) => c[1]);
      return {
        surface: Math.round(surface),
        centroide: {
          lat: (Math.min(...lats) + Math.max(...lats)) / 2,
          lon: (Math.min(...lons) + Math.max(...lons)) / 2
        },
        geometry: f.geometry,
      };
    }).filter((b: any) => b.surface > 5);

    const googleKey = process.env.GOOGLE_MAPS_API_KEY;
    const satelliteUrl = googleKey
      ? `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lon}&zoom=19&size=600x600&maptype=satellite&key=${googleKey}`
      : null;

    return NextResponse.json({
      result: `${parcelles.length} parcelle(s) trouvée(s)`,
      parcelles,
      batiments,
      satelliteUrl,
      coords: { lat, lon }
    });

  } catch (err: any) {
    return NextResponse.json({ result: `Erreur: ${err.message}`, parcelles: [] });
  }
}