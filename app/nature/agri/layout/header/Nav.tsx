import React from "react";
import Link from "next/link";

const links = [
  { href: "/", label: "Accueil" },
  { href: "/apiculture", label: "Apiculture" },
  { href: "/bsf", label: "BSF" },
  { href: "/agri", label: "Culture" },
];

export default function Nav() {
  return (
    <nav className="p-4 bg-green-100">
      <ul className="flex space-x-6">
        {links.map(({ href, label }) => (
          <li key={href}>
            <Link href={href} className="text-green-800 hover:text-green-600">
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
