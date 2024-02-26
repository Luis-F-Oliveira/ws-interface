import { AxiosInstance } from "axios"
import { toast } from "react-toastify"

export interface RegistrationStatus {
    success: boolean
    message?: string
}

enum Warning {
    nameNull = 'Preencha o nome',
    emailNull = 'Preencha o email',
    passwordNull = 'Preencha a senha',
    sectorNull = 'Escolha um setor',
    userNotFound = 'Usuário inválido',
    passwordIncorret = 'Senha incorreta'
}

export function RegisterService() {
    function register(api: AxiosInstance, name: string, email: string, password: string, sector: string): Promise<RegistrationStatus> {
        return new Promise((resolve, reject) => {
            console.log(sector)

            if (name === '') {
                toast.warning(`${Warning.nameNull}`)
                reject({ success: false, message: Warning.nameNull })
            } else if (email === '') {
                toast.warning(`${Warning.emailNull}`)
                reject({ success: false, message: Warning.emailNull })
            } else if (password === '') {
                toast.warning(`${Warning.passwordNull}`)
                reject({ success: false, message: Warning.passwordNull })
            } else if (sector === '') {
                toast.warning(`${Warning.sectorNull}`)
                reject({ success: false, message: Warning.sectorNull })
            } else {
                api.post('register', {
                    "name": name,
                    "email": email,
                    "password": password,
                    "sector": sector
                })
                    .then((response) => {
                        if (response.status === 201) {
                            resolve({ success: true, message: 'Usuário criado com sucesso!' })
                        } else {
                            reject({ success: false, message: 'Erro desconhecido.' })
                        }
                    })
                    .catch((error) => {
                        if (error.response.status === 500) {
                            toast.error('Email já cadastrado!')
                            reject({ success: false, message: 'Email já cadastrado!' })
                        } else {
                            reject({ success: false, message: 'Erro desconhecido.' })
                        }
                    })
            }
        })
    }

    return { register }
}
