-- CreateTable
CREATE TABLE "cultures" (
    "id" SERIAL NOT NULL,
    "nom" TEXT NOT NULL,
    "order" INTEGER,
    "note" INTEGER,
    "variete" TEXT,
    "image" TEXT,
    "tags" TEXT,
    "description" TEXT,
    "cycle" TEXT,
    "prixVenteB2B" TEXT,
    "coutProd" TEXT,
    "temperature" TEXT,
    "ensoleillement" TEXT,
    "besoinEau" TEXT,
    "ph" TEXT,
    "fertilisation" TEXT,
    "type" TEXT,
    "rendement" DOUBLE PRECISION,
    "difficulte" TEXT,
    "memo" TEXT,

    CONSTRAINT "cultures_pkey" PRIMARY KEY ("id")
);
