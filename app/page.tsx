'use client'
import { useState } from 'react'
import ReactMarkdown from 'react-markdown'

export default function Home() {
  const [adresse, setAdresse] = useState('')
  const [ville, setVille] = useState('')
  const [codePostal, setCodePostal] = useState('')
  const [style, setStyle] = useState('Naturel Zen')
  const [loading, setLoading] = useState(false)
  const [resultat, setResultat] = useState('')
  const [imageUrl, setImageUrl] = useState('')

  async function genererPlan() {
    setLoading(true)
    setResultat('')
    setImageUrl('')

    try {
      const planResponse = await fetch('/api/jarvis', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ adresse, ville, codePostal, style })
      })
      const planData = await planResponse.json()
      setResultat(planData.result)

      try {
        const imageResponse = await fetch('/api/image', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ style, ville, zones: 'terrasse bois, pelouse, massifs fleuris, haie brise-vent' })
        })
        const imageData = await imageResponse.json()
        if (imageData.imageUrl) setImageUrl(imageData.imageUrl)
      } catch (e) {
        console.log('Image non disponible')
      }

    } catch (e) {
      setResultat('Erreur - reessayez')
    }
    setLoading(false)
  }

  return (
    <main className="min-h-screen bg-[#FAF7F2]">
      <nav className="flex items-center justify-between px-8 py-4 bg-white border-b border-[#E8F5EE] sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-[#1A6640] rounded-xl flex items-center justify-center">
            <span className="text-white text-lg">🌿</span>
          </div>
          <span className="font-bold text-xl text-[#1A6640]">MonJardin.ai</span>
        </div>
        <div className="hidden md:flex items-center gap-8 text-sm text-[#6B6B60]">
          <span className="cursor-pointer hover:text-[#1A6640]">Comment ca marche</span>
          <span className="cursor-pointer hover:text-[#1A6640]">Temoignages</span>
          <a href="/tarifs" className="cursor-pointer hover:text-[#1A6640]">Tarifs</a>
        </div>
        <button className="px-5 py-2 bg-[#1A6640] text-white rounded-full text-sm font-medium hover:bg-[#2D8F5A] transition-all">
          Commencer gratuitement
        </button>
      </nav>

      <section className="flex flex-col items-center text-center px-6 py-20 bg-gradient-to-b from-[#E8F5EE] to-[#FAF7F2]">
        <div className="inline-flex items-center gap-2 bg-white border border-[#E8F5EE] rounded-full px-4 py-2 text-sm text-[#1A6640] font-medium mb-6 shadow-sm">
          <span>🌟</span> Le concurrent de DrawMeAGarden - en mieux
        </div>
        <h1 className="text-5xl md:text-6xl font-bold text-[#1C1C18] mb-6 max-w-3xl leading-tight">
          Votre jardin de reve,<br/>
          <span className="text-[#1A6640] italic">concu par l'IA</span>
        </h1>
        <p className="text-xl text-[#6B6B60] max-w-2xl mb-10 leading-relaxed">
          Entrez votre adresse - Jarvis genere votre plan complet avec rendu visuel en 30 secondes.
        </p>
        <div className="flex gap-10 mb-12">
          <div className="text-center"><div className="text-3xl font-bold text-[#1A6640]">2 847</div><div className="text-sm text-[#6B6B60]">jardins crees</div></div>
          <div className="text-center"><div className="text-3xl font-bold text-[#1A6640]">4,8★</div><div className="text-sm text-[#6B6B60]">note moyenne</div></div>
          <div className="text-center"><div className="text-3xl font-bold text-[#1A6640]">30 sec</div><div className="text-sm text-[#6B6B60]">pour un plan complet</div></div>
          <div className="text-center"><div className="text-3xl font-bold text-[#1A6640]">0€</div><div className="text-sm text-[#6B6B60]">pour commencer</div></div>
        </div>

        <div className="bg-white rounded-3xl shadow-xl p-8 w-full max-w-lg border border-[#E8F5EE]">
          <h2 className="text-xl font-bold text-[#1C1C18] mb-6 text-left">📍 Votre propriete</h2>
          <div className="mb-4">
            <label className="block text-xs font-semibold text-[#6B6B60] uppercase tracking-wider mb-2">Adresse</label>
            <input type="text" value={adresse} onChange={e => setAdresse(e.target.value)}
              placeholder="12 rue du Moulin"
              className="w-full px-4 py-3 border border-[#E8F5EE] rounded-xl text-sm focus:outline-none focus:border-[#1A6640] bg-[#FAF7F2]"/>
          </div>
          <div className="grid grid-cols-2 gap-3 mb-4">
            <div>
              <label className="block text-xs font-semibold text-[#6B6B60] uppercase tracking-wider mb-2">Ville</label>
              <input type="text" value={ville} onChange={e => setVille(e.target.value)}
                placeholder="Quettehou"
                className="w-full px-4 py-3 border border-[#E8F5EE] rounded-xl text-sm focus:outline-none focus:border-[#1A6640] bg-[#FAF7F2]"/>
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#6B6B60] uppercase tracking-wider mb-2">Code postal</label>
              <input type="text" value={codePostal} onChange={e => setCodePostal(e.target.value)}
                placeholder="50630"
                className="w-full px-4 py-3 border border-[#E8F5EE] rounded-xl text-sm focus:outline-none focus:border-[#1A6640] bg-[#FAF7F2]"/>
            </div>
          </div>
          <div className="mb-6">
            <label className="block text-xs font-semibold text-[#6B6B60] uppercase tracking-wider mb-2">Style souhaite</label>
            <select value={style} onChange={e => setStyle(e.target.value)}
              className="w-full px-4 py-3 border border-[#E8F5EE] rounded-xl text-sm focus:outline-none focus:border-[#1A6640] bg-[#FAF7F2]">
              <option>Naturel Zen</option>
              <option>Convivial et Terrasse</option>
              <option>Paysager Classique</option>
              <option>Mediterraneen</option>
              <option>Potager Mixte</option>
            </select>
          </div>
          <button onClick={genererPlan} disabled={loading}
            className="w-full py-4 bg-[#1A6640] text-white rounded-full font-semibold text-base hover:bg-[#2D8F5A] transition-all disabled:opacity-50 shadow-lg">
            {loading ? '⏳ Jarvis genere votre plan...' : '✨ Generer mon plan gratuit →'}
          </button>
          <p className="text-center text-xs text-[#6B6B60] mt-3">
            🔒 Donnees cadastrales officielles · Gratuit · Sans carte bancaire
          </p>
        </div>
      </section>

      {(resultat || imageUrl) && (
        <section className="flex flex-col items-center px-6 py-12 bg-[#FAF7F2] gap-8">
          {imageUrl && (
            <div className="bg-white rounded-3xl shadow-xl p-6 w-full max-w-3xl border border-[#E8F5EE]">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-[#E8F5EE] rounded-xl flex items-center justify-center text-xl">🎨</div>
                <div>
                  <div className="font-bold text-lg text-[#1A6640]">Rendu visuel - Style {style}</div>
                  <div className="text-sm text-[#6B6B60]">Genere par DALL-E 3 · Inspiration visuelle</div>
                </div>
              </div>
              <img src={imageUrl} alt="Rendu jardin" className="w-full rounded-2xl shadow-md"/>
            </div>
          )}
          {resultat && (
            <div className="bg-white rounded-3xl shadow-xl p-10 w-full max-w-3xl border border-[#E8F5EE]">
              <div className="flex items-center gap-3 mb-8 pb-6 border-b border-[#E8F5EE]">
                <div className="w-12 h-12 bg-[#E8F5EE] rounded-2xl flex items-center justify-center text-2xl">🤖</div>
                <div>
                  <div className="font-bold text-xl text-[#1A6640]">Jarvis - votre plan complet</div>
                  <div className="text-sm text-[#6B6B60]">Genere par Claude · Adapte a votre region</div>
                </div>
              </div>
              <div className="prose prose-green max-w-none text-[#1C1C18] leading-relaxed">
                <ReactMarkdown>{resultat}</ReactMarkdown>
              </div>
              <div className="mt-8 pt-6 border-t border-[#E8F5EE] flex gap-3">
                <button className="flex-1 py-3 bg-[#1A6640] text-white rounded-full font-medium text-sm hover:bg-[#2D8F5A] transition-all">
                  💾 Sauvegarder ce plan
                </button>
                <button className="flex-1 py-3 border border-[#E8F5EE] text-[#6B6B60] rounded-full font-medium text-sm hover:border-[#1A6640] hover:text-[#1A6640] transition-all">
                  🔄 Generer une variante
                </button>
              </div>
            </div>
          )}
        </section>
      )}

      <section className="px-6 py-20 max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-[#1C1C18] mb-4">Pourquoi MonJardin.ai ?</h2>
        <p className="text-center text-[#6B6B60] mb-12">Tout ce que DrawMeAGarden faisait, en mieux et moins cher.</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white rounded-2xl p-6 border border-[#E8F5EE] shadow-sm">
            <div className="text-3xl mb-4">📐</div>
            <h3 className="font-bold text-lg mb-2">Cotes cadastrales officielles</h3>
            <p className="text-[#6B6B60] text-sm leading-relaxed">Les vraies dimensions de votre terrain depuis cadastre.gouv.fr.</p>
          </div>
          <div className="bg-white rounded-2xl p-6 border border-[#E8F5EE] shadow-sm">
            <div className="text-3xl mb-4">🎨</div>
            <h3 className="font-bold text-lg mb-2">Rendu visuel IA</h3>
            <p className="text-[#6B6B60] text-sm leading-relaxed">DALL-E 3 genere un rendu aquarelle professionnel de votre jardin.</p>
          </div>
          <div className="bg-white rounded-2xl p-6 border border-[#E8F5EE] shadow-sm">
            <div className="text-3xl mb-4">💰</div>
            <h3 className="font-bold text-lg mb-2">39€/an au lieu de 1 500€</h3>
            <p className="text-[#6B6B60] text-sm leading-relaxed">Un architecte paysagiste coute des milliers euros. Pas MonJardin.ai.</p>
          </div>
        </div>
      </section>

      <footer className="bg-[#1C1C18] text-white py-10 px-8">
        <div className="max-w-5xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-[#1A6640] rounded-lg flex items-center justify-center text-sm">🌿</div>
            <span className="font-bold text-[#1A6640]">MonJardin.ai</span>
          </div>
          <div className="text-sm text-[#6B6B60]">© 2026 MonJardin.ai · Quettehou, Normandie</div>
        </div>
      </footer>
    </main>
  )
}