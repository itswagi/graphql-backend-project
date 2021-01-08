/*
  Warnings:

  - You are about to drop the column `year_publication` on the `Publishers` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Books" ADD COLUMN     "year_publication" INTEGER;

-- AlterTable
ALTER TABLE "Publishers" DROP COLUMN "year_publication";
