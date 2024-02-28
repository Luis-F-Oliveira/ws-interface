import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { MessageSquareWarning } from "lucide-react"

export const AlertSpam = () => {
    return (
        <Alert className='my-4'>
            <AlertTitle className='flex gap-1 items-center'>
                <MessageSquareWarning /> Atenção!
            </AlertTitle>
            <AlertDescription className='text-justify'>
                Nesta página, você encontrará mensagens enviadas diretamente a
                você. Atualmente, o sistema de mensagens dentro da própria interface
                está em processo de criação. Portanto, a única forma seria através
                da marcação "Respondido pelo WhatsApp" e da resposta pessoal no
                WhatsApp.
            </AlertDescription>
        </Alert>
    )
}
