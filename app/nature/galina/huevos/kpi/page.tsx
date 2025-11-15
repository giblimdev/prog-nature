//@/app/nature/galina/huvos/kpi/page.tsx
"use client";
import React from "react";

export default function KPIPoulesPondeusesColombie() {
  return (
    <main className="max-w-4xl mx-auto p-8 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-semibold text-green-900 mb-6">
        Production des œufs - KPI & Économie (Colombie)
      </h1>

      <section className="mb-6">
        <h2 className="text-xl font-semibold text-green-800 mb-2">Prix de vente des œufs en Colombie</h2>
        <ul className="list-disc list-inside text-green-700">
          <li>Œufs industriels : 350–450 COP / œuf (~0,08–0,10 €)</li>
          <li>Œufs plein air premium : 500–700 COP / œuf (~0,11–0,17 €)</li>
          <li>Vente directe ou circuits courts, prix légèrement supérieurs : jusqu’à 700 COP / œuf (~0,17 €)</li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold text-green-800 mb-2">Rendement des poules pondeuses</h2>
        <ul className="list-disc list-inside text-green-700">
          <li>Production annuelle moyenne : 280–300 œufs par poule (0,77 œuf/jour-0,82 œuf/jour)</li>
          <li>Pic de ponte (semaines 30–45) : 0,92 œuf/jour</li>
          <li>Baisse progressive au cours de la production, fin de cycle environ 0,60 œuf/jour</li>
        </ul>
        Nous retidrons une moyenne de 283 œufs, soit 0.8 oeuf/jour/poule par poule et par an pour nos calculs économiques. 
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold text-green-800 mb-2">Coûts en Colombie</h2>
        <ul className="list-disc list-inside text-green-700">
          <li>Alimentation : environ 4,5 millions COP / 1 000 poules / mois (~15,75 € / an / poule)</li>
          <li>Médicaments et prévention : estimés à 0,50 € / poule / an</li>
          <li>Équipement et infrastructures : coût variable selon modèle d’élevage</li>
          <li>Main d’œuvre : 1 personne mi-temps environ pour 1 000 poules (~800 000 COP/mois)</li>
        </ul>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-green-800 mb-2">Rentabilité et marchés ciblés</h2>
        <ul className="list-disc list-inside text-green-700">
          <li>Prix moyen œuf en vente directe : 550–700 COP / œuf (~0,13–0,17 €)</li>
          <li>Marge brute unitaire approximative : 0,07–0,17 € / œuf selon circuit</li>
          <li>Seuil de rentabilité généralement à partir de 500 poules</li>
          <li>Canaux de commercialisation : vente directe, marchés locaux, grossistes, restauration collective</li>
        </ul>
      </section>
    </main>
  );
}
