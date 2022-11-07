export interface Class {
    id: string
    teacher: string
    name: string
    classCode: string
    createdAt: string
    updatedAt: string
    persons: {
        personNumber: string
    }[]
}
