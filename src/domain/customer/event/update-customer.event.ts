import EventInterface from "../../@shared/event/event.interface";
import Customer from "../entity/customer";

export default class UpdateCustomerEvent implements EventInterface {
    dataTimeOccurred: Date;
    eventData: Customer;

    constructor(eventData: Customer) {
        if (!eventData) {
            throw new Error("Customer data must be provided.");
        }
        this.dataTimeOccurred = new Date();
        this.eventData = eventData;
    }
}
