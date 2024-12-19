/*
  Warnings:

  - The primary key for the `AlbumGenres` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `reviewID` on the `Comments` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[albumId,genreId]` on the table `AlbumGenres` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[title]` on the table `Albuns` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `Artists` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userID,albumID]` on the table `Ratings` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userName]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `albumID` to the `Comments` table without a default value. This is not possible if the table is not empty.
  - Added the required column `artistId` to the `Songs` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Comments" DROP CONSTRAINT "Comments_reviewID_fkey";

-- AlterTable
ALTER TABLE "AlbumGenres" DROP CONSTRAINT "AlbumGenres_pkey",
ADD COLUMN     "albumGenre_id" SERIAL NOT NULL,
ADD CONSTRAINT "AlbumGenres_pkey" PRIMARY KEY ("albumGenre_id");

-- AlterTable
ALTER TABLE "Comments" DROP COLUMN "reviewID",
ADD COLUMN     "albumID" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Songs" ADD COLUMN     "artistId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "ArtistGenre" (
    "artistGenre_id" SERIAL NOT NULL,
    "artistId" INTEGER NOT NULL,
    "genreId" INTEGER NOT NULL,

    CONSTRAINT "ArtistGenre_pkey" PRIMARY KEY ("artistGenre_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ArtistGenre_artistId_genreId_key" ON "ArtistGenre"("artistId", "genreId");

-- CreateIndex
CREATE UNIQUE INDEX "AlbumGenres_albumId_genreId_key" ON "AlbumGenres"("albumId", "genreId");

-- CreateIndex
CREATE UNIQUE INDEX "Albuns_title_key" ON "Albuns"("title");

-- CreateIndex
CREATE UNIQUE INDEX "Artists_name_key" ON "Artists"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Ratings_userID_albumID_key" ON "Ratings"("userID", "albumID");

-- CreateIndex
CREATE UNIQUE INDEX "User_userName_key" ON "User"("userName");

-- AddForeignKey
ALTER TABLE "Songs" ADD CONSTRAINT "Songs_artistId_fkey" FOREIGN KEY ("artistId") REFERENCES "Artists"("artist_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comments" ADD CONSTRAINT "Comments_albumID_fkey" FOREIGN KEY ("albumID") REFERENCES "Albuns"("album_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ArtistGenre" ADD CONSTRAINT "ArtistGenre_artistId_fkey" FOREIGN KEY ("artistId") REFERENCES "Artists"("artist_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ArtistGenre" ADD CONSTRAINT "ArtistGenre_genreId_fkey" FOREIGN KEY ("genreId") REFERENCES "Genres"("genre_id") ON DELETE RESTRICT ON UPDATE CASCADE;
