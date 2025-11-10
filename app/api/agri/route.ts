import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    console.log("🔍 Tentative de récupération des cultures...");
    
    // Test de connexion simple
    await prisma.$queryRaw`SELECT 1`;
    console.log("✅ Connexion à la base de données réussie");
    
    const cultures = await prisma.culture.findMany();
    console.log(`✅ ${cultures.length} cultures récupérées`);
    
    return NextResponse.json(cultures);
  } catch (error) {
    console.error("❌ Erreur Prisma:", error);
    return NextResponse.json(
      { 
        error: "Erreur de base de données",
        details: "Impossible d'accéder à la base de données. Vérifiez que le fichier SQLite existe."
      },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    console.log("📝 Données reçues:", data);
    
    const newCulture = await prisma.culture.create({ 
      data: {
        nom: data.nom,
        description: data.description || null,
        cycle: data.cycle || null,
        variete: data.variete || null,
        image: data.image || null,
        tags: data.tags || null,
        prixVenteB2B: data.prixVenteB2B || null,
        coutProd: data.coutProd || null,
        temperature: data.temperature || null,
        ensoleillement: data.ensoleillement || null,
        besoinEau: data.besoinEau || null,
        ph: data.ph || null,
        fertilisation: data.fertilisation || null,
        type: data.type || null,
        rendement: data.rendement || null,
        difficulte: data.difficulte || null,
        memo: data.memo || null,
        order: data.order || null,
        note: data.note || null
      }
    });
    
    console.log("✅ Nouvelle culture créée avec ID:", newCulture.id);
    
    return NextResponse.json(newCulture);
  } catch (error) {
    console.error("❌ Erreur création culture:", error);
    return NextResponse.json(
      { 
        error: "Erreur lors de la création",
        details: error instanceof Error ? error.message : "Erreur inconnue"
      },
      { status: 500 }
    );
  }
}