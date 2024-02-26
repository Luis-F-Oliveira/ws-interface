import { AxiosInstance } from "axios"

export interface UpdateStatus {
    success: boolean
    message?: string
}

export function updateItems() {
    function update(
        api: AxiosInstance,
        url: string | null,
        id: string | null,
        name: string,
        response: string,
        sector: string,
        token: string | undefined
    ): Promise<UpdateStatus> {
        return new Promise((resolve, reject) => {
            api.put(`${url}/${id}`, {
                'name': name,
                'return': response,
                'sector': sector
            },
            {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            .then((response) => {
                if (response.status !== 200) {
                    reject({ success: false, message: 'Não foi possivel atualizar recurso' })
                }

                resolve({ success: true, message: 'atualizado!' })
            })
            .then((error) => {
                reject({ success: false, message: `${error}` })
            })
        })
    }

    return { update }
}