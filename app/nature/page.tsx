"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { FC } from "react";

const HomePage: FC = () => {
  return (
    <main className="min-h-screen bg-linear-to-br from-green-100 to-green-300 p-8">
      <header className="max-w-5xl mx-auto text-center mb-12">
        <h1 className="text-4xl font-extrabold text-green-900 mb-4">
          Exploitation Agricole Durable
        </h1>
        <p className="text-lg text-green-800 max-w-3xl mx-auto">
          Valorisation intégrée avec élevage de BSF, fertilisation naturelle, hydroponie innovante et apiculture pour une agriculture autonome et écologique.
        </p>
        <Button
          className="mt-6 bg-green-700 hover:bg-green-800 text-white"
          onClick={() => window.alert("Bienvenue sur notre plateforme !")}
        >
          Découvrir Plus
        </Button>
      </header>

      <section className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8">
        <Link href="/nature/bsf"><Card className="shadow-lg bg-white">
          <CardContent>
            <CardTitle className="text-green-900">Élevage BSF</CardTitle>
            <CardDescription>
              Élevage de larves de Black Soldier Fly (BSF) pour valoriser les déchets organiques et produire un fertilisant naturel riche pour vos sols et systèmes hydroponiques.
            </CardDescription>
          </CardContent>
        </Card></Link>

        <Link href="/nature/agri"><Card className="shadow-lg bg-white">
          <CardContent>
            <CardTitle className="text-green-900">Fertilisation & Hydroponie</CardTitle>
            <CardDescription>
              Utilisation des déjections de BSF comme engrais naturel pour améliorer la qualité des sols et alimenter nos cultures hydroponiques de manière durable.
            </CardDescription>
          </CardContent>
        </Card></Link>

        <Link href="/nature/apiculture">
          <Card className="shadow-lg bg-white">
            <CardContent>
              <CardTitle className="text-green-900">Apiculture pour Pollinisation</CardTitle>
              <CardDescription>
                Maintien de ruches pour favoriser la pollinisation des cultures, renforcer la biodiversité et produire du miel local de qualité.
              </CardDescription>
            </CardContent>
          </Card>
        </Link>

        <Link href="/nature/galina">
          <Card className="shadow-lg bg-white">
            <CardContent>
              <CardTitle className="text-green-900">Élevage de Poules et Production d&apos;Œufs</CardTitle>
              <CardDescription>
                Gestion intégrée de poules pondeuses et poulets de chair : alimentation circulaire, valorisation des œufs et synergies avec nos autres filières agricoles.
              </CardDescription>
            </CardContent>
          </Card>
        </Link>
      </section>
    </main>
  );
};

export default HomePage;
