-- CreateTable
CREATE TABLE "recettes" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "coutPreparation" DOUBLE PRECISION NOT NULL,
    "tempsPreparation" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "image" TEXT,
    "tags" TEXT[],
    "categorie" TEXT NOT NULL,
    "prixVente" DOUBLE PRECISION NOT NULL,
    "etapes" TEXT[],
    "estActif" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "recettes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ingredients" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "stockActuel" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "stockMinimum" DOUBLE PRECISION NOT NULL DEFAULT 10,
    "unite" TEXT NOT NULL,
    "prixAchatMoyen" DOUBLE PRECISION,
    "fournisseurPrincipalId" TEXT,
    "estActif" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "ingredients_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "recette_ingredients" (
    "id" TEXT NOT NULL,
    "recetteId" TEXT NOT NULL,
    "ingredientId" TEXT NOT NULL,
    "quantite" DOUBLE PRECISION NOT NULL,
    "unite" TEXT NOT NULL,

    CONSTRAINT "recette_ingredients_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "mouvements_stock" (
    "id" TEXT NOT NULL,
    "ingredientId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "quantite" DOUBLE PRECISION NOT NULL,
    "prixUnitaire" DOUBLE PRECISION,
    "fournisseurId" TEXT,
    "motif" TEXT,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "utilisateur" TEXT,

    CONSTRAINT "mouvements_stock_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "fournisseurs" (
    "id" TEXT NOT NULL,
    "nom" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "contact" TEXT,
    "telephone" TEXT,
    "email" TEXT,
    "adresse" TEXT,
    "ville" TEXT,
    "codePostal" TEXT,
    "pays" TEXT NOT NULL DEFAULT 'France',
    "note" INTEGER,
    "conditionsPaiement" TEXT,
    "delaiLivraison" INTEGER,
    "estActif" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "fournisseurs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "prix_ingredient_fournisseurs" (
    "id" TEXT NOT NULL,
    "ingredientId" TEXT NOT NULL,
    "fournisseurId" TEXT NOT NULL,
    "prix" DOUBLE PRECISION NOT NULL,
    "unite" TEXT NOT NULL,
    "conditionnement" TEXT,
    "devise" TEXT NOT NULL DEFAULT 'EUR',
    "dateDebut" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dateFin" TIMESTAMP(3),
    "estActif" BOOLEAN NOT NULL DEFAULT true,
    "note" TEXT,

    CONSTRAINT "prix_ingredient_fournisseurs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "commandes_fournisseur" (
    "id" TEXT NOT NULL,
    "numero" TEXT NOT NULL,
    "fournisseurId" TEXT NOT NULL,
    "statut" TEXT NOT NULL,
    "dateCommande" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dateLivraisonPrevue" TIMESTAMP(3),
    "dateLivraisonReelle" TIMESTAMP(3),
    "montantTotal" DOUBLE PRECISION NOT NULL,
    "note" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "commandes_fournisseur_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "items_commande_fournisseur" (
    "id" TEXT NOT NULL,
    "commandeId" TEXT NOT NULL,
    "ingredientId" TEXT NOT NULL,
    "quantite" DOUBLE PRECISION NOT NULL,
    "unite" TEXT NOT NULL,
    "prixUnitaire" DOUBLE PRECISION NOT NULL,
    "prixReferenceId" TEXT,

    CONSTRAINT "items_commande_fournisseur_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "commandes" (
    "id" TEXT NOT NULL,
    "numero" TEXT NOT NULL,
    "client" TEXT,
    "statut" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "total" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "commandes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "commande_items" (
    "id" TEXT NOT NULL,
    "commandeId" TEXT NOT NULL,
    "recetteId" TEXT NOT NULL,
    "quantite" INTEGER NOT NULL DEFAULT 1,
    "prixUnitaire" DOUBLE PRECISION NOT NULL,
    "commentaire" TEXT,

    CONSTRAINT "commande_items_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "prix_ingredient_fournisseurs_ingredientId_fournisseurId_est_key" ON "prix_ingredient_fournisseurs"("ingredientId", "fournisseurId", "estActif");

-- CreateIndex
CREATE UNIQUE INDEX "prix_ingredient_fournisseurs_ingredientId_fournisseurId_dat_key" ON "prix_ingredient_fournisseurs"("ingredientId", "fournisseurId", "dateDebut");

-- CreateIndex
CREATE UNIQUE INDEX "commandes_fournisseur_numero_key" ON "commandes_fournisseur"("numero");

-- CreateIndex
CREATE UNIQUE INDEX "commandes_numero_key" ON "commandes"("numero");

-- AddForeignKey
ALTER TABLE "ingredients" ADD CONSTRAINT "ingredients_fournisseurPrincipalId_fkey" FOREIGN KEY ("fournisseurPrincipalId") REFERENCES "fournisseurs"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "recette_ingredients" ADD CONSTRAINT "recette_ingredients_recetteId_fkey" FOREIGN KEY ("recetteId") REFERENCES "recettes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "recette_ingredients" ADD CONSTRAINT "recette_ingredients_ingredientId_fkey" FOREIGN KEY ("ingredientId") REFERENCES "ingredients"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "mouvements_stock" ADD CONSTRAINT "mouvements_stock_ingredientId_fkey" FOREIGN KEY ("ingredientId") REFERENCES "ingredients"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "mouvements_stock" ADD CONSTRAINT "mouvements_stock_fournisseurId_fkey" FOREIGN KEY ("fournisseurId") REFERENCES "fournisseurs"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "prix_ingredient_fournisseurs" ADD CONSTRAINT "prix_ingredient_fournisseurs_ingredientId_fkey" FOREIGN KEY ("ingredientId") REFERENCES "ingredients"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "prix_ingredient_fournisseurs" ADD CONSTRAINT "prix_ingredient_fournisseurs_fournisseurId_fkey" FOREIGN KEY ("fournisseurId") REFERENCES "fournisseurs"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "commandes_fournisseur" ADD CONSTRAINT "commandes_fournisseur_fournisseurId_fkey" FOREIGN KEY ("fournisseurId") REFERENCES "fournisseurs"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "items_commande_fournisseur" ADD CONSTRAINT "items_commande_fournisseur_commandeId_fkey" FOREIGN KEY ("commandeId") REFERENCES "commandes_fournisseur"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "items_commande_fournisseur" ADD CONSTRAINT "items_commande_fournisseur_ingredientId_fkey" FOREIGN KEY ("ingredientId") REFERENCES "ingredients"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "items_commande_fournisseur" ADD CONSTRAINT "items_commande_fournisseur_prixReferenceId_fkey" FOREIGN KEY ("prixReferenceId") REFERENCES "prix_ingredient_fournisseurs"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "commande_items" ADD CONSTRAINT "commande_items_commandeId_fkey" FOREIGN KEY ("commandeId") REFERENCES "commandes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "commande_items" ADD CONSTRAINT "commande_items_recetteId_fkey" FOREIGN KEY ("recetteId") REFERENCES "recettes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
