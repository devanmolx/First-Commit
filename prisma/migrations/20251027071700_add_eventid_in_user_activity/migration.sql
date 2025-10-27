/*
  Warnings:

  - A unique constraint covering the columns `[eventId]` on the table `UserActivity` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `eventId` to the `UserActivity` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "UserActivity" ADD COLUMN     "eventId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "UserActivity_eventId_key" ON "UserActivity"("eventId");
