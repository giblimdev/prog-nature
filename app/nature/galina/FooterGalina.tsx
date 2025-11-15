import { Button } from '@/components/ui/button';
import Link from 'next/link';
import React from 'react';

function FooterGalina() {
  return (
    <footer className="max-w-3xl mx-auto border-t pt-8 mt-8 flex flex-col md:flex-row items-center justify-between text-green-800 gap-4">
      <div className="flex flex-col items-center md:items-start text-center md:text-left">
        <span className="font-bold">Fournisseur recommandé à Popayán :</span>
        <span className="font-semibold">Grupo Surticampo SAS</span>
        <span>Cra 6 # 5N-46 B, Bolívar, Popayán</span>
        <span>Tél : <a href="tel:+573136129330" className="underline">+57 313 6129330</a></span>
      </div>
      <Link href="/">
        <Button className="bg-green-600 hover:bg-green-800 text-white" variant="secondary">
          Retour à l’accueil
        </Button>
      </Link>
    </footer>
  );
}

export default FooterGalina;
