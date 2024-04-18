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

interface IUpdate {
    name: string
    return: string
    parent_id: string | null
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

    store(parent_id: string | null): Promise<serviceCommandsProps> {
        return new Promise((resolve, reject) => {
            const values = {
                name: "Comando",
                return: "Resposta",
                parent_id: parent_id
            }

            api.post('commands', values)
            .then((response) => {
                console.log(response)
                resolve({ success: true })
            })
            .catch(() => {
                reject({ success: false })
            })
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

    update(id: string | null, values: IUpdate): Promise<serviceCommandsProps> {
        return new Promise(async (resolve) => {
            api.put(`commands/${id}`, values)
                .then(() => {
                    resolve({ success: true })
                })
                .catch(() => {
                    resolve({ success: false })
                })
        })
    }

    delete(id: string | null): Promise<serviceCommandsProps> {
        return new Promise((resolve) => {
            api.delete(`commands/${id}`)
                .then(() => {
                    resolve({ success: true })
                })
                .catch((error) => {
                    if (error.response.status === 403) {
                        resolve({ success: false, message: error.response.data.message })
                    }
                })
        })
    }
}