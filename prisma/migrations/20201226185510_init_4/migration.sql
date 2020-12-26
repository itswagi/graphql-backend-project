-- AlterTable
ALTER TABLE "CheckedOut" ALTER COLUMN "checkout_date" SET DATA TYPE TEXT,
ALTER COLUMN "returned" SET DEFAULT false,
ALTER COLUMN "returned_date" SET DATA TYPE TEXT;
