/*
  Warnings:

  - You are about to drop the `unprotectedData` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "unprotectedData";

-- CreateTable
CREATE TABLE "UnprotectedData" (
    "id" TEXT NOT NULL,
    "data" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UnprotectedData_pkey" PRIMARY KEY ("id")
);
