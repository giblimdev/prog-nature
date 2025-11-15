import React from 'react';
import recettesExemple, { Recette } from '@/lib/recettes';

export default function RecettesPoulets() {
  return (
    <section className="p-10 max-w-7xl mx-auto">
      <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">
        🍗 Nos Recettes de Poulet
      </h2>

      {/* Grille responsive */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {recettesExemple.map((recette: Recette) => (
          <div
            key={recette.id}
            className="bg-white border border-gray-200 rounded-2xl shadow hover:shadow-lg transition-all duration-200 overflow-hidden flex flex-col"
          >
            {/* En-tête / image simulée */}
            <div className="bg-linear-to-r from-amber-100 to-rose-100 h-32 flex items-center justify-center">
              <span className="text-5xl">🍽️</span>
            </div>

            {/* Contenu */}
            <div className="p-4 flex flex-col justify-between grow">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1">
                  {recette.nom}
                </h3>
                <p className="text-sm text-gray-600 line-clamp-3 mb-3">
                  {recette.description}
                </p>

                <div className="text-sm text-gray-700 space-y-1">
                  <p>⏱️ {recette.tempsPreparation} min</p>
                  <p>💰 Coût : $ {recette.coutPreparation.toLocaleString()} </p>
                  <p>💵 Vente : $ {recette.prixVente.toLocaleString()} </p>
                  <p>🍴 {recette.categorie}</p>
                </div>
              </div>

              {/* Statut */}
              <div className="mt-4">
                <span
                  className={`inline-block px-3 py-1 text-xs font-semibold rounded-full ${
                    recette.actif
                      ? 'bg-green-100 text-green-700'
                      : 'bg-red-100 text-red-700'
                  }`}
                >
                  {recette.actif ? 'Actif' : 'Inactif'}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
