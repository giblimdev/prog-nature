import React, { ReactNode } from 'react';
import Link from 'next/link';

interface AvicultureLayoutProps {
  children: ReactNode;
}

export default function AvicultureLayout({ children }: AvicultureLayoutProps) {
  return (
    <div className="min-h-screen flex bg-green-50">
      {/* Barre latérale */}
      <aside className="w-64 bg-green-800 text-green-100 p-6 flex flex-col space-y-8">
        <h1 className="text-2xl font-bold mb-6 border-b border-green-600 pb-2">
          Aviculture Colombie
        </h1>
        <nav className="flex flex-col gap-4">
          <Link href="/nature/galina/engorde" className="hover:text-white hover:bg-green-700 rounded px-3 py-2 transition">
            Présentation
          </Link>
          <Link href="/nature/galina/engorde/instalation" className="hover:text-white hover:bg-green-700 rounded px-3 py-2 transition">
            instalations
          </Link>
          <Link href="/nature/galina/engorde/comida" className="hover:text-white hover:bg-green-700 rounded px-3 py-2 transition">
            Alimentation
          </Link>
        </nav>
      </aside>

      {/* Contenu principal */}
      <main className="flex-1 p-8 max-w-7xl mx-auto overflow-auto">
        {children}
      </main>
    </div>
  );
}
