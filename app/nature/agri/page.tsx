"use client";

import { FC, useState, useEffect } from "react";
import CultureList from "@/components/CultureList";
import { Culture, CultureCreateInput } from "@/types/culture";

const AgriPage: FC = () => {
  const [cultures, setCultures] = useState<Culture[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Charger les cultures depuis l'API au montage
  useEffect(() => {
    const fetchCultures = async () => {
      try {
        setError(null);
        const res = await fetch("/api/agri");
        
        if (!res.ok) {
          throw new Error(`Erreur ${res.status}: ${res.statusText}`);
        }
        
        const data = await res.json();
        
        // Vérifier que la donnée est bien un tableau
        if (!Array.isArray(data)) {
          throw new Error("Format de données invalide reçu de l'API");
        }
        
        setCultures(data);
      } catch (err) {
        console.error("Erreur fetch:", err);
        setError(err instanceof Error ? err.message : "Une erreur est survenue");
        setCultures([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCultures();
  }, []);

  const handleAddCulture = async (newCultureData: CultureCreateInput) => {
    try {
      const res = await fetch("/api/agri", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newCultureData),
      });
      
      if (!res.ok) {
        throw new Error(`Erreur ${res.status}`);
      }
      
      const newCulture = await res.json();
      setCultures((prev) => [newCulture, ...prev]);
    } catch (error) {
      console.error("Erreur ajout culture:", error);
      setError("Erreur lors de l'ajout de la culture");
    }
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-green-50 p-8 flex items-center justify-center">
        <p className="text-green-800 text-lg">Chargement des cultures...</p>
      </main>
    );
  }

  if (error) {
    return (
      <main className="min-h-screen bg-green-50 p-8 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 text-lg mb-4">Erreur: {error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
          >
            Réessayer
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-green-50 p-8">
      <header className="max-w-4xl mx-auto text-center mb-12">
        <h1 className="text-4xl font-bold text-green-900 mb-3">Exploitation Agricole Durable</h1>
        <p className="text-lg text-green-800 max-w-2xl mx-auto">
          Valorisation intégrée avec élevage de BSF, apiculture, hydroponie et gestion durable des cultures.
        </p>
      </header>

      <section className="max-w-6xl mx-auto">
        <CultureList cultures={cultures} onAddCulture={handleAddCulture} />
      </section>
    </main>
  );
};

export default AgriPage;