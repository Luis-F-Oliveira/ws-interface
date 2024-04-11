import { api } from "../axios"

export interface serviceCommandsProps {
    success: boolean
    message?: string
    data?: IData[]
}

export interface IData {
    id: number
    name: string
    return: string
    parent_id: number | null
    sector_id: number
    sector: Sector
    replies?: IData[]
}

interface Sector {
    id: number
    name: string
}

export class serviceCommands {
    index(): Promise<serviceCommandsProps> {
        return new Promise(async (resolve, reject) => {
            try {
                const response = await api.get('commands')
                resolve({ success: true, data: response.data })
            } catch (error) {
                reject({ success: false, message: "erro ao coletar dados" })
            }
        })
    }

    store() { }

    show(id: string | null): Promise<serviceCommandsProps> { 
        return new Promise(async (resolve, reject) => {
            try {
                const response = await api.get(`commands/${id}`)
                resolve({ success: true, data: response.data })
            } catch {
                reject({ success: false, message: "erro ao coletar dados" })
            }
        })
    }

    update() { }

    delete() { }
}