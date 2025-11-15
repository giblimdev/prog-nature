import React from 'react';
import Link from 'next/link';

interface PhaseData {
  title: string;
  duration: string;
  populationDensity: string;
  spacePerBird: string;
  temperature: string;
  lighting: string;
  feeding: {
    type: string;
    frequency: string;
    consumption: string;
  };
  equipment: string[];
  keyMetrics: {
    weight: string;
    mortality: string;
    conversion: string;
  };
  reference?: {
    link: string;
    title: string;
    type: 'pdf' | 'doc' | 'docx';
  };
  colombianStandards: string[];
}

const CYCLE_DATA: PhaseData[] = [
  {
    title: "Démarrage (0–10 jours)",
    duration: "Jours 0-10",
    populationDensity: "25-30 poussins/m²",
    spacePerBird: "333-400 cm²/poussin",
    temperature: "32-35°C (semaine 1) → 28-30°C (semaine 2)",
    lighting: "23h lumière / 1h obscurité - 30-40 lux",
    feeding: {
      type: "Aliment starter (22-24% protéines)",
      frequency: "Ad libitum (libre accès)",
      consumption: "10-15g/jour/poussin en fin de phase"
    },
    equipment: [
      "Cages chauffantes ou poussinières",
      "Plaques chauffantes radiantes",
      "Abreuvoirs à tasses (1/50 poussins)",
      "Mangeoires plateau (1/25 poussins)",
      "Litière copeaux de bois 5-8 cm",
      "Système ventilation douce"
    ],
    keyMetrics: {
      weight: "50g → 250-300g",
      mortality: "< 2% acceptable",
      conversion: "IC: 1.2-1.4"
    },
    reference: {
      link: "/documents/605485.pdf",
      title: "Guide d'élevage des poussins - ICA",
      type: "pdf"
    },
    colombianStandards: [
      "Norma NTC 6357 - Bienestar animal en avicultura",
      "Resolución 202230000002 ICA - Sanidad avícola",
      "Temperatura selon altitude (Popayán: 1760m)",
      "Humidité relative: 60-70%"
    ]
  },
  {
    title: "Croissance (11–24 jours)",
    duration: "Jours 11-24",
    populationDensity: "15-20 poulets/m²",
    spacePerBird: "500-667 cm²/poulet",
    temperature: "26-28°C → 22-24°C progressive",
    lighting: "18-20h lumière / 6-4h obscurité - 10-15 lux",
    feeding: {
      type: "Aliment croissance (20-22% protéines)",
      frequency: "Ad libitum avec distributeurs automatiques",
      consumption: "65-85g/jour/poulet en fin de phase"
    },
    equipment: [
      "Système d'abreuvement automatique (1/10 poulets)",
      "Mangeoires linéaires (5cm/poulet)",
      "Ventilation mécanique contrôlée",
      "Système d'extraction d'air",
      "Perchoirs bas (optionnels)",
      "Contrôle environnement automatique"
    ],
    keyMetrics: {
      weight: "300g → 1200-1400g",
      mortality: "< 1.5% acceptable",
      conversion: "IC: 1.5-1.7"
    },
    reference: {
      link: "/documents/manual-crecimiento-avicola.docx",
      title: "Manuel de croissance avicole",
      type: "docx"
    },
    colombianStandards: [
      "Densité max: 20 poulets/m² (ICA)",
      "Hauteur bâtiment min: 2.4m",
      "Renouvellement air: 4-6 m³/h/kg",
      "Éclairage naturel complémentaire autorisé"
    ]
  },
  {
    title: "Finition (25–40 jours)",
    duration: "Jours 25-40",
    populationDensity: "12-15 poulets/m²",
    spacePerBird: "667-833 cm²/poulet",
    temperature: "20-22°C optimale",
    lighting: "16-18h lumière / 8-6h obscurité - 5-10 lux",
    feeding: {
      type: "Aliment finition (18-20% protéines)",
      frequency: "Ad libitum - contrôle consommation",
      consumption: "100-120g/jour/poulet en fin de phase"
    },
    equipment: [
      "Systèmes anti-stress",
      "Ventilation haute performance",
      "Contrôle humidité (50-60%)",
      "Système refroidissement évaporatif",
      "Préparation zone tri/abattage",
      "Bacs récupération fientes"
    ],
    keyMetrics: {
      weight: "1400g → 2400-2600g",
      mortality: "< 1% acceptable",
      conversion: "IC: 1.8-2.0"
    },
    reference: {
      link: "/documents/protocolo-finition-avicola.pdf",
      title: "Protocole de finition avicole",
      type: "pdf"
    },
    colombianStandards: [
      "Poids abattage standard: 2.2-2.6kg",
      "Jeûne pré-abattage: 8-12h",
      "Transport max: 4h continu",
      "Certification sanitaire obligatoire"
    ]
  }
];

const COLOMBIAN_SPECIFICS = {
  climate: "Popayán - Altitude 1760m - Climat tempéré",
  regulations: [
    "ICA (Instituto Colombiano Agropecuario) - Agrément sanitaire",
    "INVIMA - Transformation si abattage propre",
    "Norma NTC 6357 - Bien-être animal",
    "Resolución 202230000002 - Biosécurité avicole"
  ],
  marketStandards: [
    "Poids commercial: 2.2-2.8kg à 40-45 jours",
    "Conversion alimentaire cible: < 1.8",
    "Mortalité totale acceptable: < 5%",
    "Indice de productivité: > 300 EPEF"
  ]
};

// Composant pour afficher l'icône du type de fichier
const FileIcon: React.FC<{ type: 'pdf' | 'doc' | 'docx' }> = ({ type }) => {
  const icons = {
    pdf: "📄",
    doc: "📝",
    docx: "📝"
  };

  const labels = {
    pdf: "PDF",
    doc: "DOC",
    docx: "DOCX"
  };

  return (
    <span className="inline-flex items-center gap-1">
      <span>{icons[type]}</span>
      <span className="text-xs bg-gray-100 px-2 py-1 rounded">{labels[type]}</span>
    </span>
  );
};

const PhaseCard: React.FC<{ phase: PhaseData }> = ({ phase }) => (
  <section className="mb-8 p-6 bg-white rounded-lg shadow-lg border border-gray-200">
    <h2 className="text-2xl font-bold text-green-800 mb-4">{phase.title}</h2>
    
    <div className="grid md:grid-cols-2 gap-6">
      {/* Informations principales */}
      <div>
        <h3 className="font-semibold text-gray-800 mb-3">📊 Paramètres Clés</h3>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="font-medium">Durée:</span>
            <span>{phase.duration}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">Densité:</span>
            <span>{phase.populationDensity}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">Espace/volaille:</span>
            <span>{phase.spacePerBird}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">Température:</span>
            <span>{phase.temperature}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">Éclairage:</span>
            <span>{phase.lighting}</span>
          </div>
        </div>

        <h3 className="font-semibold text-gray-800 mt-4 mb-3">🍗 Alimentation</h3>
        <div className="space-y-1 text-sm">
          <div><span className="font-medium">Type:</span> {phase.feeding.type}</div>
          <div><span className="font-medium">Fréquence:</span> {phase.feeding.frequency}</div>
          <div><span className="font-medium">Consommation:</span> {phase.feeding.consumption}</div>
        </div>
      </div>

      {/* Équipements et métriques */}
      <div>
        <h3 className="font-semibold text-gray-800 mb-3">⚙️ Équipements Requis</h3>
        <ul className="space-y-1 text-sm mb-4">
          {phase.equipment.map((item, index) => (
            <li key={index} className="flex items-start">
              <span className="text-green-500 mr-2">•</span>
              {item}
            </li>
          ))}
        </ul>

        <h3 className="font-semibold text-gray-800 mb-3">📈 Métriques de Performance</h3>
        <div className="space-y-1 text-sm">
          <div><span className="font-medium">Poids:</span> {phase.keyMetrics.weight}</div>
          <div><span className="font-medium">Mortalité:</span> {phase.keyMetrics.mortality}</div>
          <div><span className="font-medium">Conversion:</span> {phase.keyMetrics.conversion}</div>
        </div>
      </div>
    </div>

    {/* Référence et normes colombiennes */}
    <div className="grid md:grid-cols-2 gap-4 mt-4">
      {phase.reference && (
        <div className="p-4 bg-green-50 rounded-lg border border-green-200">
          <h3 className="font-semibold text-green-800 mb-3">📚 Documentation de Référence</h3>
          <div className="flex items-center gap-3 p-3 bg-white rounded border">
            <FileIcon type={phase.reference.type} />
            <div className="flex-1">
              <p className="font-medium text-green-700 text-sm">
                {phase.reference.title}
              </p>
              <Link 
                href={phase.reference.link}
                className="text-blue-600 hover:text-blue-800 text-xs flex items-center gap-1 mt-1"
                               target="_blank"
                rel="noopener noreferrer"
              >
                <span>📥 Télécharger</span>
                <span className="text-xs text-gray-500">({phase.reference.type.toUpperCase()})</span>
              </Link>
            </div>
          </div>
        </div>
      )}
      
      <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
        <h3 className="font-semibold text-blue-800 mb-2">🇨🇴 Normes Colombiennes</h3>
        <ul className="space-y-1 text-sm text-blue-700">
          {phase.colombianStandards.map((standard, index) => (
            <li key={index} className="flex items-start">
              <span className="mr-2">•</span>
              {standard}
            </li>
          ))}
        </ul>
      </div>
    </div>
  </section>
);

const ColombianInfo: React.FC = () => (
  <div className="mb-8 p-6 bg-yellow-50 rounded-lg border border-yellow-200">
    <h2 className="text-xl font-bold text-yellow-800 mb-4">
      🦅 Spécificités Colombiennes - Région de Popayán
    </h2>
    
    <div className="grid md:grid-cols-2 gap-6">
      <div>
        <h3 className="font-semibold text-yellow-700 mb-2">🌤️ Conditions Climatiques</h3>
        <p className="text-sm text-yellow-600 mb-4">{COLOMBIAN_SPECIFICS.climate}</p>
        
        <h3 className="font-semibold text-yellow-700 mb-2">📋 Standards du Marché</h3>
        <ul className="space-y-1 text-sm text-yellow-600">
          {COLOMBIAN_SPECIFICS.marketStandards.map((standard, index) => (
            <li key={index} className="flex items-start">
              <span className="mr-2">•</span>
              {standard}
            </li>
          ))}
        </ul>
      </div>
      
      <div>
        <h3 className="font-semibold text-yellow-700 mb-2">⚖️ Règlementations</h3>
        <ul className="space-y-1 text-sm text-yellow-600">
          {COLOMBIAN_SPECIFICS.regulations.map((regulation, index) => (
            <li key={index} className="flex items-start">
              <span className="mr-2">•</span>
              {regulation}
            </li>
          ))}
        </ul>
        
        {/* Liens vers les documents réglementaires */}
        <div className="mt-4 p-3 bg-white rounded border">
          <h4 className="font-semibold text-yellow-700 mb-2 text-sm">📑 Documents Officiels</h4>
          <div className="space-y-2 text-xs">
            <Link 
              href="/documents/norma-ntc-6357.pdf"
              className="text-blue-600 hover:text-blue-800 flex items-center gap-2"
              download
              target="_blank"
            >
              <span>📄</span>
              <span>Norma NTC 6357 - Bien-être animal</span>
            </Link>
            <Link 
              href="/documents/resolucion-ica-avicola.pdf"
              className="text-blue-600 hover:text-blue-800 flex items-center gap-2"
              download
              target="_blank"
            >
              <span>📄</span>
              <span>Resolución ICA - Sanidad avícola</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const SummaryTable: React.FC = () => (
  <div className="mb-8 p-6 bg-gray-50 rounded-lg">
    <h2 className="text-xl font-bold text-gray-800 mb-4">📋 Tableau Synoptique du Cycle</h2>
    
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white rounded-lg overflow-hidden">
        <thead className="bg-green-600 text-white">
          <tr>
            <th className="px-4 py-3 text-left">Phase</th>
            <th className="px-4 py-3 text-left">Densité</th>
            <th className="px-4 py-3 text-left">Poids</th>
            <th className="px-4 py-3 text-left">Consommation</th>
            <th className="px-4 py-3 text-left">Conversion</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {CYCLE_DATA.map((phase, index) => (
            <tr key={index} className="hover:bg-gray-50">
              <td className="px-4 py-3 font-medium">{phase.title}</td>
              <td className="px-4 py-3">{phase.populationDensity}</td>
              <td className="px-4 py-3">{phase.keyMetrics.weight}</td>
              <td className="px-4 py-3">{phase.feeding.consumption}</td>
              <td className="px-4 py-3">{phase.keyMetrics.conversion}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

export default function AvicultureCyclePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        
        {/* En-tête */}
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-green-800 mb-4">
            🐓 Installation Avicole selon le Cycle de Vie
          </h1>
          <p className="text-xl text-gray-600">
            Guide technique complet pour l&apos;élevage de poulets de chair en Colombie
          </p>
        </header>

        {/* Informations colombiennes */}
        <ColombianInfo />

        {/* Tableau synoptique */}
        <SummaryTable />

        {/* Phases détaillées */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            📈 Phases Détaillées du Cycle de Production
          </h2>
          {CYCLE_DATA.map((phase, index) => (
            <PhaseCard key={index} phase={phase} />
          ))}
        </div>

        {/* Section de téléchargement globale */}
        <div className="p-6 bg-purple-50 rounded-lg border border-purple-200 mb-8">
          <h2 className="text-xl font-bold text-purple-800 mb-4">📥 Téléchargements Complets</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Link 
              href="/documents/guide-complet-aviculture-colombie.pdf"
              className="p-4 bg-white rounded-lg border border-purple-300 hover:border-purple-500 transition-colors flex items-center gap-3"
              download
              target="_blank"
            >
              <span className="text-2xl">📚</span>
              <div>
                <p className="font-semibold text-purple-700">Guide Complet</p>
                <p className="text-xs text-gray-500">PDF - 2.5 MB</p>
              </div>
            </Link>
            <Link 
              href="/documents/checklist-installation.docx"
              className="p-4 bg-white rounded-lg border border-purple-300 hover:border-purple-500 transition-colors flex items-center gap-3"
              download
              target="_blank"
            >
              <span className="text-2xl">📝</span>
              <div>
                <p className="font-semibold text-purple-700">Checklist Installation</p>
                <p className="text-xs text-gray-500">DOCX - 1.2 MB</p>
              </div>
            </Link>
            <Link 
              href="/documents/calculateur-couts.xlsx"
              className="p-4 bg-white rounded-lg border border-purple-300 hover:border-purple-500 transition-colors flex items-center gap-3"
              download
              target="_blank"
            >
              <span className="text-2xl">📊</span>
              <div>
                <p className="font-semibold text-purple-700">Calculateur Coûts</p>
                <p className="text-xs text-gray-500">XLSX - 850 KB</p>
              </div>
            </Link>
          </div>
        </div>

        {/* Recommandations finales */}
        <div className="p-6 bg-green-50 rounded-lg border border-green-200">
          <h2 className="text-xl font-bold text-green-800 mb-4">💡 Recommandations Clés</h2>
          <div className="grid md:grid-cols-2 gap-4 text-sm text-green-700">
            <div>
              <h3 className="font-semibold mb-2">✅ Bonnes Pratiques</h3>
              <ul className="space-y-1">
                <li>• Contrôle quotidien température et humidité</li>
                <li>• Nettoyage abreuvoirs 2x/jour</li>
                <li>• Observation comportement matin et soir</li>
                <li>• Registre sanitaire à jour</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-2">⚠️ Points de Vigilance</h3>
              <ul className="space-y-1">
                <li>• Éviter les courants d&apos;air directs</li>
                <li>• Maintenir litière sèche et propre</li>
                <li>• Contrôler qualité eau quotidiennement</li>
                <li>• Préparer jeûne pré-abattage 8-12h</li>
              </ul>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}