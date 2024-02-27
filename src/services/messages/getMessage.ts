import { AxiosInstance } from "axios"
import { Data, Status } from "./@types"

export function getMessages() {
    function index(
        api: AxiosInstance,
        token: string | undefined
    ): Promise<Status> {
        return new Promise(async (resolve, reject) => {
            await api.get('commits', {
                'headers': {
                    'Authorization': `Bearer ${token}`
                }
            })
                .then((response) => {
                    if (response.status !== 200) {
                        reject({ 'success': false, 'message': 'Erro ao buscar conteúdo' })
                    }

                    const mappedData: Data[] = response.data.map((item: any) => {
                        return {
                            id: item.id,
                            number_from: item.number_from,
                            answered: item.answered,
                            created_at: item.created_at,
                            user: {
                                id: item.user.id,
                                name: item.user.name,
                                email: item.user.email,
                                sector_id: item.user.sector_id
                            },
                            command: {
                                id: item.command.id,
                                name: item.command.name,
                                return: item.command.return
                            }
                        }
                    })

                    resolve({ 'success': true, 'message': 'Mensagens coletadas', 'data': mappedData })
                })
                .catch((error) => {
                    reject({ 'success': false, 'message': `Erro ao buscar conteúdo: ${error}` })
                })
        })
    }

    return { index }
}