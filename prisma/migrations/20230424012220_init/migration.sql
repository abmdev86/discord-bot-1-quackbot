/*
  Warnings:

  - Added the required column `dueAt` to the `Challenge` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Challenge" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "dueAt" DATETIME NOT NULL,
    "description" TEXT NOT NULL,
    "requirements" TEXT NOT NULL
);
INSERT INTO "new_Challenge" ("description", "id", "requirements", "title") SELECT "description", "id", "requirements", "title" FROM "Challenge";
DROP TABLE "Challenge";
ALTER TABLE "new_Challenge" RENAME TO "Challenge";
CREATE UNIQUE INDEX "Challenge_title_key" ON "Challenge"("title");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
