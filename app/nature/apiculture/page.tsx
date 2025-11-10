"use client"
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle, CardDescription } from "@/components/ui/card";
import { FC } from "react";

const ApiculturePage: FC = () => {
  return (
    <main className="min-h-screen bg-yellow-50 p-8">
      <header className="max-w-4xl mx-auto text-center mb-12">
        <h1 className="text-4xl font-bold text-yellow-800 mb-3">Apiculture et Pollinisation</h1>
        <p className="text-lg text-yellow-700 max-w-2xl mx-auto">
          Découvrez nos pratiques apicoles pour favoriser la pollinisation naturelle, soutenir la biodiversité et produire un miel de qualité.
        </p>
        <Button className="mt-6 bg-yellow-600 hover:bg-yellow-700 text-white" onClick={() => alert("Bienvenue dans notre ruche !")}>
          En savoir plus
        </Button>
      </header>

      <section className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8">
        <Card className="bg-white shadow-md">
          <CardContent>
            <CardTitle className="text-yellow-900">Soutien à la Pollinisation</CardTitle>
            <CardDescription>
              Nos ruches améliorent la fertilisation des cultures en augmentant la diversité des plantes pollinisées, ce qui favorise des rendements plus élevés et durables.
            </CardDescription>
          </CardContent>
        </Card>



        <Card className="bg-white shadow-md">
          <CardContent>
            <CardTitle className="text-yellow-900">Biodiversité & Écosystème</CardTitle>
            <CardDescription>
              L&apos;apiculture favorise un équilibre écologique, en contribuant au maintien des populations d&apos;abeilles sauvages et à la santé des habitats naturels.
            </CardDescription>
          </CardContent>
        </Card>

        <Card className="bg-white shadow-md">
          <CardContent>
            <CardTitle className="text-yellow-900">Production de Miel Local</CardTitle>
            <CardDescription>
              Nous produisons un miel artisanal, respectueux de l&apos;environnement, riche en saveurs et en bienfaits pour la santé.
            </CardDescription>
          </CardContent>
        </Card>

        <Card className="bg-white shadow-md">
          <CardContent>
            <CardTitle className="text-yellow-900">Formation & Sensibilisation</CardTitle>
            <CardDescription>
              Ateliers et visites guidées pour mieux comprendre les abeilles, leur importance et comment les protéger dans nos exploitations.
            </CardDescription>
          </CardContent>
        </Card>
      </section>

      <footer className="text-center text-yellow-700 mt-16">
        <p>© 2025 Votre Exploitation Apicole Durable. Tous droits réservés.</p>
      </footer>
    </main>
  );
};

export default ApiculturePage;
