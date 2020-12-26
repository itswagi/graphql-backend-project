/*
  Warnings:

  - The migration will add a unique constraint covering the columns `[email]` on the table `Readers`. If there are existing duplicate values, the migration will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Readers.email_unique" ON "Readers"("email");
