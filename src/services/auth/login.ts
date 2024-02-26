import { AxiosInstance } from "axios"
import { toast } from "react-toastify"

export interface AuthenticateStatus {
    success: boolean
    message?: string
    user?: UserData;
    token?: string;
}

export interface UserData {
    id: number;
    name: string;
    email: string;
}

enum Warning {
    emailNull = 'Preencha o email',
    passwordNull = 'Preencha a senha',
    userNotFound = 'Usuário inválido',
    passwordIncorret = 'Senha incorreta'
}

export function AuthService() {
    function auth(api: AxiosInstance, email: string, password: string): Promise<AuthenticateStatus> {
        return new Promise((resolve, reject) => {
            if (email === '') {
                toast.warning(`${Warning.emailNull}`)
                reject({ success: false, message: Warning.emailNull })
            } else if (password === '') {
                toast.warning(`${Warning.passwordNull}`)
                reject({ success: false, message: Warning.passwordNull })
            } else {
                api.post('login', {
                    "email": email,
                    "password": password
                })
                    .then((response) => {
                        if (response.status === 200) {
                            const user = response.data.user
                            const token = response.data.token
                            resolve({ success: true, message: 'Usuário logado com sucesso!', user: user, token: token })
                        } else {
                            reject({ success: false, message: 'Erro desconhecido.' })
                        }
                    })
                    .catch((error) => {
                        if (error.response.status === 401) {
                            toast.error('Credenciais Inválidas!')
                            reject({ success: false, message: 'Credenciais inválidas!' })
                        } else {
                            reject({ success: false, message: 'Erro desconhecido.' })
                        }
                    })
            }
        })
    }

    return { auth }
}