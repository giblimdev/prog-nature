import React from 'react';

// Types pour les données de l'application
interface AuthRequirement {
  id: string;
  title: string;
  description: string;
  duration: string;
  cost: string;
  validity: string;
  requirements: string[];
}

interface CostItem {
  category: string;
  range: string;
  details: string[];
}

interface ContactInfo {
  method: string;
  value: string;
  description?: string;
}

interface PhaseStrategy {
  phase: string;
  duration: string;
  title: string;
  description: string;
  actions: string[];
  color: 'green' | 'yellow' | 'blue' | 'red';
}

// Données de l'application
const AUTH_REQUIREMENTS: AuthRequirement[] = [
  {
    id: 'registro-sanitario',
    title: 'Registro Sanitario (RS)',
    description: 'Autorisation de commercialisation des produits',
    duration: '3-6 mois',
    cost: '500 000 - 2 000 000 COP',
    validity: '10 ans',
    requirements: [
      'Produits transformés/emballés',
      'Étiquetage conforme',
      'Documentation complète',
      'Contrôle qualité validé'
    ]
  },
  {
    id: 'permiso-funcionamiento',
    title: 'Permiso de Funcionamiento',
    description: 'Autorisation d\'exploitation du site',
    duration: '2-4 mois',
    cost: '1 000 000 - 5 000 000 COP',
    validity: 'Permanent (avec inspections)',
    requirements: [
      'Installations conformes',
      'Plan HACCP approuvé',
      'Équipements certifiés',
      'Personnel formé'
    ]
  },
  {
    id: 'certificado-bpm',
    title: 'Certificado BPM',
    description: 'Bonnes Pratiques de Manufacture',
    duration: '1-3 mois',
    cost: '2 000 000 - 8 000 000 COP',
    validity: '3 ans',
    requirements: [
      'Procédures documentées',
      'Contrôle hygiène strict',
      'Formation continue',
      'Audits réguliers'
    ]
  }
];

const COST_ESTIMATES: CostItem[] = [
  {
    category: 'Consultance spécialisée',
    range: '8 000 000 - 15 000 000 COP',
    details: ['Évaluation conformité', 'Préparation documentation', 'Accompagnement démarches']
  },
  {
    category: 'Rénovation infrastructures',
    range: '20 000 000 - 50 000 000 COP',
    details: ['Sols et murs conformes', 'Système eau potable', 'Ventilation et éclairage']
  },
  {
    category: 'Équipements conformes',
    range: '15 000 000 - 30 000 000 COP',
    details: ['Matériel inox alimentaire', 'Système froid', 'Équipements sécurité']
  },
  {
    category: 'Frais INVIMA',
    range: '3 000 000 - 8 000 000 COP',
    details: ['Droits dossier', 'Inspections', 'Certifications']
  }
];

const CONTACTS: ContactInfo[] = [
  {
    method: 'Site web',
    value: 'www.invima.gov.co',
    description: 'Portail officiel - informations et démarches'
  },
  {
    method: 'Ligne nationale',
    value: '018000119368',
    description: 'Service gratuit - informations générales'
  },
  {
    method: 'Email',
    value: 'atencionalciudadano@invima.gov.co',
    description: 'Assistance citoyens et entreprises'
  },
  {
    method: 'Office Cauca',
    value: 'Calle 4 # 8-25, Popayán',
    description: 'Bureau départemental du Cauca'
  }
];

const STRATEGY_PHASES: PhaseStrategy[] = [
  {
    phase: 'Phase 1',
    duration: '0-12 mois',
    title: 'Sous-traitance',
    description: 'Utilisation d\'abattoirs certifiés existants',
    color: 'green',
    actions: [
      'Pas d\'investissement lourd en conformité',
      'Accès immédiat au marché commercial',
      'Apprentissage progressif des normes',
      'Test de la demande réelle'
    ]
  },
  {
    phase: 'Phase 2',
    duration: '12-24 mois',
    title: 'Certification Progressive',
    description: 'Mise en place d\'un laboratoire limité',
    color: 'yellow',
    actions: [
      'Investissement contrôlé et progressif',
      'Certification étape par étape',
      'Focus sur un produit simple',
      'Validation du modèle économique'
    ]
  },
  {
    phase: 'Phase 3',
    duration: '24+ mois',
    title: 'Expansion Complète',
    description: 'Usine de transformation certifiée INVIMA',
    color: 'blue',
    actions: [
      'Tous produits transformés',
      'Marchés multiples accessibles',
      'Exportation régionale possible',
      'Optimisation des coûts'
    ]
  }
];

const INFRACTIONS = [
  {
    level: 'Mineure',
    fines: '5 - 50 SMMLV',
    examples: ['Étiquetage incorrect', 'Documentation incomplète']
  },
  {
    level: 'Grave',
    fines: '50 - 1000 SMMLV',
    examples: ['Vente produits non autorisés', 'Conditions sanitaires précaires']
  },
  {
    level: 'Très Grave',
    fines: '1000 - 10000 SMMLV',
    examples: ['Risque santé publique', 'Fraude délibérée']
  }
];

// Composants réutilisables
const Card: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className = '' }) => (
  <div className={`bg-white rounded-lg shadow-sm border border-gray-200 ${className}`}>
    {children}
  </div>
);

const Badge: React.FC<{
  children: React.ReactNode;
  variant: 'success' | 'warning' | 'error' | 'info';
}> = ({ children, variant }) => {
  const variants = {
    success: 'bg-green-100 text-green-800 border-green-200',
    warning: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    error: 'bg-red-100 text-red-800 border-red-200',
    info: 'bg-blue-100 text-blue-800 border-blue-200'
  };

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${variants[variant]}`}>
      {children}
    </span>
  );
};

const RequirementList: React.FC<{
  title: string;
  items: string[];
  type: 'required' | 'not-required';
}> = ({ title, items, type }) => (
  <Card className="p-6">
    <h3 className="font-semibold text-lg mb-4 flex items-center">
      {type === 'required' ? (
        <><span className="text-green-500 mr-2">✅</span> {title}</>
      ) : (
        <><span className="text-red-500 mr-2">❌</span> {title}</>
      )}
    </h3>
    <ul className="space-y-2">
      {items.map((item, index) => (
        <li key={index} className="flex items-start text-sm text-gray-700">
          <span className="mr-2">•</span>
          {item}
        </li>
      ))}
    </ul>
  </Card>
);

const AuthRequirementCard: React.FC<{ requirement: AuthRequirement }> = ({ requirement }) => (
  <Card className="p-6 hover:shadow-md transition-shadow duration-200">
    <h3 className="font-semibold text-lg text-gray-800 mb-2">{requirement.title}</h3>
    <p className="text-gray-600 text-sm mb-4">{requirement.description}</p>
    
    <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
      <div>
        <span className="font-medium text-gray-700">Délai:</span>
        <p className="text-blue-600">{requirement.duration}</p>
      </div>
      <div>
        <span className="font-medium text-gray-700">Coût:</span>
        <p className="text-green-600">{requirement.cost}</p>
      </div>
      <div>
        <span className="font-medium text-gray-700">Validité:</span>
        <p className="text-purple-600">{requirement.validity}</p>
      </div>
    </div>

    <div>
      <h4 className="font-medium text-gray-700 mb-2">Exigences:</h4>
      <ul className="space-y-1 text-sm">
        {requirement.requirements.map((req, index) => (
          <li key={index} className="flex items-start">
            <span className="text-gray-400 mr-2">•</span>
            {req}
          </li>
        ))}
      </ul>
    </div>
  </Card>
);

const CostEstimateCard: React.FC<{ cost: CostItem }> = ({ cost }) => (
  <Card className="p-6">
    <div className="flex justify-between items-start mb-3">
      <h3 className="font-semibold text-gray-800">{cost.category}</h3>
      <Badge variant="info">{cost.range}</Badge>
    </div>
    <ul className="space-y-1 text-sm text-gray-600">
      {cost.details.map((detail, index) => (
        <li key={index} className="flex items-start">
          <span className="text-gray-400 mr-2">•</span>
          {detail}
        </li>
      ))}
    </ul>
  </Card>
);

const PhaseCard: React.FC<{ phase: PhaseStrategy }> = ({ phase }) => {
  const colorClasses = {
    green: 'border-green-200 bg-green-50',
    yellow: 'border-yellow-200 bg-yellow-50',
    blue: 'border-blue-200 bg-blue-50',
    red: 'border-red-200 bg-red-50'
  };

  return (
    <Card className={`p-6 border-2 ${colorClasses[phase.color]} hover:shadow-md transition-all duration-200`}>
      <div className="flex justify-between items-start mb-3">
        <div>
          <h3 className="font-bold text-lg text-gray-800">{phase.phase}</h3>
          <p className="text-sm text-gray-500">{phase.duration}</p>
        </div>
        <Badge variant={
          phase.color === 'green' ? 'success' :
          phase.color === 'yellow' ? 'warning' :
          phase.color === 'blue' ? 'info' : 'error'
        }>
          {phase.title}
        </Badge>
      </div>
      
      <p className="text-gray-700 mb-4 text-sm">{phase.description}</p>
      
      <ul className="space-y-2 text-sm">
        {phase.actions.map((action, index) => (
          <li key={index} className="flex items-start">
            <span className="text-gray-400 mr-2">•</span>
            {action}
          </li>
        ))}
      </ul>
    </Card>
  );
};

// Composant principal
const NormesINVIMAPage: React.FC = () => {
  const totalCostRange = COST_ESTIMATES.reduce((acc, cost) => {
    const [min, max] = cost.range.split(' - ').map(val => parseInt(val.replace(/\D/g, '')) / 1000000);
    return [acc[0] + min, acc[1] + max];
  }, [0, 0]);

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 to-blue-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* En-tête */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
            <span className="text-2xl">🏛️</span>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Guide Complet des Normes INVIMA
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Tout ce que vous devez savoir pour la conformité de votre élevage avicole à Popayán
          </p>
        </header>

        {/* Introduction */}
        <section className="mb-12">
          <Card className="p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">📋 Qu&apos;est-ce que l&apos;INVIMA ?</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <p className="text-lg font-semibold text-blue-800 mb-2">
                  Instituto Nacional de Vigilancia de Medicamentos y Alimentos
                </p>
                <p className="text-gray-700 mb-4">
                  Agence gouvernementale colombienne responsable de la régulation et du contrôle 
                  des produits qui affectent la santé et l&apos;environnement.
                </p>
              </div>
              <div className="bg-blue-50 rounded-lg p-4">
                <h3 className="font-semibold text-blue-800 mb-2">Domaines de régulation</h3>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="flex items-center">
                    <span className="text-blue-500 mr-2">•</span>
                    Médicaments
                  </div>
                  <div className="flex items-center">
                    <span className="text-blue-500 mr-2">•</span>
                    Aliments
                  </div>
                  <div className="flex items-center">
                    <span className="text-blue-500 mr-2">•</span>
                    Cosmétiques
                  </div>
                  <div className="flex items-center">
                    <span className="text-blue-500 mr-2">•</span>
                    Dispositifs médicaux
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </section>

        {/* Application à l'aviculture */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">🍗 Application à l&apos;Aviculture</h2>
          <div className="grid lg:grid-cols-2 gap-6">
            <RequirementList
              title="OBLIGATOIRE POUR"
              type="required"
              items={[
                "Abattage de poulets",
                "Transformation de la viande",
                "Vente aux restaurants et commerces",
                "Conditionnement sous vide ou emballage",
                "Stockage de denrées périssables"
              ]}
            />
            <RequirementList
              title="NON OBLIGATOIRE POUR"
              type="not-required"
              items={[
                "Vente directe aux particuliers (petits volumes)",
                "Œufs non transformés",
                "Poulets vivants uniquement",
                "Production personnelle",
                "Élevage sans transformation"
              ]}
            />
          </div>
        </section>

        {/* Autorisations requises */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">📄 Autorisations Requises</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {AUTH_REQUIREMENTS.map((requirement) => (
              <AuthRequirementCard key={requirement.id} requirement={requirement} />
            ))}
          </div>
        </section>

        {/* Coûts estimés */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">💰 Coûts Estimés</h2>
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            {COST_ESTIMATES.map((cost, index) => (
              <CostEstimateCard key={index} cost={cost} />
            ))}
          </div>
          <Card className="p-6 bg-linear-to-r from-blue-50 to-green-50">
            <div className="text-center">
              <h3 className="font-bold text-lg text-gray-800 mb-2">Investissement Total Estimé</h3>
              <p className="text-2xl font-bold text-green-600">
                {totalCostRange[0]} - {totalCostRange[1]} Millions COP
              </p>
              <p className="text-sm text-gray-600 mt-2">
                Selon la taille et la complexité de votre installation
              </p>
            </div>
          </Card>
        </section>

        {/* Stratégie recommandée */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">🎯 Stratégie Recommandée</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {STRATEGY_PHASES.map((phase, index) => (
              <PhaseCard key={index} phase={phase} />
            ))}
          </div>
        </section>

        {/* Contacts */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">📞 Contacts INVIMA</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {CONTACTS.map((contact, index) => (
              <Card key={index} className="p-6">
                <h3 className="font-semibold text-gray-800 mb-2">{contact.method}</h3>
                <p className="text-blue-600 font-medium text-lg mb-1">{contact.value}</p>
                {contact.description && (
                  <p className="text-sm text-gray-600">{contact.description}</p>
                )}
              </Card>
            ))}
          </div>
        </section>

        {/* Sanctions */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">⚠️ Sanctions pour Non-Conformité</h2>
          <Card className="p-6">
            <div className="grid md:grid-cols-3 gap-6">
              {INFRACTIONS.map((infraction, index) => (
                <div key={index} className="text-center p-4 bg-red-50 rounded-lg">
                  <h3 className="font-bold text-red-800 mb-2">{infraction.level}</h3>
                  <p className="text-lg font-semibold text-red-600 mb-3">{infraction.fines}</p>
                  <ul className="text-sm text-red-700 space-y-1">
                    {infraction.examples.map((example, idx) => (
                      <li key={idx}>• {example}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <div className="mt-4 text-sm text-gray-600 text-center">
              * SMMLV 2024 = 1 300 000 COP environ
            </div>
          </Card>
        </section>

        {/* Conclusion */}
        <section>
          <Card className="p-8 bg-linear-to-r from-yellow-50 to-orange-50 border-yellow-200">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-yellow-800 mb-4">💡 Conclusion Importante</h2>
              <p className="text-lg text-yellow-700 mb-4">
                <strong>INVIMA est incontournable pour la transformation avicole commerciale à moyenne/grande échelle.</strong>
              </p>
              <p className="text-yellow-600">
                Pour démarrer, la sous-traitance vers des abattoirs certifiés reste la stratégie la plus sage 
                et économique, vous permettant de valider votre marché avant d&apos;investir dans la conformité.
              </p>
            </div>
          </Card>
        </section>

      </div>
    </div>
  );
};

export default NormesINVIMAPage;