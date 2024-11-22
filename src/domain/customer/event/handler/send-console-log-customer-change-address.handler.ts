import EventHandlerInterface from "../../../@shared/event/event-handler.interface";
import UpdateCustomerEvent from "../update-customer.event";

export default class SendConsoleLogCustomerChangeAddressHandler
    implements EventHandlerInterface<UpdateCustomerEvent> {

        handle(event: UpdateCustomerEvent): void {
            console.log(`Endereço do cliente: ${event.eventData.id}, ${event.eventData.name} foi alterado para: ${event.eventData.Address.toString()}`)
        }     
}