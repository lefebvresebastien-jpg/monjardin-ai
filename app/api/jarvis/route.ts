import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const { adresse, ville, codePostal } = await req.json();

  try {
    // Étape 1 : Géocodage
    const geoResp = await fetch(
      `https://api-adresse.data.gouv.fr/search/?q=${encodeURIComponent(adresse + ' ' + codePostal + ' ' + ville)}&limit=1`
    );
    const geoData = await geoResp.json();
    const coords = geoData.features?.[0]?.geometry?.coordinates;

    if (!coords) {
      return NextResponse.json({ result: `Adresse non trouvée`, parcelles: [] });
    }

    const [lon, lat] = coords;
    const d = 0.0008;

    // Étape 2 : Cadastre IGN
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

    const cadastreResp = await fetch(
      `https://apicarto.ign.fr/api/cadastre/parcelle?geom=${encodeURIComponent(JSON.stringify(geom))}&_limit=20`
    );
    const cadastreData = await cadastreResp.json();
    const features = cadastreData.features || [];

    // Étape 3 : Formater les parcelles avec vraie surface
    // contenance = surface en ares (1 are = 100 m²)
    const parcelles = features.map((f: any) => ({
      id: `${f.properties.section}-${f.properties.numero}`,
      section: f.properties.section,
      numero: f.properties.numero,
      commune: f.properties.nom_com,
      surface: Math.round((f.properties.contenance || 0) * 100), // ares → m²
      geometry: f.geometry,
    })).filter((p: any) => p.surface > 0)
      .sort((a: any, b: any) => b.surface - a.surface);

    return NextResponse.json({
      result: `${parcelles.length} parcelle(s) trouvée(s)`,
      parcelles,
      coords: { lat, lon }
    });

  } catch (err: any) {
    return NextResponse.json({ result: `Erreur: ${err.message}`, parcelles: [] });
  }
}