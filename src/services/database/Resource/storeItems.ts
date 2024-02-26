import { AxiosInstance } from "axios"
import { toast } from "react-toastify"

export interface StoreStatus {
    success: boolean
    message?: string
}

enum Warning {
    nameNull = 'Preencha o nome',
    responseNull = 'Preencha o retorno',
    sectorNull = 'Escolha o setor'
}

export function storeItems() {
    function store(
        api: AxiosInstance,
        url: string | null,
        name: string,
        response: string,
        sector: string,
        token: string | undefined
    ): Promise<StoreStatus> {
        return new Promise((resolve, reject) => {
            if (name === '') {
                toast.warning(`${Warning.nameNull}`)
            } else if (response === '' && url === 'commands') {
                toast.warning(`${Warning.responseNull}`)
            } else if (sector === '' && url === 'commands') {
                toast.warning(`${Warning.sectorNull}`)
            } else {
                api.post(`${url}`, {
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
                    if (response.status !== 201) {
                        reject({ success: false, message: 'Não foi possivel criar recurso' })
                    }

                    resolve({ success: true, message: `${response.data.name} criado!` })
                })
                .then((error) => {
                    reject({ success: false, message: `${error}` })
                })
            }
        })
    }

    return { store }
}