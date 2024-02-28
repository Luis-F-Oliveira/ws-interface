import { AxiosInstance } from "axios"

export interface GetSectorsPromise {
    success: boolean,
    message?: string
    data?: Array<Data>
}

export interface Data {
    name: string
    count: number
}

export function getSectors() {
    function index(
        api: AxiosInstance,
        token: string | undefined
    ): Promise<GetSectorsPromise> {
        return new Promise(async (resolve, reject) => {
            await api.get('charts/sectors', {
                'headers': {
                    'Authorization' : `Bearer ${token}`
                }
            })
            .then((response) => {
                if (response.status !== 200) {
                    reject({ 'success': false })
                }

                resolve({ 'success': true, 'data': response.data })
            })  
            .catch((error) => {
                reject({ 'success': false, 'message': `${error}` })
            })
        })
    }

    return { index }
}