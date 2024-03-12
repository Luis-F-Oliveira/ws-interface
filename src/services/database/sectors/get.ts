import { AxiosInstance } from "axios"
import { toast } from "react-toastify"

export interface SectorsStatus {
    success: boolean
    message?: string
    data?: ISectors
}

export interface ISectors {
    id: number
    name: string
}

export function getAll() {
    function index(
        api: AxiosInstance
    ): Promise<SectorsStatus> {
        return new Promise((resolve, reject) => {
            api.get('sectors')
                .then((response) => {
                    if (response.status !== 200) {
                        reject({ 'success': false, 'message': response.data })
                    }

                    const sectors: ISectors = response.data
                    resolve({ success: true, data: sectors })
                })
                .catch((error) => {
                    if (error.response.status === 401) {
                        toast.error('User Not Authenticate!')
                    }

                    toast.error('Erro na busca')
                })
        })
    }

    return { index }
}

export function getOne() {
    function show(
        api: AxiosInstance,
        id: string | null
    ): Promise<SectorsStatus> {
        return new Promise((resolve, reject) => {
            api.get(`sectors/${id}`)
                .then((response) => {
                    if (response.status !== 200) {
                        reject({ 'success': false, 'message': response.data })
                    }

                    const sectors: ISectors = response.data
                    resolve({ success: true, data: sectors })
                })
                .catch((error) => {
                    if (error.response.status === 401) {
                        toast.error('User Not Authenticate!')
                    }

                    toast.error('Erro na busca')
                })
        })
    }

    return { show }
}