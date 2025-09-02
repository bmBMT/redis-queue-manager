/*
  Warnings:

  - You are about to drop the `redis_connections` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "public"."redis_connections";

-- CreateTable
CREATE TABLE "public"."redisConnections" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "name" TEXT NOT NULL,
    "displayName" TEXT NOT NULL,
    "host" TEXT NOT NULL,
    "port" INTEGER NOT NULL,
    "password" TEXT,
    "db" INTEGER NOT NULL DEFAULT 0,
    "tls" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "redisConnections_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "redisConnections_name_key" ON "public"."redisConnections"("name");
