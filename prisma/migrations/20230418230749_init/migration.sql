-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL PRIMARY KEY
);

-- CreateTable
CREATE TABLE "Project" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "challengeId" TEXT NOT NULL,
    CONSTRAINT "Project_challengeId_fkey" FOREIGN KEY ("challengeId") REFERENCES "Challenge" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Challenge" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "requirements" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_ProjectToUser" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    CONSTRAINT "_ProjectToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "Project" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_ProjectToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Project_title_key" ON "Project"("title");

-- CreateIndex
CREATE UNIQUE INDEX "Project_challengeId_key" ON "Project"("challengeId");

-- CreateIndex
CREATE UNIQUE INDEX "Challenge_title_key" ON "Challenge"("title");

-- CreateIndex
CREATE UNIQUE INDEX "_ProjectToUser_AB_unique" ON "_ProjectToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_ProjectToUser_B_index" ON "_ProjectToUser"("B");
