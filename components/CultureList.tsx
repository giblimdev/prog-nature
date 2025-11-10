"use client";

import { FC, useState } from "react";
import { Button } from "@/components/ui/button";
import { Culture, CultureCreateInput } from "@/types/culture";

interface CultureListProps {
  cultures: Culture[];
  onAddCulture: (newCulture: CultureCreateInput) => void;
}

const CultureList: FC<CultureListProps> = ({ cultures, onAddCulture }) => {
  const emptyCulture: CultureCreateInput = {
    // id omitted on purpose (Omit<Culture, "id">)
    nom: "",
    order: undefined,
    note: undefined,
    variete: "",
    image: "",
    tags: "",
    description: "",
    cycle: "",
    prixVenteB2B: "",
    coutProd: "",
    temperature: "",
    ensoleillement: "",
    besoinEau: "",
    ph: "",
    fertilisation: "",
    type: "",
    rendement: undefined,
    difficulte: "",
    memo: "",
  };

  const [showForm, setShowForm] = useState(false);
  const [newCulture, setNewCulture] = useState<CultureCreateInput>(emptyCulture);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;

    // Convert numeric fields to numbers, keep empty as undefined
    if ((name === "order" || name === "note" || name === "rendement") && value !== "") {
      const parsed = name === "order" || name === "note" ? parseInt(value, 10) : parseFloat(value);
      setNewCulture((prev) => ({ ...prev, [name]: isNaN(parsed) ? undefined : parsed }));
    } else {
      // keep empty string as "" (will be filtered later)
      setNewCulture((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Remove empty strings and undefined before sending to API
    const cleanedEntries = Object.entries(newCulture).filter(
      ([, v]) => v !== "" && v !== undefined && v !== null
    );

    const cultureToSubmit = Object.fromEntries(cleanedEntries) as CultureCreateInput;

    onAddCulture(cultureToSubmit);
    setNewCulture(emptyCulture);
    setShowForm(false);
  };

  if (!cultures || !Array.isArray(cultures)) {
    return (
      <div className="p-4 text-center text-red-600">
        Aucune donnée de cultures disponible ou format invalide
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-green-900">Liste des Cultures ({cultures.length})</h2>
        <Button onClick={() => setShowForm((s) => !s)} className="bg-green-600 hover:bg-green-700">
          {showForm ? "Annuler" : "➕ Ajouter une culture"}
        </Button>
      </div>

      {showForm && (
        <div className="bg-white p-6 rounded-lg shadow-md border border-green-200">
          <h3 className="text-xl font-semibold text-green-800 mb-4">Nouvelle Culture</h3>

          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Nom */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Nom *</label>
              <input
                type="text"
                name="nom"
                value={newCulture.nom ?? ""}
                onChange={handleChange}
                required
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500"
                placeholder="Nom de la culture"
              />
            </div>

            {/* Description */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea
                name="description"
                value={newCulture.description ?? ""}
                onChange={handleChange}
                rows={3}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500"
                placeholder="Description de la culture"
              />
            </div>

            {/* Variété */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Variété</label>
              <input
                type="text"
                name="variete"
                value={newCulture.variete ?? ""}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500"
                placeholder="Variété"
              />
            </div>

            {/* Cycle */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Cycle</label>
              <input
                type="text"
                name="cycle"
                value={newCulture.cycle ?? ""}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500"
                placeholder="Cycle de culture"
              />
            </div>

            {/* prixVenteB2B */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Prix vente B2B (€/kg)</label>
              <input
                type="text"
                name="prixVenteB2B"
                value={newCulture.prixVenteB2B ?? ""}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500"
                placeholder="ex: 3.5"
              />
            </div>

            {/* coutProd */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Coût production (€/kg)</label>
              <input
                type="text"
                name="coutProd"
                value={newCulture.coutProd ?? ""}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500"
                placeholder="ex: 1.8"
              />
            </div>

            {/* temperature */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Température idéale</label>
              <input
                type="text"
                name="temperature"
                value={newCulture.temperature ?? ""}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500"
                placeholder="ex: 18-25°C"
              />
            </div>

            {/* ensoleillement */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Ensoleillement (h/j)</label>
              <input
                type="text"
                name="ensoleillement"
                value={newCulture.ensoleillement ?? ""}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500"
                placeholder="ex: 6"
              />
            </div>

            {/* besoinEau */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Besoin en eau (mm/mois)</label>
              <input
                type="text"
                name="besoinEau"
                value={newCulture.besoinEau ?? ""}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500"
              />
            </div>

            {/* ph */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">pH</label>
              <input
                type="text"
                name="ph"
                value={newCulture.ph ?? ""}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500"
              />
            </div>

            {/* fertilisation */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Fertilisation</label>
              <input
                type="text"
                name="fertilisation"
                value={newCulture.fertilisation ?? ""}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500"
              />
            </div>

            {/* image */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Image (URL)</label>
              <input
                type="text"
                name="image"
                value={newCulture.image ?? ""}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500"
                placeholder="https://..."
              />
            </div>

            {/* tags */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Tags (virgule séparées)</label>
              <input
                type="text"
                name="tags"
                value={newCulture.tags ?? ""}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500"
                placeholder="bio,rapide,feuillage"
              />
            </div>

            {/* type */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
              <select
                name="type"
                value={newCulture.type ?? ""}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500"
              >
                <option value="">Sélectionnez un type</option>
                <option value="plein champ">Plein champ</option>
                <option value="hydroponie">Hydroponie</option>
                <option value="plein champ/hydroponie">Plein champ / Hydroponie</option>
              </select>
            </div>

            {/* difficulte */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Difficulté</label>
              <select
                name="difficulte"
                value={newCulture.difficulte ?? ""}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500"
              >
                <option value="">Niveau</option>
                <option value="facile">Facile</option>
                <option value="moyen">Moyen</option>
                <option value="difficile">Difficile</option>
              </select>
            </div>

            {/* rendement (number) */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Rendement (kg/m²/an)</label>
              <input
                type="number"
                step="0.1"
                name="rendement"
                value={newCulture.rendement ?? ""}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500"
                placeholder="ex: 2.5"
              />
            </div>

            {/* order (number) */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Ordre</label>
              <input
                type="number"
                name="order"
                value={newCulture.order ?? ""}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500"
                placeholder="ex: 0"
              />
            </div>

            {/* note (number) */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Note (0-10)</label>
              <input
                type="number"
                name="note"
                min={0}
                max={10}
                value={newCulture.note ?? ""}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500"
                placeholder="ex: 8"
              />
            </div>

            {/* memo */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Mémo</label>
              <textarea
                name="memo"
                value={newCulture.memo ?? ""}
                onChange={handleChange}
                rows={2}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500"
              />
            </div>

            {/* Buttons */}
            <div className="md:col-span-2 flex justify-end space-x-4 pt-4">
              <Button type="button" variant="outline" onClick={() => setShowForm(false)}>
                Annuler
              </Button>
              <Button type="submit" className="bg-green-600 hover:bg-green-700" disabled={!newCulture.nom?.trim()}>
                Ajouter la culture
              </Button>
            </div>
          </form>
        </div>
      )}

      {/* Liste */}
      {cultures.length === 0 ? (
        <div className="p-8 text-center text-gray-600 bg-white rounded-lg border border-green-200">
          <p className="text-lg mb-4">Aucune culture trouvée.</p>
          <Button onClick={() => setShowForm(true)} className="bg-green-600 hover:bg-green-700">
            Ajouter votre première culture
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cultures.map((culture) => (
            <div key={culture.id} className="bg-white rounded-lg shadow-md p-6 border border-green-200">
              <h3 className="text-xl font-semibold text-green-800 mb-2">{culture.nom}</h3>
              {culture.variete && (
                <p className="text-sm text-gray-600 mb-1"><strong>Variété:</strong> {culture.variete}</p>
              )}
              {culture.description && <p className="text-gray-600 mb-3 line-clamp-2">{culture.description}</p>}
              <div className="space-y-1 text-sm text-gray-500">
                {culture.cycle && <p><strong>Cycle:</strong> {culture.cycle}</p>}
                {culture.type && <p><strong>Type:</strong> {culture.type}</p>}
                {culture.rendement != null && <p className="text-green-600"><strong>Rendement:</strong> {culture.rendement} kg/m²/an</p>}
                {culture.difficulte && (
                  <p><strong>Difficulté:</strong> <span className={`ml-1 px-2 py-1 rounded-full text-xs ${
                    culture.difficulte === "facile" ? "bg-green-100 text-green-800" :
                    culture.difficulte === "moyen" ? "bg-yellow-100 text-yellow-800" :
                    "bg-red-100 text-red-800"
                  }`}>{culture.difficulte}</span></p>
                )}
              </div>

              {culture.tags && (
                <div className="mt-3 flex flex-wrap gap-1">
                  {culture.tags.split(",").map((tag, i) => (
                    <span key={i} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">{tag.trim()}</span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CultureList;
