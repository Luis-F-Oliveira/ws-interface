import { Body } from "@/partials/body"
import { useLocation } from "react-router-dom"
import { TablePartial } from "./table"
import { EditMode } from "./edit"

export const Sectors = () => {
    const location = useLocation()
    const searchParams = new URLSearchParams(location.search)
    const modeValue = searchParams.get('mode')

    return (
        <Body>
            <h1 className='text-3xl text-white mb-8'>Setores</h1>
            {modeValue === 'index' && <TablePartial />}
            {modeValue === 'edit' && <EditMode />}
        </Body>
    )
}
