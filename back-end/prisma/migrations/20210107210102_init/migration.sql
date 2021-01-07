-- CreateEnum
CREATE TYPE "Role" AS ENUM ('USER', 'ADMIN');

-- CreateTable
CREATE TABLE "Books" (
"isbn" SERIAL,
    "title" TEXT NOT NULL,
    "price" DECIMAL(65,30) NOT NULL,
    "summary" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "publisher_id" INTEGER,

    PRIMARY KEY ("isbn")
);

-- CreateTable
CREATE TABLE "Publishers" (
"id" SERIAL,
    "name" TEXT NOT NULL,
    "writer" TEXT NOT NULL,
    "year_publication" INTEGER,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Readers" (
"id" SERIAL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "role" "Role" NOT NULL DEFAULT E'USER',

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CheckedOut" (
"id" SERIAL,
    "book_isbn" INTEGER NOT NULL,
    "reader_id" INTEGER NOT NULL,
    "checkout_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "returned" BOOLEAN NOT NULL DEFAULT false,
    "returned_date" TIMESTAMP(3),
    "duration" INTEGER,

    PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Readers.email_unique" ON "Readers"("email");

-- AddForeignKey
ALTER TABLE "Books" ADD FOREIGN KEY("publisher_id")REFERENCES "Publishers"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CheckedOut" ADD FOREIGN KEY("book_isbn")REFERENCES "Books"("isbn") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CheckedOut" ADD FOREIGN KEY("reader_id")REFERENCES "Readers"("id") ON DELETE CASCADE ON UPDATE CASCADE;
