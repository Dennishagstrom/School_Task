import prisma from "../../client";
import {Person} from "../types/person";

export async function getPersons() {
    return await prisma.person.findMany();
}

export async function getPerson(id: string) {
    return await prisma.person.findUnique({
        where: {
            personNumber: id
        }
    })
}

export async function getPersonsInClass(code: string) {
    return await prisma.person.findMany({
        where: {
            classCode: code
        }
    })
}

export async function postPerson(request: Person) {
    const { personNumber, firstName, lastName, role, classCode }: Person = request
    return await prisma.person.create({
        data: {
            personNumber,
            firstName,
            lastName,
            role,
            classCode: classCode || null
        }
    });
}

export async function updateUser(request: Person, id: string) {
    const { personNumber, firstName, lastName, role, classCode }: Person = request
    return await prisma.person.update({
        where: {
            personNumber: id
        },
        data: {
            personNumber,
            firstName,
            lastName,
            role,
            classCode
        }
    });
}

export function deleteUser() {

}
