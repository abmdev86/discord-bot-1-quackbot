/*
  Warnings:

  - You are about to drop the `Project` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_ProjectToUser` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `projectId` to the `Challenge` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Project_challengeId_key";

-- DropIndex
DROP INDEX "Project_title_key";

-- DropIndex
DROP INDEX "_ProjectToUser_B_index";

-- DropIndex
DROP INDEX "_ProjectToUser_AB_unique";

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Project";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "_ProjectToUser";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "ProjectTeam" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "projectName" TEXT NOT NULL,
    "challengeId" TEXT NOT NULL,
    "winner" BOOLEAN NOT NULL DEFAULT false,
    "isSubmitted" BOOLEAN NOT NULL DEFAULT false
);

-- CreateTable
CREATE TABLE "UsersOnProjects" (
    "userId" TEXT NOT NULL,
    "projectId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY ("userId", "projectId"),
    CONSTRAINT "UsersOnProjects_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "UsersOnProjects_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "ProjectTeam" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Challenge" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "dueAt" DATETIME NOT NULL,
    "minTeam" INTEGER NOT NULL DEFAULT 2,
    "maxTeam" INTEGER NOT NULL DEFAULT 4,
    "description" TEXT NOT NULL,
    "requirements" TEXT NOT NULL,
    "projectId" TEXT NOT NULL,
    CONSTRAINT "Challenge_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "ProjectTeam" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Challenge" ("description", "dueAt", "id", "maxTeam", "minTeam", "requirements", "title") SELECT "description", "dueAt", "id", "maxTeam", "minTeam", "requirements", "title" FROM "Challenge";
DROP TABLE "Challenge";
ALTER TABLE "new_Challenge" RENAME TO "Challenge";
CREATE UNIQUE INDEX "Challenge_title_key" ON "Challenge"("title");
CREATE UNIQUE INDEX "Challenge_projectId_key" ON "Challenge"("projectId");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

-- CreateIndex
CREATE UNIQUE INDEX "ProjectTeam_projectName_key" ON "ProjectTeam"("projectName");

-- CreateIndex
CREATE UNIQUE INDEX "ProjectTeam_challengeId_key" ON "ProjectTeam"("challengeId");
