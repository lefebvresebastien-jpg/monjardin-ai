'use client'
import { useState } from 'react'
import ReactMarkdown from 'react-markdown'

export default function Home() {
  const [adresse, setAdresse] = useState('12 rue du Moulin')
  const [ville, setVille] = useState('Quettehou')
  const [codePostal, setCodePostal] = useState('50630')
  const [style, setStyle] = useState('Naturel Zen')
  const [loading, setLoading] = useState(false)
  const [resultat, setResultat] = useState('')

  async function genererPlan() {
    setLoading(true)
    setResultat('')
    try {
      const response = await fetch('/api/jarvis', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ adresse, ville, codePostal, style })
      })
      const data = await response.json()
      setResultat(data.result)
    } catch (e) {
      setResultat('Erreur — réessayez')
    }
    setLoading(false)
  }

  return (
    <main className="min-h-screen bg-[#FAF7F2] flex flex-col items-center justify-center px-6 py-12">
      
      {/* LOGO */}
      <div className="flex items-center gap-3 mb-8">
        <div className="w-10 h-10 bg-[#1A6640] rounded-xl flex items-center justify-center">
          <span className="text-white text-xl">🌿</span>
        </div>
        <span className="font-bold text-2xl text-[#1A6640]">MonJardin.ai</span>
      </div>

      {/* TITRE */}
      <h1 className="text-4xl font-bold text-center text-[#1C1C18] mb-4 max-w-2xl leading-tight">
        Votre architecte paysagiste,{" "}
        <span className="text-[#1A6640] italic">propulsé par l'IA</span>
      </h1>
      <p className="text-lg text-[#6B6B60] text-center max-w-xl mb-10">
        Entrez votre adresse — Jarvis génère votre plan de jardin personnalisé en quelques secondes.
      </p>

      {/* FORMULAIRE */}
      <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md border border-[#E8F5EE]">
        <div className="mb-4">
          <label className="block text-xs font-semibold text-[#6B6B60] uppercase tracking-wider mb-2">Adresse</label>
          <input type="text" value={adresse} onChange={e => setAdresse(e.target.value)}
            className="w-full px-4 py-3 border border-[#E8F5EE] rounded-xl text-sm focus:outline-none focus:border-[#1A6640] bg-[#FAF7F2]"/>
        </div>
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div>
            <label className="block text-xs font-semibold text-[#6B6B60] uppercase tracking-wider mb-2">Ville</label>
            <input type="text" value={ville} onChange={e => setVille(e.target.value)}
              className="w-full px-4 py-3 border border-[#E8F5EE] rounded-xl text-sm focus:outline-none focus:border-[#1A6640] bg-[#FAF7F2]"/>
          </div>
          <div>
            <label className="block text-xs font-semibold text-[#6B6B60] uppercase tracking-wider mb-2">Code postal</label>
            <input type="text" value={codePostal} onChange={e => setCodePostal(e.target.value)}
              className="w-full px-4 py-3 border border-[#E8F5EE] rounded-xl text-sm focus:outline-none focus:border-[#1A6640] bg-[#FAF7F2]"/>
          </div>
        </div>
        <div className="mb-6">
          <label className="block text-xs font-semibold text-[#6B6B60] uppercase tracking-wider mb-2">Style souhaité</label>
          <select value={style} onChange={e => setStyle(e.target.value)}
            className="w-full px-4 py-3 border border-[#E8F5EE] rounded-xl text-sm focus:outline-none focus:border-[#1A6640] bg-[#FAF7F2]">
            <option>Naturel Zen</option>
            <option>Convivial & Terrasse</option>
            <option>Paysager Classique</option>
            <option>Méditerranéen</option>
            <option>Potager Mixte</option>
          </select>
        </div>
        <button onClick={genererPlan} disabled={loading}
          className="w-full py-4 bg-[#1A6640] text-white rounded-full font-semibold text-base hover:bg-[#2D8F5A] transition-all disabled:opacity-50">
          {loading ? '⏳ Jarvis analyse votre terrain...' : '✨ Générer mon plan gratuit'}
        </button>
      </div>

      {/* RÉSULTAT JARVIS */}
      {resultat && (
        <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-2xl border border-[#E8F5EE] mt-6">
          <div className="flex items-center gap-2 mb-6">
            <span className="text-2xl">🤖</span>
            <span className="font-bold text-xl text-[#1A6640]">Jarvis — votre plan personnalisé</span>
          </div>
          <div className="prose prose-green max-w-none text-[#1C1C18]">
            <ReactMarkdown>{resultat}</ReactMarkdown>
          </div>
        </div>
      )}

      {/* STATS */}
      <div className="flex gap-12 mt-10">
        <div className="text-center"><div className="text-3xl font-bold text-[#1A6640]">2 847</div><div className="text-sm text-[#6B6B60]">jardins créés</div></div>
        <div className="text-center"><div className="text-3xl font-bold text-[#1A6640]">4,8★</div><div className="text-sm text-[#6B6B60]">note moyenne</div></div>
        <div className="text-center"><div className="text-3xl font-bold text-[#1A6640]">18 min</div><div className="text-sm text-[#6B6B60]">temps moyen</div></div>
      </div>

    </main>
  )
}