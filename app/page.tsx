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
    <main className="min-h-screen bg-[#FAF7F2]">

      {/* NAV */}
      <nav className="flex items-center justify-between px-8 py-4 bg-white border-b border-[#E8F5EE] sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-[#1A6640] rounded-xl flex items-center justify-center">
            <span className="text-white text-lg">🌿</span>
          </div>
          <span className="font-bold text-xl text-[#1A6640]">MonJardin.ai</span>
        </div>
        <div className="hidden md:flex items-center gap-8 text-sm text-[#6B6B60]">
          <span className="cursor-pointer hover:text-[#1A6640]">Comment ça marche</span>
          <span className="cursor-pointer hover:text-[#1A6640]">Témoignages</span>
          <span className="cursor-pointer hover:text-[#1A6640]">Tarifs</span>
        </div>
        <button className="px-5 py-2 bg-[#1A6640] text-white rounded-full text-sm font-medium hover:bg-[#2D8F5A] transition-all">
          Commencer gratuitement
        </button>
      </nav>

      {/* HERO */}
      <section className="flex flex-col items-center text-center px-6 py-20 bg-gradient-to-b from-[#E8F5EE] to-[#FAF7F2]">
        <div className="inline-flex items-center gap-2 bg-white border border-[#E8F5EE] rounded-full px-4 py-2 text-sm text-[#1A6640] font-medium mb-6 shadow-sm">
          <span>🌟</span> Le concurrent de DrawMeAGarden — en mieux
        </div>
        <h1 className="text-5xl md:text-6xl font-bold text-[#1C1C18] mb-6 max-w-3xl leading-tight">
          Votre jardin de rêve,<br/>
          <span className="text-[#1A6640] italic">conçu par l'IA</span>
        </h1>
        <p className="text-xl text-[#6B6B60] max-w-2xl mb-10 leading-relaxed">
          Entrez votre adresse — on récupère les cotes cadastrales officielles et Jarvis génère votre plan d'aménagement personnalisé en 30 secondes.
        </p>

        {/* STATS */}
        <div className="flex gap-10 mb-12">
          <div className="text-center">
            <div className="text-3xl font-bold text-[#1