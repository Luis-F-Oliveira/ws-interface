import { AxiosInstance } from "axios"

export interface ShowPromise {
    success: boolean
    message: string
    data?: Array<Data>
    headers?: Array<string>
}

export interface Data {
    id: number
    name: string
    return?: string
    sector_id?: number
    sector_name?: string
}

export function getItem() {
    function show(
        api: AxiosInstance,
        url: string | null,
        id: string | null,
        token: string | undefined
    ): Promise<ShowPromise> {
        return new Promise(async (resolve, reject) => {
            await api.get(`${url}/${id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
                .then((response) => {
                    if (response.status !== 200) {
                        reject({ success: false, message: 'Erro desconhecido.' })
                    }

                    const mappedData: Array<Data> = [response.data].map((item: any) => {
                        const dataItem: Data = {
                            id: item.id,
                            name: item.name
                        }
                    
                        if ('return' in item) {
                            dataItem.return = item.return
                        }
                    
                        if (item.sector && 'id' in item.sector && 'name' in item.sector) {
                            dataItem.sector_id = item.sector.id
                            dataItem.sector_name = item.sector.name
                        }
                    
                        return dataItem
                    })

                    const headersIndex = (data: Data[]): string[] => {
                        const headers: Set<string> = new Set()
                    
                        data.forEach((item) => {
                            headers.add('id')
                            headers.add('nome')

                            if (item.return !== undefined) {
                                headers.add('retorno')
                            }
                    
                            if (item.sector_id !== undefined && item.sector_name !== undefined) {
                                headers.add('setor')
                            }
                        });
                    
                        return Array.from(headers);
                    }
                    
                    const headers = headersIndex(mappedData)

                    resolve({
                        success: true,
                        message: 'carregado',
                        data: mappedData,
                        headers: headers
                    })
                })
                .catch((error) => {
                    reject({ success: false, message: `${error}` })
                })
        })
    }

    return { show }
}