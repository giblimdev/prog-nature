import React, { ReactNode } from 'react';
import Link from 'next/link';

interface AvicultureLayoutProps {
  children: ReactNode;
}

export default function AvicultureLayout({ children }: AvicultureLayoutProps) {
  return (
    <div className="min-h-screen bg-green-50">
      <nav className="mb-5 flex space-x-8 border-b border-green-300 pb-3 text-green-700 text-lg font-semibold">
        <Link
          href="/nature/galina/INVIMA"
          className="hover:text-green-900 hover:border-b-2 hover:border-green-900 transition duration-300"
        >
          INVIMA
        </Link>
        <Link
          href="/nature/galina/recettesPoulets"
          className="hover:text-green-900 hover:border-b-2 hover:border-green-900 transition duration-300"
        >
          Recettes Poulets
        </Link>
        <Link
          href="/nature/galina/engorde"
          className="hover:text-green-900 hover:border-b-2 hover:border-green-900 transition duration-300"
        >
          Exploitation
        </Link>
        <Link
          href="/nature/galina/huevos"
          className="hover:text-green-900 hover:border-b-2 hover:border-green-900 transition duration-300"
        >
          Production Œufs
        </Link>
      </nav>

      <main className="flex-1 p-8 max-w-7xl mx-auto overflow-auto">{children}</main>
    </div>
  );
}
