/*
// This is your Prisma schema file,
// learn more about it in the docs: https://pris.ly/d/prisma-schema

// Looking for ways to speed up your queries, or scale easily with your serverless or edge functions?
// Try Prisma Accelerate: https://pris.ly/cli/accelerate-init

generator client {
  provider = "prisma-client"
  output   = "../lib/generated/prisma"
}

datasource db {
  provider = "sqlite"
  url      = env("DATABASE_URL")
}
	model Culture {
	  id             Int      @id @default(autoincrement())
	  nom            String
	  order   Int?
	  note Int?
	  variete        String?
	image   String?
	tags  String?
	description String?
	  cycle      String?
	  prixVenteB2B  String?    // en euros/kg
	coutProd  String?
	  temperature  String?
	  ensoleillement String?      // heures/jour
	  besoinEau      String ?    // mm/mois
	ph  String?
	 fertilisation  String?
	type String? // plein champ et / ou hydroponie
	 rendement      Float?    // kg/m2/an
	  difficulte     String?
	memo String?
	  @@map("cultures")
	}

*/

export interface Culture {
  id: number;
  nom: string;
  order?: number | null;
  note?: number | null;
  variete?: string | null;
  image?: string | null;
  tags?: string | null;
  description?: string | null;
  cycle?: string | null;
  prixVenteB2B?: string | null;
  coutProd?: string | null;
  temperature?: string | null;
  ensoleillement?: string | null;
  besoinEau?: string | null;
  ph?: string | null;
  fertilisation?: string | null;
  type?: string | null;
  rendement?: number | null;
  difficulte?: string | null;
  memo?: string | null;
}

export type CultureCreateInput = Omit<Culture, "id">;