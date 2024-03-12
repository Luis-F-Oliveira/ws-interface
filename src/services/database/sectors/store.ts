import { AxiosInstance } from "axios"
import { toast } from "react-toastify"

export interface SectorsStatus {
    success: boolean
}

export function StoreSector() {
    function store(
        api: AxiosInstance,
        name: string
    ): Promise<SectorsStatus> {
        return new Promise((resolve, reject) => { 
            api.post('sectors', {
                'name': name
            })
            .then((response) => {
                if (response.status !== 201) {
                    reject({ 'success': false })
                }
                resolve({ 'success': true })
            })
            .catch((error) => {
                if (error.response.status === 401) {
                    toast.error('User Not Authenticate!')
                }

                toast.error('Erro na busca')
            })
        })
    }

    return { store }
}