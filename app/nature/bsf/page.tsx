"use client"
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle, CardDescription } from "@/components/ui/card";
import { FC } from "react";

const BSFPage: FC = () => {
  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <header className="max-w-5xl mx-auto text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Élevage de BSF : Cycle de Vie & Valorisation</h1>
        <p className="text-lg text-gray-700 max-w-3xl mx-auto">
          Découvrez le cycle complet de l’élevage du Black Soldier Fly, de la collecte des déchets jusqu’au conditionnement de la farine et à l’utilisation écologique des résidus.
        </p>
        <Button className="mt-6 bg-gray-800 hover:bg-gray-900 text-white" onClick={() => alert("Bienvenue dans le monde du BSF !")}>
          En savoir plus
        </Button>
      </header>





      <section className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8">
        <Card className="bg-white shadow-md">
          <CardContent>
            <CardTitle className="text-gray-900">Collecte et Préparation des Déchets</CardTitle>
            <CardDescription>
              Sélection et collecte des déchets organiques agricoles et alimentaires, première étape cruciale pour alimenter les larves de BSF.
            </CardDescription>
          </CardContent>
        </Card>

        <Card className="bg-white shadow-md">
          <CardContent>
            <CardTitle className="text-gray-900">Cycle de Vie & Élevage</CardTitle>
            <CardDescription>
              De l&apos;œuf à la larve, puis à la nymphose, découvrez comment les BSF transforment les déchets en biomasse rapidement et efficacement.
            </CardDescription>
          </CardContent>

        </Card>




        <Card className="bg-white shadow-md">
          <CardContent>
            <CardTitle className="text-gray-900">Récolte et Conditionnement</CardTitle>
            <CardDescription>
              Récolte des larves à maturité, séchage puis transformation en farine riche en protéines pour alimentation animale.
            </CardDescription>
          </CardContent>
        </Card>





        <Card className="bg-white shadow-md md:col-span-2">
          <CardContent>
            <CardTitle className="text-gray-900">Utilisation des Résidus pour la Fertilisation</CardTitle>
            <CardDescription>
              Les résidus issus de l’élevage BSF sont utilisés comme fertilisants naturels pour enrichir les sols et optimiser les cultures, notamment en hydroponie.
            </CardDescription>
          </CardContent>
        </Card>
      </section>

      <footer className="text-center text-gray-700 mt-16">
        <p>© 2025 Votre Exploitation Agricole Durable. Tous droits réservés.</p>
      </footer>
    </main>
  );
};

export default BSFPage;
