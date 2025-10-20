/*
  Warnings:

  - You are about to drop the `Issues` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."Issues" DROP CONSTRAINT "Issues_projectId_fkey";

-- DropTable
DROP TABLE "public"."Issues";

-- CreateTable
CREATE TABLE "Issue" (
    "id" SERIAL NOT NULL,
    "url" TEXT NOT NULL,
    "repoUrl" TEXT NOT NULL,
    "issueNo" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "createdBy" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "tags" TEXT[],
    "projectId" INTEGER NOT NULL,

    CONSTRAINT "Issue_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Issue" ADD CONSTRAINT "Issue_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;
