export interface Status {
    success: boolean
    message: string
    data?: Array<Data>
}

export interface Data {
    id: number
    question: string
    number_from: string
    answered: number
    created_at: string
    user: User
    command: Command
}

interface Command {
    id: number
    name: string
    return: string
}

interface User {
    id: number
    name: string
    email: string
    sector_id: number
}