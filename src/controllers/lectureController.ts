import prisma from "../../client";
import {Lecture} from "../types/lecture";
import {Class} from "../types/class";


export async function getLectures() {
    return await prisma.lecture.findMany();
}

export async function postLecture(request: Lecture) {
    const { name, teacher, persons} = request;
    return await prisma.lecture.create({
        data: {
            name,
            teacher,
            persons: {
                create: persons
            }
        },
        include: {
            persons: {
                include: {
                    person: true
                }
            }
        }
    });
}

export async function getLecture(name: string) {
    return await prisma.lecture.findUnique({
        where: {
            name
        },
        include: {
            persons: {
                include: {
                    person: true
                }
            }
        }
    })
}

export async function updateLecture(request: Lecture, id: string) {
    const { name, teacher, persons }: Lecture = request
    return await prisma.lecture.update({
        where: {
            id: id
        },
        data: {
            name,
            teacher,
            persons: {
                create: persons
            }
        },
        include: {
            persons: {
                include: {
                    person: true
                }
            }
        }
    });
}

export function deleteLecture() {

}