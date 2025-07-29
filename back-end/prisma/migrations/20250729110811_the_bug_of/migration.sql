/*
  Warnings:

  - You are about to drop the column `QuantityCart` on the `Products` table. All the data in the column will be lost.
  - You are about to drop the column `QuantityWishList` on the `Products` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "CartItem" ADD COLUMN     "Quantity" INTEGER NOT NULL DEFAULT 1;

-- AlterTable
ALTER TABLE "Products" DROP COLUMN "QuantityCart",
DROP COLUMN "QuantityWishList";

-- AlterTable
ALTER TABLE "WishlistItem" ADD COLUMN     "Quantity" INTEGER NOT NULL DEFAULT 1;
