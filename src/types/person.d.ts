type Roles = "TEACHER" | "STUDENT"

export interface Person {
    personNumber: string
    firstName: string
    lastName: string
    role: Roles
    classCode: string
    createdAt: string
    updatedAt: string
}

