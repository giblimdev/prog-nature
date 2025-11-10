"use client";

import React, { useState } from "react";
import Logo from "./logo";
import Nav from "./Nav";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="bg-green-800 text-white p-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Logo />

        {/* Bouton hamburger visible sur petits écrans */}
        <button
          className="md:hidden focus:outline-none"
          aria-label="Toggle menu"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <svg
            className="w-7 h-7"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            {menuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>

        {/* Menu de navigation, caché sur petits écrans si menu fermé */}
        <nav
          className={`flex flex-col md:flex-row md:items-center md:space-x-8 absolute md:static bg-green-800 w-full md:w-auto left-0 md:left-auto top-full md:top-auto transition-transform transform ${
            menuOpen ? "translate-y-0" : "-translate-y-full md:translate-y-0"
          } md:translate-x-0 z-40`}
        >
          <Nav />
        </nav>
      </div>
    </header>
  );
}
