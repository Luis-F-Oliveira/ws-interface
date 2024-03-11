import { AxiosInstance } from "axios"
import { IUser } from '@/@types/User'
import { FormData } from "@/pages/public/login"
import { toast } from "react-toastify"

export interface AuthenticateStatus {
    success: boolean
    message?: string
    data?: IUser
}

export function Authenticate() {
    function auth(
        api: AxiosInstance,
        formData: FormData
    ): Promise<AuthenticateStatus> {
        return new Promise((resolve, reject) => {
            api.post('login', {
                'email': formData.email,
                'password': formData.password
            })
                .then((response) => {
                    if (response.status !== 200) {
                        reject({ 'success': false, 'message': response.data })
                    }

                    const user: IUser = response.data.user
                    resolve({ success: true, data: user })
                })
                .catch((error) => {
                    if (error.response.status === 401) {
                        toast.error('Credenciais Inválidas!')
                    }
                })
        })
    }

    return { auth }
}