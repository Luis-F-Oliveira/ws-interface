import { api } from "../axios"

interface ServiceUsersProps {
    success: boolean
    message?: string
    data?: IUser[]
}

export interface IUser {
    id: number
    name: string
    email: string
    is_bot: boolean
    access_id: string
    sector_id: string
    access: IAccess
    sector: ISector
}

interface ISector {
    id: number
    name: string
}

interface IAccess {
    id: number
    name: string
}

export class ServiceUsers
{
    index(): Promise<ServiceUsersProps> 
    {
        return new Promise(async (resolve, reject) => {
            try {
                const response = await api.get('users')
                resolve({
                    success: true,
                    data: response.data
                })
            } catch {
                reject({
                    success: false,
                })
            }
        })    
    }

    store(data: IUser): Promise<ServiceUsersProps>
    {
        return new Promise(async (resolve, reject) => {
            try {
                const response = await api.post('register', data)
                resolve({
                    success: true,
                    data: response.data
                })
            } catch {
                reject({
                    success: false,
                })
            }
        })
    }

    show(id: string): Promise<ServiceUsersProps>
    {
        return new Promise(async (resolve, reject) => {
            try {
                const response = await api.get(`users/${id}`)
                resolve({
                    success: true,
                    data: response.data
                })
            } catch {
                reject({
                    success: false,
                })
            }
        })
    }

    update(id: string, data: IUser): Promise<ServiceUsersProps>
    {
        return new Promise(async (resolve, reject) => {
            try {
                const response = await api.put(`users/${id}`, data)
                resolve({
                    success: true,
                    data: response.data
                })
            } catch {
                reject({
                    success: false,
                })
            }
        })
    }

    delete(id: string): Promise<ServiceUsersProps>
    {
        return new Promise(async (resolve, reject) => {
            try {
                const response = await api.delete(`users/${id}`)
                resolve({
                    success: true,
                    data: response.data
                })
            } catch {
                reject({
                    success: false,
                })
            }
        })
    }
}