-- CreateEnum
CREATE TYPE "Role" AS ENUM ('STUDENT', 'TEACHER');

-- CreateTable
CREATE TABLE "Person" (
    "personNumber" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'STUDENT',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "classCode" TEXT,

    CONSTRAINT "Person_pkey" PRIMARY KEY ("personNumber")
);

-- CreateTable
CREATE TABLE "Class" (
    "classCode" TEXT NOT NULL,
    "teacher" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Class_pkey" PRIMARY KEY ("classCode")
);

-- CreateTable
CREATE TABLE "Lecture" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "teacher" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Lecture_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_LectureToPerson" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Class_name_key" ON "Class"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Lecture_name_key" ON "Lecture"("name");

-- CreateIndex
CREATE UNIQUE INDEX "_LectureToPerson_AB_unique" ON "_LectureToPerson"("A", "B");

-- CreateIndex
CREATE INDEX "_LectureToPerson_B_index" ON "_LectureToPerson"("B");

-- AddForeignKey
ALTER TABLE "Person" ADD CONSTRAINT "Person_classCode_fkey" FOREIGN KEY ("classCode") REFERENCES "Class"("classCode") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_LectureToPerson" ADD CONSTRAINT "_LectureToPerson_A_fkey" FOREIGN KEY ("A") REFERENCES "Lecture"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_LectureToPerson" ADD CONSTRAINT "_LectureToPerson_B_fkey" FOREIGN KEY ("B") REFERENCES "Person"("personNumber") ON DELETE CASCADE ON UPDATE CASCADE;
