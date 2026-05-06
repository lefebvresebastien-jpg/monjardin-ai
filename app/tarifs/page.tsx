export default function Tarifs() {
  return (
    <main className="min-h-screen bg-[#FAF7F2]">

      {/* NAV */}
      <nav className="flex items-center justify-between px-8 py-4 bg-white border-b border-[#E8F5EE] sticky top-0 z-50">
        <a href="/" className="flex items-center gap-3">
          <div className="w-9 h-9 bg-[#1A6640] rounded-xl flex items-center justify-center">
            <span className="text-white text-lg">🌿</span>
          </div>
          <span className="font-bold text-xl text-[#1A6640]">MonJardin.ai</span>
        </a>
        <div className="hidden md:flex items-center gap-8 text-sm text-[#6B6B60]">
          <a href="/" className="hover:text-[#1A6640]">Accueil</a>
          <a href="/tarifs" className="text-[#1A6640] font-semibold">Tarifs</a>
        </div>
        <a href="/" className="px-5 py-2 bg-[#1A6640] text-white rounded-full text-sm font-medium hover:bg-[#2D8F5A] transition-all">
          Essayer gratuitement
        </a>
      </nav>

      {/* HERO */}
      <section className="text-center px-6 py-16">
        <div className="inline-flex items-center gap-2 bg-white border border-[#E8F5EE] rounded-full px-4 py-2 text-sm text-[#1A6640] font-medium mb-6 shadow-sm">
          <span>💰</span> Simple et transparent
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-[#1C1C18] mb-4">
          Choisissez votre formule
        </h1>
        <p className="text-xl text-[#6B6B60] max-w-xl mx-auto">
          Commencez gratuitement. Passez Pro quand vous etes pret.
        </p>
      </section>

      {/* PLANS */}
      <section className="px-6 pb-20 max-w-5xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

          {/* GRATUIT */}
          <div className="bg-white rounded-3xl p-8 border border-[#E8F5EE] shadow-sm">
            <div className="text-3xl mb-4">🌱</div>
            <h2 className="text-xl font-bold text-[#1C1C18] mb-1">Decouverte</h2>
            <p className="text-sm text-[#6B6B60] mb-6">Pour tester MonJardin.ai</p>
            <div className="mb-6">
              <span className="text-5xl font-bold text-[#1C1C18]">0€</span>
              <span className="text-[#6B6B60] text-sm"> / toujours gratuit</span>
            </div>
            <a href="/" className="block w-full py-3 border-2 border-[#1A6640] text-[#1A6640] rounded-full font-semibold text-center hover:bg-[#E8F5EE] transition-all mb-8">
              Commencer gratuitement
            </a>
            <ul className="space-y-3 text-sm text-[#1C1C18]">
              <li className="flex items-center gap-2"><span className="text-[#1A6640]">✓</span> 1 plan de jardin gratuit</li>
              <li className="flex items-center gap-2"><span className="text-[#1A6640]">✓</span> 1 rendu visuel aquarelle</li>
              <li className="flex items-center gap-2"><span className="text-[#1A6640]">✓</span> Recommandations de plantes</li>
              <li className="flex items-center gap-2"><span className="text-[#6B6B60]">✗</span> <span className="text-[#6B6B60]">Sauvegarde du plan</span></li>
              <li className="flex items-center gap-2"><span className="text-[#6B6B60]">✗</span> <span className="text-[#6B6B60]">Generations illimitees</span></li>
              <li className="flex items-center gap-2"><span className="text-[#6B6B60]">✗</span> <span className="text-[#6B6B60]">Suivi saisonnier</span></li>
            </ul>
          </div>

          {/* JARDINER - POPULAIRE */}
          <div className="bg-[#1A6640] rounded-3xl p-8 shadow-xl relative transform md:scale-105">
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#FFD700] text-[#1C1C18] text-xs font-bold px-4 py-1.5 rounded-full">
              ⭐ LE PLUS POPULAIRE
            </div>
            <div className="text-3xl mb-4">🌿</div>
            <h2 className="text-xl font-bold text-white mb-1">Jardiner</h2>
            <p className="text-sm text-green-200 mb-6">Pour les passionnes de jardinage</p>
            <div className="mb-6">
              <span className="text-5xl font-bold text-white">39€</span>
              <span className="text-green-200 text-sm"> / an</span>
              <div className="text-green-200 text-xs mt-1">soit 3,25€ / mois</div>
            </div>
            <a href="/" className="block w-full py-3 bg-white text-[#1A6640] rounded-full font-semibold text-center hover:bg-green-50 transition-all mb-8">
              Commencer maintenant
            </a>
            <ul className="space-y-3 text-sm text-white">
              <li className="flex items-center gap-2"><span>✓</span> Plans illimites</li>
              <li className="flex items-center gap-2"><span>✓</span> Rendus visuels HD illimites</li>
              <li className="flex items-center gap-2"><span>✓</span> Sauvegarde de tous vos plans</li>
              <li className="flex items-center gap-2"><span>✓</span> Calendrier entretien saisonnier</li>
              <li className="flex items-center gap-2"><span>✓</span> Donnees cadastrales officielles</li>
              <li className="flex items-center gap-2"><span>✓</span> Support par email</li>
            </ul>
          </div>

          {/* PRO */}
          <div className="bg-white rounded-3xl p-8 border border-[#E8F5EE] shadow-sm">
            <div className="text-3xl mb-4">🏛️</div>
            <h2 className="text-xl font-bold text-[#1C1C18] mb-1">Pro</h2>
            <p className="text-sm text-[#6B6B60] mb-6">Pour les professionnels du paysage</p>
            <div className="mb-6">
              <span className="text-5xl font-bold text-[#1C1C18]">149€</span>
              <span className="text-[#6B6B60] text-sm"> / an</span>
              <div className="text-[#6B6B60] text-xs mt-1">soit 12,42€ / mois</div>
            </div>
            <a href="/" className="block w-full py-3 border-2 border-[#1A6640] text-[#1A6640] rounded-full font-semibold text-center hover:bg-[#E8F5EE] transition-all mb-8">
              Contacter pour Pro
            </a>
            <ul className="space-y-3 text-sm text-[#1C1C18]">
              <li className="flex items-center gap-2"><span className="text-[#1A6640]">✓</span> Tout de Jardiner</li>
              <li className="flex items-center gap-2"><span className="text-[#1A6640]">✓</span> 10 clients simultanes</li>
              <li className="flex items-center gap-2"><span className="text-[#1A6640]">✓</span> Export PDF professionnel</li>
              <li className="flex items-center gap-2"><span className="text-[#1A6640]">✓</span> Logo personnalise sur les plans</li>
              <li className="flex items-center gap-2"><span className="text-[#1A6640]">✓</span> Acces API</li>
              <li className="flex items-center gap-2"><span className="text-[#1A6640]">✓</span> Support prioritaire</li>
            </ul>
          </div>

        </div>

        {/* COMPARAISON */}
        <div className="mt-16 bg-white rounded-3xl p-8 border border-[#E8F5EE] shadow-sm">
          <h2 className="text-2xl font-bold text-center text-[#1C1C18] mb-2">
            Pourquoi pas un architecte paysagiste ?
          </h2>
          <p className="text-center text-[#6B6B60] mb-8">La comparaison parle elle-meme</p>
          <div className="grid grid-cols-3 gap-4 text-center text-sm">
            <div className="font-semibold text-[#6B6B60]"></div>
            <div className="font-bold text-[#1A6640]">MonJardin.ai</div>
            <div className="font-semibold text-[#6B6B60]">Architecte paysagiste</div>

            <div className="text-left text-[#6B6B60] py-3 border-t border-[#E8F5EE]">Prix</div>
            <div className="py-3 border-t border-[#E8F5EE] font-bold text-[#1A6640]">39€/an</div>
            <div className="py-3 border-t border-[#E8F5EE] text-[#6B6B60]">1 500€ - 5 000€</div>

            <div className="text-left text-[#6B6B60] py-3 border-t border-[#E8F5EE]">Delai</div>
            <div className="py-3 border-t border-[#E8F5EE] font-bold text-[#1A6640]">30 secondes</div>
            <div className="py-3 border-t border-[#E8F5EE] text-[#6B6B60]">2 - 4 semaines</div>

            <div className="text-left text-[#6B6B60] py-3 border-t border-[#E8F5EE]">Modifications</div>
            <div className="py-3 border-t border-[#E8F5EE] font-bold text-[#1A6640]">Illimitees</div>
            <div className="py-3 border-t border-[#E8F5EE] text-[#6B6B60]">Payantes</div>

            <div className="text-left text-[#6B6B60] py-3 border-t border-[#E8F5EE]">Disponibilite</div>
            <div className="py-3 border-t border-[#E8F5EE] font-bold text-[#1A6640]">24h/24</div>
            <div className="py-3 border-t border-[#E8F5EE] text-[#6B6B60]">Sur rendez-vous</div>

            <div className="text-left text-[#6B6B60] py-3 border-t border-[#E8F5EE]">Rendu visuel</div>
            <div className="py-3 border-t border-[#E8F5EE] font-bold text-[#1A6640]">Inclus</div>
            <div className="py-3 border-t border-[#E8F5EE] text-[#6B6B60]">En supplement</div>
          </div>
        </div>

        {/* FAQ */}
        <div className="mt-12 text-center">
          <h2 className="text-2xl font-bold text-[#1C1C18] mb-8">Questions frequentes</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
            <div className="bg-white rounded-2xl p-6 border border-[#E8F5EE]">
              <h3 className="font-bold text-[#1C1C18] mb-2">Puis-je annuler a tout moment ?</h3>
              <p className="text-sm text-[#6B6B60]">Oui, vous pouvez annuler votre abonnement a tout moment. Vous gardez acces jusqu'a la fin de votre periode.</p>
            </div>
            <div className="bg-white rounded-2xl p-6 border border-[#E8F5EE]">
              <h3 className="font-bold text-[#1C1C18] mb-2">Les plans sont-ils vraiement personnalises ?</h3>
              <p className="text-sm text-[#6B6B60]">Oui ! Jarvis analyse votre region, votre climat local, et vos preferences pour creer un plan unique.</p>
            </div>
            <div className="bg-white rounded-2xl p-6 border border-[#E8F5EE]">
              <h3 className="font-bold text-[#1C1C18] mb-2">Comment fonctionne le cadastre ?</h3>
              <p className="text-sm text-[#6B6B60]">On recupere les vraies dimensions de votre parcelle depuis cadastre.gouv.fr pour des plans aux bonnes cotes.</p>
            </div>
            <div className="bg-white rounded-2xl p-6 border border-[#E8F5EE]">
              <h3 className="font-bold text-[#1C1C18] mb-2">Puis-je partager mon plan ?</h3>
              <p className="text-sm text-[#6B6B60]">Oui, vous pouvez telecharger et partager vos plans avec votre paysagiste ou votre famille.</p>
            </div>
          </div>
        </div>

      </section>

      {/* FOOTER */}
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