import React from 'react'

interface HandleProps {
    id: string | null
}

export const Handle: React.FC<HandleProps> = ({ id }) => {
    return (
        <div>
            Handle
        </div>
    )
}