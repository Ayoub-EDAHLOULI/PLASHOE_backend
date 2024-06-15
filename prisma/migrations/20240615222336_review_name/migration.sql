/*
  Warnings:

  - You are about to drop the column `comment` on the `review` table. All the data in the column will be lost.
  - Added the required column `review` to the `Review` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `review` DROP COLUMN `comment`,
    ADD COLUMN `review` VARCHAR(191) NOT NULL;
