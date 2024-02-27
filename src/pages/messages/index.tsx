import { Body } from "@/components"
import { AlertSpam } from "./alert"
import { Notification } from "./notification"

export const Message = () => {
    return (
        <Body name="Mensagens">
            <AlertSpam />
            <Notification />
        </Body>
    )
}
