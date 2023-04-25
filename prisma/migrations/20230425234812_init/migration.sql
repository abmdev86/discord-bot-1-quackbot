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
    "projectId" TEXT NOT NULL
);
INSERT INTO "new_Challenge" ("description", "dueAt", "id", "maxTeam", "minTeam", "projectId", "requirements", "title") SELECT "description", "dueAt", "id", "maxTeam", "minTeam", "projectId", "requirements", "title" FROM "Challenge";
DROP TABLE "Challenge";
ALTER TABLE "new_Challenge" RENAME TO "Challenge";
CREATE UNIQUE INDEX "Challenge_title_key" ON "Challenge"("title");
CREATE UNIQUE INDEX "Challenge_projectId_key" ON "Challenge"("projectId");
CREATE TABLE "new_ProjectTeam" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "projectName" TEXT NOT NULL,
    "challengeId" TEXT NOT NULL,
    "winner" BOOLEAN NOT NULL DEFAULT false,
    "isSubmitted" BOOLEAN NOT NULL DEFAULT false,
    CONSTRAINT "ProjectTeam_challengeId_fkey" FOREIGN KEY ("challengeId") REFERENCES "Challenge" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_ProjectTeam" ("challengeId", "id", "isSubmitted", "projectName", "winner") SELECT "challengeId", "id", "isSubmitted", "projectName", "winner" FROM "ProjectTeam";
DROP TABLE "ProjectTeam";
ALTER TABLE "new_ProjectTeam" RENAME TO "ProjectTeam";
CREATE UNIQUE INDEX "ProjectTeam_projectName_key" ON "ProjectTeam"("projectName");
CREATE UNIQUE INDEX "ProjectTeam_challengeId_key" ON "ProjectTeam"("challengeId");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
