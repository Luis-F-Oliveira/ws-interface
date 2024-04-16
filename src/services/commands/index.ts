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
    sector?: Sector
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

    store(parent_id: string | null, sector_id: string): Promise<serviceCommandsProps> {
        return new Promise((resolve, reject) => {
            try {
                const values = {
                    name: "Comando",
                    return: "Resposta",
                    parent_id: parent_id,
                    sector_id: sector_id
                }

                const response = api.post('commands', values)
                resolve({ success: true })
            } catch {
                reject({ success: false })
            }
        })
    }

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

    update(id: string | null, values: IData): Promise<serviceCommandsProps> {
        return new Promise(async (resolve, reject) => {
            try {
                const response = await api.put(`commands/${id}`, values)
                resolve({ success: true })
            } catch {
                reject({ success: false })
            }
        })
    }

    delete(id: string | null): Promise<serviceCommandsProps> {
        return new Promise((resolve, reject) => {
            try {
                const response = api.delete(`commands/${id}`)
                resolve({ success: true })
            } catch {
                reject({ success: false })
            }
        })
    }
}