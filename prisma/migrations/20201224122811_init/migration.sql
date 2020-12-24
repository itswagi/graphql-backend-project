-- CreateTable
CREATE TABLE "Books" (
"isbn" SERIAL,
    "title" TEXT NOT NULL,
    "price" DECIMAL(65,30) NOT NULL,
    "quantity" INTEGER NOT NULL,
    "publisher_id" INTEGER NOT NULL,

    PRIMARY KEY ("isbn")
);

-- CreateTable
CREATE TABLE "Publishers" (
"id" SERIAL,
    "name" TEXT NOT NULL,
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

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CheckedOut" (
"id" SERIAL,
    "book_isbn" INTEGER NOT NULL,
    "reader_id" INTEGER NOT NULL,
    "checkout_date" TIMESTAMP(3),
    "returned" BOOLEAN NOT NULL,
    "returned_date" TIMESTAMP(3),
    "duration" INTEGER,

    PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Books" ADD FOREIGN KEY("publisher_id")REFERENCES "Publishers"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CheckedOut" ADD FOREIGN KEY("book_isbn")REFERENCES "Books"("isbn") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CheckedOut" ADD FOREIGN KEY("reader_id")REFERENCES "Readers"("id") ON DELETE CASCADE ON UPDATE CASCADE;
