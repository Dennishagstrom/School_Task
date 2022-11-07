export interface Lecture {
    id: string
    name: string
    teacher: string
    createdAt: string
    updatedAt: string
    persons: {
        personNumber: string
    }[]
}
