/*
  Warnings:

  - Added the required column `displayName` to the `redis_connections` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "redis_connections" ADD COLUMN     "displayName" TEXT NOT NULL;
