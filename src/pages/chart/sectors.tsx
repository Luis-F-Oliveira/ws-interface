import { AxiosContext, useUser } from '@/context'
import { Data, GetSectorsPromise, getSectors } from '@/services/chart/getSectors'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { useContext, useEffect, useState } from 'react'
import { Doughnut } from 'react-chartjs-2'
import { backgroundColors, borderColors } from './@colors'

ChartJS.register(ArcElement, Tooltip, Legend)

export const Sectors = () => {
    const [ response, setResponse ] = useState<Data[] | undefined>(undefined)
    const [ headers, setHeaders ] = useState<Array<string> | undefined>(undefined)
    const [ counts, setCounts ] = useState<Array<number> | undefined>(undefined)
    const { api } = useContext(AxiosContext)
    const { index } = getSectors()
    const { token } = useUser()

    useEffect(() => {
        const usePromise = async () => {
            const indexPromise: GetSectorsPromise = await index(api, token?.value)

            console.log(indexPromise)

            if (indexPromise.success) {
                setResponse(indexPromise.data)
            }

        }
        usePromise()
    }, [api])

    useEffect(() => {
        if (response && response.length > 0) {
            const headersData = response.map(data => data.name)
            const countsData = response.map(data => data.count)
            setHeaders(headersData);
            setCounts(countsData);
        }
    }, [response])

    const data = {
        labels: headers,
        datasets: [
            {
                label: '# of Messages',
                data: counts,
                backgroundColor: backgroundColors,
                borderColor: borderColors,
                borderWidth: 1,
            },
        ],
    }

    return <Doughnut data={data} />
}