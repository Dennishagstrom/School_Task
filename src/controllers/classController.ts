import prisma from "../../client";
import {Class} from "../types/class";
import {Person} from "../types/person";


export async function getClasses() {
    return await prisma.class.findMany();
}

export async function getClass(id: string) {
    return await prisma.class.findUnique({
        where: {
            classCode: id
        },
        include: {
            students: true
        }
    })
}

export async function postClass(request: Class) {
    const { name, teacher, classCode }: Class = request
    return await prisma.class.create({
        data: {
            name,
            teacher,
            classCode
        }
    });
}


export async function updateClass(request: Class, id: string) {
    const { name, teacher, classCode }: Class = request
    return await prisma.class.update({
        where: {
            classCode: id
        },
        data: {
            name,
            teacher,
            classCode
        }
    });
}

export function deleteClass() {

}