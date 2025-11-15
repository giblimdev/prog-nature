//@/app/nature/galina/page.tsx
import React from "react";
import FooterGalina from "@/app/nature/galina/FooterGalina";

export default function PageHuevos() {
  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow rounded-lg">
      <h1 className="text-2xl font-bold text-green-900 mb-4">
        Présentation de l&apos;exploitation de production d&apos;œufs – Colombie
      </h1>
      <p className="mb-6 text-green-800">
        Notre exploitation élève des poules pondeuses (Gallus gallus domesticus) sélectionnées pour une ponte optimale dans les conditions climatiques et agricoles colombiennes. Nous appliquons un cycle de gestion, une alimentation contrôlée et un éclairage adapté afin d’assurer une production régulière et durable.
      </p>

      <h2 className="text-xl font-semibold text-green-900 mb-2">1. Cycle de ponte et gestion des poules</h2>
      <ul className="mb-6 list-disc list-inside text-green-700">
        <li>Ponte démarrant à 18-20 semaines, durée productive 18 mois à 2 ans.</li>
        <li>Période de production annuelle : 280-300 œufs par poule la 1ère année, puis baisse d’environ 15-20 œufs par an.</li>
        <li>Besoins lumineux : 14-16 h/jour pour la ponte régulière (éclairage artificiel en période sombre).</li>
        <li>Période la plus productive : pic de 30-45 semaines d’âge.</li>
      </ul>

      <h2 className="text-xl font-semibold text-green-900 mb-2">2. Alimentation et coût</h2>
      <ul className="mb-6 list-disc list-inside text-green-700">
        <li>Aliment de ponte : ration quotidienne 110-115 g/poule, 15,75 €/an/poule (45 kg/an à 0,35 €/kg).</li>
        <li>Aliment croissance : 8 kg pré-pontes (2,80 €/poule).</li>
        <li>Coût journalier alimentation : 0,043 €/jour/poule.</li>
        <li>Alimentation = 60% du coût total de production.</li>
      </ul>

      <h2 className="text-xl font-semibold text-green-900 mb-2">3. Rentabilité, marges et circuits de vente</h2>
      <ul className="mb-6 list-disc list-inside text-green-700">
        <li>Production annuelle par poule : 280-300 œufs (recette 84 €/an/poule).</li>
        <li>Marge brute par œuf : 0,07-0,17 € selon circuit (vente directe, GMS, bio).</li>
        <li>Prix moyen à la ferme 0,25-0,42 €/œuf, vente en grande surface : 0,16-0,50 €/œuf.</li>
        <li>Rentabilité optimale à partir de 100 à 500 poules (ROI 29-48%).</li>
      </ul>

      <h2 className="text-xl font-semibold text-green-900 mb-2">4. Modèles d’acquisition et coûts initiaux</h2>
      <ul className="mb-6 list-disc list-inside text-green-700">
        <li>Types : œuf fécondé, poussin 1 jour, poulette démarrée, poule prête à pondre.</li>
        <li>Coût final par poule prête à pondre : 4,50 € (œuf), 4,80 € (poussin 1 jour), 5,20 € (poussin 1 semaine), 6,50 € (poulette), 8,50 € (poule prête à pondre).</li>
      </ul>

      <h2 className="text-xl font-semibold text-green-900 mb-2">5. Organisation et durabilité</h2>
      <ul className="mb-6 list-disc list-inside text-green-700">
        <li>Système multi-niveaux possible pour optimiser l’espace en batterie (3 étages en Colombie).</li>
        <li>Valorisation des fientes en fertilisation agricole.</li>
        <li>Gestion intégrée de l’éclairage et des déchets pour maximiser les performances et la durabilité.</li>
      </ul>

<FooterGalina />    </div>
  );
}
