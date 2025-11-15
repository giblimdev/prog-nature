import React from "react";
import FooterGalina from "@/app/nature/galina/FooterGalina";

export default function PageEngorde() {
  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow rounded-lg">
      <h1 className="text-2xl font-bold text-green-900 mb-4">
        Présentation de l&apos;élevage de poulets de chair – Colombie
      </h1>
      <p className="mb-6 text-green-800">
        Notre modèle d&apos;élevage industriel durable suit les meilleurs standards colombiens et internationaux de productivité, de bien-être animal et de valorisation intégrée. Nous élevons des souches à croissance rapide dans des bâtiments ventilés, sur litière contrôlée, avec suivi sanitaire rigoureux et alimentation adaptée à chaque phase.
      </p>

      <h2 className="text-xl font-semibold text-green-900 mb-2">1. Cycle de production</h2>
      <ul className="mb-6 list-disc list-inside text-green-700">
        <li>Durée typique : <b>35–45 jours</b> (poids vif : 2,2 à 2,6 kg)</li>
        <li>
          Démarrage (0–10 jours) : accueil des poussins, chaleur, aliment starter, eau tiède.
        </li>
        <li>
          Croissance (11–24 jours) : développement musculaire, gestion densité, aliment croissance.
        </li>
        <li>
          Finition (25–40 jours) : dépôt de chair, aliment finition, préparation à l’abattage.
        </li>
        <li>
          Paramètres techniques : température, ventilation, programme lumineux contrôlé.
        </li>
      </ul>

      <h2 className="text-xl font-semibold text-green-900 mb-2">2. Alimentation optimisée</h2>
      <ul className="mb-6 list-disc list-inside text-green-700">
        <li>Démarrage : <b>22–23%</b> protéines, miette fine, 3 000–3 100 kcal/kg.</li>
        <li>Croissance : <b>20–21%</b> protéines, granulé moyen, vitamines, minéraux.</li>
        <li>Finition : <b>18–19%</b> protéines, granulé gros, rendement carcasse.</li>
        <li>Consommation totale : env. <b>3,5 kg d’aliment</b> pour <b>2,5 kg poids vif</b>.</li>
        <li>Eau propre en permanence, débit ajusté (50–70 ml/min).</li>
      </ul>

      <h2 className="text-xl font-semibold text-green-900 mb-2">3. Programme lumineux et bien-être</h2>
      <ul className="mb-6 list-disc list-inside text-green-700">
        <li>Démarrage (J1–J3) : <b>23h lumière/1h obscurité</b>, 30–40 lux.</li>
        <li>
          Croissance (J4–J14): réduction progressive (J4–J7, 20h/4h; J8–J14, 18h/6h), intensité 10–20 lux.
        </li>
        <li>Finition : 16–18h lumière, 5 lux. Transitions lumineuses progressives recommandées.</li>
      </ul>

      <h2 className="text-xl font-semibold text-green-900 mb-2">4. Produits et valorisation</h2>
      <ul className="mb-6 list-disc list-inside text-green-700">
        <li>Poulets entiers</li>
        <li>Découpes : filets, cuisses, pilons, ailes, hauts de cuisse, abats (foie, gésier, cœur)</li>
        <li>Sous-produits : plumes, sang, os pour alimentation animale, compost</li>
        <li>Conditionnement : frais, sous vide ou surgelé</li>
      </ul>

      <h2 className="text-xl font-semibold text-green-900 mb-2">5. Marchés et circuits</h2>
      <ul className="mb-6 list-disc list-inside text-green-700">
        <li>Vente directe à la ferme</li>
        <li>Marchés locaux : Popayán et Cauca</li>
        <li>Collaborations : détaillants, grossistes, restauration collective</li>
        <li>Prix indicatifs (2025) : <b>4,5–5 €/kg entier</b>, <b>5,5–7 €/kg filet</b>, <b>4–5,5 €/kg cuisses/pilons</b></li>
      </ul>

      <h2 className="text-xl font-semibold text-green-900 mb-2">6. Économie circulaire et durabilité</h2>
      <ul className="mb-6 list-disc list-inside text-green-700">
        <li>Valorisation des fientes : engrais agricole</li>
        <li>Intégration avec BSF (insectes), fertilisation, gestion des déchets organiques</li>
      </ul>

<FooterGalina />    </div>
  );
}
