//@/app/nature/galina/page.tsx

"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import FooterGalina from "@/app/nature/galina/FooterGalina";
import { FC } from "react";


const HomePage: FC = () => {
  return (
    <main className="min-h-screen bg-linear-to-br from-green-100 to-green-300 px-6 py-10">
      <header className="max-w-3xl mx-auto text-center mb-12">
       
        <h1 className="text-4xl md:text-5xl font-extrabold text-green-900 mb-3 tracking-tight">
          Plateforme Avicole Durable
          <span className="block text-green-700 text-xl font-semibold mt-1">
            Colombie
          </span>
        </h1>
        <p className="text-lg md:text-xl text-green-800 mb-6 max-w-2xl mx-auto">
          Solutions pour l’élevage de poulets de chair (<strong>pollo de engorde</strong>) et la production d’œufs (<strong>producción de huevos</strong>) adaptées au marché colombien.
        </p>
        <Button
          variant="default"
          size="lg"
          className="bg-green-700 hover:bg-green-800"
          onClick={() => window.alert("Bienvenue sur la plateforme avicole de référence à Popayán !")}
        >
          Découvrir
        </Button>
      </header>

      <section className="max-w-5xl mx-auto grid gap-8 md:grid-cols-2 mb-12">
        <Link href="/nature/galina/engorde">
          <Card className="shadow-xl transition-transform hover:scale-105 hover:ring-2 hover:ring-green-300">
            <CardContent>
              <CardTitle className="text-green-900 text-2xl mb-2">Poulets de chair en Colombie</CardTitle>
              <Separator className="my-2 bg-green-200" />
              <CardDescription className="text-green-700 text-md">
                Toutes les solutions pour l’élevage industriel de <b>pollo de engorde</b> : bâtiments, alimentation, biosécurité, partenaires locaux, rentabilité.
              </CardDescription>
            </CardContent>
          </Card>
        </Link>
        <Link href="/nature/galina/huevos">
          <Card className="shadow-xl transition-transform hover:scale-105 hover:ring-2 hover:ring-green-300">
            <CardContent>
              <CardTitle className="text-green-900 text-2xl mb-2">Production d’œufs en Colombie</CardTitle>
              <Separator className="my-2 bg-green-200" />
              <CardDescription className="text-green-700 text-md">
                Techniques, équipements et services pour l’élevage de pondeuses (<b>ponedoras</b>) et la valorisation des œufs sur le marché colombien.
              </CardDescription>
            </CardContent>
          </Card>
        </Link>
      </section>
      <FooterGalina />
    </main>
  );
};

export default HomePage;
