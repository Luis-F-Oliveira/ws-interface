import { createContext } from 'react'
import axios, { AxiosInstance } from "axios"

interface AxiosContextType {
    api: AxiosInstance;
}

const api = axios.create({
    baseURL: 'http://127.0.0.1:8000/api/',
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest'
    }
})

const AxiosContext = createContext<AxiosContextType>({ api })
export default AxiosContext