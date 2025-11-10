import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button' // Schadcn UI button, adaptez chemin selon votre projet

export default function FoodPage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-8 bg-white">
      <h1 className="text-2xl font-bold mb-6">Food page</h1>

      <nav className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-6">
        <Link href="/food/carte" passHref>
          <Button variant="outline" >Carte</Button>
        </Link>
        <Link href="/food/recette" passHref>
          <Button  variant="outline" >Recette</Button>
        </Link>
        <Link href="/food/pos" passHref>
          <Button  variant="outline" >App de Caisse</Button>
        </Link>
      </nav>
    </main>
  )
}
