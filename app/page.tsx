export default function Home() {
  return (
    <main className="min-h-screen bg-[#FAF7F2] flex flex-col items-center justify-center px-6">
      
      {/* LOGO */}
      <div className="flex items-center gap-3 mb-8">
        <div className="w-10 h-10 bg-[#1A6640] rounded-xl flex items-center justify-center">
          <span className="text-white text-xl">🌿</span>
        </div>
        <span className="font-bold text-2xl text-[#1A6640]">MonJardin.ai</span>
      </div>

      {/* TITRE */}
      <h1 className="text-5xl font-bold text-center text-[#1C1C18] mb-4 max-w-2xl leading-tight">
        Votre architecte paysagiste,{" "}
        <span className="text-[#1A6640] italic">propulsé par l'IA</span>
      </h1>

      {/* SOUS-TITRE */}
      <p className="text-lg text-[#6B6B60] text-center max-w-xl mb-10 leading-relaxed">
        Entrez votre adresse — on récupère les cotes cadastrales officielles 
        et on génère votre plan de jardin en 5 minutes.
      </p>

      {/* FORMULAIRE */}
      <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md border border-[#E8F5EE]">
        <div className="mb-4">
          <label className="block text-xs font-semibold text-[#6B6B60] uppercase tracking-wider mb-2">
            Votre adresse
          </label>
          <input
            type="text"
            placeholder="12 rue du Moulin, Quettehou"
            className="w-full px-4 py-3 border border-[#E8F5EE] rounded-xl text-sm focus:outline-none focus:border-[#1A6640] bg-[#FAF7F2]"
          />
        </div>
        <div className="grid grid-cols-2 gap-3 mb-6">
          <div>
            <label className="block text-xs font-semibold text-[#6B6B60] uppercase tracking-wider mb-2">
              Ville
            </label>
            <input
              type="text"
              placeholder="Quettehou"
              className="w-full px-4 py-3 border border-[#E8F5EE] rounded-xl text-sm focus:outline-none focus:border-[#1A6640] bg-[#FAF7F2]"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-[#6B6B60] uppercase tracking-wider mb-2">
              Code postal
            </label>
            <input
              type="text"
              placeholder="50630"
              className="w-full px-4 py-3 border border-[#E8F5EE] rounded-xl text-sm focus:outline-none focus:border-[#1A6640] bg-[#FAF7F2]"
            />
          </div>
        </div>
        <button className="w-full py-4 bg-[#1A6640] text-white rounded-full font-semibold text-base hover:bg-[#2D8F5A] transition-all">
          ✨ Générer mon plan gratuit
        </button>
        <p className="text-center text-xs text-[#6B6B60] mt-4">
          🔒 Données cadastrales officielles · Gratuit · Sans inscription
        </p>
      </div>

      {/* STATS */}
      <div className="flex gap-12 mt-12">
        <div className="text-center">
          <div className="text-3xl font-bold text-[#1A6640]">2 847</div>
          <div className="text-sm text-[#6B6B60]">jardins créés</div>
        </div>
        <div className="text-center">
          <div className="text-3xl font-bold text-[#1A6640]">4,8★</div>
          <div className="text-sm text-[#6B6B60]">note moyenne</div>
        </div>
        <div className="text-center">
          <div className="text-3xl font-bold text-[#1A6640]">18 min</div>
          <div className="text-sm text-[#6B6B60]">temps moyen</div>
        </div>
      </div>

    </main>
  )
}