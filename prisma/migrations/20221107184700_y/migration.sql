/*
  Warnings:

  - You are about to drop the `_LectureToPerson` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_LectureToPerson" DROP CONSTRAINT "_LectureToPerson_A_fkey";

-- DropForeignKey
ALTER TABLE "_LectureToPerson" DROP CONSTRAINT "_LectureToPerson_B_fkey";

-- DropTable
DROP TABLE "_LectureToPerson";

-- CreateTable
CREATE TABLE "PersonInLecture" (
    "personNumber" TEXT NOT NULL,
    "lectureId" TEXT NOT NULL,
    "assignedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PersonInLecture_pkey" PRIMARY KEY ("personNumber","lectureId")
);

-- AddForeignKey
ALTER TABLE "PersonInLecture" ADD CONSTRAINT "PersonInLecture_personNumber_fkey" FOREIGN KEY ("personNumber") REFERENCES "Person"("personNumber") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PersonInLecture" ADD CONSTRAINT "PersonInLecture_lectureId_fkey" FOREIGN KEY ("lectureId") REFERENCES "Lecture"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
