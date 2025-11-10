import Link from 'next/link'
import React from 'react'
import { Button } from "@/components/ui/button" // Adapté à votre chemin Schadcn UI

export default function Page() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-8 bg-gray-50">
      <h1 className="text-3xl font-extrabold mb-8 text-gray-900">
        Retrouvez nos projets en Colombie
      </h1>

      <div className="flex flex-col sm:flex-row gap-6">
        <Link href="/nature" target="_blank" passHref>
          <Button variant="outline" size="lg">
            Nature
          </Button>
        </Link>

        <Link href="/food" target="_blank" passHref>
          <Button variant="outline" size="lg">
            Foodtruk
          </Button>
        </Link>
      </div>
    </main>
  )
}
