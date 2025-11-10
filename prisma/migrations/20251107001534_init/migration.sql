-- AlterTable
ALTER TABLE "fournisseurs" ADD COLUMN     "order" INTEGER;

-- AlterTable
ALTER TABLE "ingredients" ADD COLUMN     "order" INTEGER;

-- AlterTable
ALTER TABLE "recettes" ADD COLUMN     "carte" TEXT,
ADD COLUMN     "order" INTEGER;
