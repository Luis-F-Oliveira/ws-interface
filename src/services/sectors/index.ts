import { api } from "../axios"

export interface serviceCommandsProps {
    success: boolean
    message?: string
    data?: IData[]
}

export interface IData {
    id: number
    name: string
}

export class serviceSectors {
    index(): Promise<serviceCommandsProps> {
        return new Promise(async (resolve, reject) => {
            await api.get('sectors')
                .then((response) => {
                    resolve({ success: true, data: response.data })
                })
                .catch(() => {
                    reject({ success: false })
                })
        })
    }

    store(name: string): Promise<serviceCommandsProps> {
        return new Promise((resolve, reject) => {
            api.post('sectors', name)
                .then(() => {

                })
                .catch(() => {

                })
        })
    }

    show(id: string): Promise<serviceCommandsProps> {
        return new Promise(async (resolve, reject) => {
            await api.get(`sectors/${id}`)
                .then(() => {

                })
                .catch(() => {

                })
        })
    }

    update(id: string, name: string): Promise<serviceCommandsProps> {
        return new Promise((resolve, reject) => {
            api.put(`sectors/${id}`, name)
                .then(() => {

                })
                .catch(() => {

                })
        })
    }

    delete(id: string): Promise<serviceCommandsProps> {
        return new Promise((resolve, reject) => {
            api.get(`sectors/${id}`)
                .then(() => {

                })
                .catch(() => {

                })
        })
    }
}