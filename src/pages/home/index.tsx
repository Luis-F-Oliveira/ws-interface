import { Body } from "@/components"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { MessageSquareWarning } from "lucide-react"


export const Home = () => {
    return (
        <Body name="Mensagens">
            <Alert className='my-4'>
                <AlertTitle className='flex gap-1 items-center'>
                    <MessageSquareWarning /> Atenção!
                </AlertTitle>
                <AlertDescription className='text-justify'>
                    Nesta página, você encontrará mensagens enviadas e respondidas pelo bot,
                    além de mensagens para você responder. Existem duas formas de responder
                    uma mensagem. A primeira é respondendo dentro da página atual, porém isso
                    tem algumas limitações, como a impossibilidade de enviar imagens. A outra
                    opção é responder através do WhatsApp. Ao optar pelo WhatsApp, será
                    necessário clicar em "Respondido pelo WhatsApp", pois isso marcará a
                    mensagem como respondida para o sistema.
                </AlertDescription>
            </Alert>
        </Body>
    )
}
