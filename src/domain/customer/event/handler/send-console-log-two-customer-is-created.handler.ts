import EventHandlerInterface from "../../../@shared/event/event-handler.interface";
import CreateCustomerEvent from "../create-customer.event";

export default class SendConsoleLogTwoCustomerIsCreatedHandler 
    implements EventHandlerInterface<CreateCustomerEvent> {

    handle(event: CreateCustomerEvent): void {
        console.log("Esse é o segundo console.log do evento: CustomerCreated")
    }
}