-- CreateTable
CREATE TABLE "Contact" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "first" TEXT,
    "last" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "favorite" BOOLEAN,
    "avatar" TEXT,
    "twitter" TEXT,
    "notes" TEXT
);
