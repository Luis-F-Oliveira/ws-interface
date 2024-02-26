import { AxiosInstance } from "axios"

export interface DeleteStatus {
    success: boolean
    message?: string
}

export function deleteItems() {
    function destroy(
        api: AxiosInstance,
        url: string | null,
        id: string | null,
        token: string | undefined
    ): Promise<DeleteStatus> {
        return new Promise((resolve, reject) => {
            api.delete(`${url}/${id}`,
            {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            .then((response) => {
                if (response.status !== 200) {
                    reject({ success: false, message: 'Não foi possivel apagar recurso' })
                }

                resolve({ success: true, message: 'Recurso apagado!' })
            })
            .then((error) => {
                reject({ success: false, message: `${error}` })
            })
        })
    }

    return { destroy }
}