-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('Men', 'Women');

-- CreateTable
CREATE TABLE "Shoe" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "sku" TEXT NOT NULL,
    "model" VARCHAR(50) NOT NULL,
    "description" VARCHAR(256) NOT NULL,
    "image" VARCHAR(256) NOT NULL,
    "gender" "Gender" NOT NULL,
    "size" TEXT NOT NULL,
    "stock" INTEGER NOT NULL,

    CONSTRAINT "Shoe_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_variants" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Shoe_sku_key" ON "Shoe"("sku");

-- CreateIndex
CREATE UNIQUE INDEX "_variants_AB_unique" ON "_variants"("A", "B");

-- CreateIndex
CREATE INDEX "_variants_B_index" ON "_variants"("B");

-- AddForeignKey
ALTER TABLE "_variants" ADD CONSTRAINT "_variants_A_fkey" FOREIGN KEY ("A") REFERENCES "Shoe"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_variants" ADD CONSTRAINT "_variants_B_fkey" FOREIGN KEY ("B") REFERENCES "Shoe"("id") ON DELETE CASCADE ON UPDATE CASCADE;
