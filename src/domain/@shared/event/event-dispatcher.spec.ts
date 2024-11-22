import Customer from "../../customer/entity/customer";
import UpdateCustomerEvent from "../../customer/event/update-customer.event";
import CreateCustomerEvent from "../../customer/event/create-customer.event";
import SendConsoleLogCustomerChangeAddressHandler from "../../customer/event/handler/send-console-log-customer-change-address.handler";
import SendConsoleLogOneCustomerIsCreatedHandler from "../../customer/event/handler/send-console-log-one-customer-is-created.handler";
import SendConsoleLogTwoCustomerIsCreatedHandler from "../../customer/event/handler/send-console-log-two-customer-is-created.handler";
import Address from "../../customer/value-object/address";
import SendEmailWhenProductIsCreatedHandler from "../../product/event/handler/send-email-when-product-is-created.handler";
import ProductCreatedEvent from "../../product/event/product-created.event";
import EventDispatcher from "./event-dispatcher";

describe("Domain events tests", () => {
  it("should register an event handler", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendEmailWhenProductIsCreatedHandler();

    eventDispatcher.register("ProductCreatedEvent", eventHandler);

    expect(
      eventDispatcher.getEventHandlers["ProductCreatedEvent"]
    ).toBeDefined();
    expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"].length).toBe(
      1
    );
    expect(
      eventDispatcher.getEventHandlers["ProductCreatedEvent"][0]
    ).toMatchObject(eventHandler);
  });

  it("should unregister an event handler", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendEmailWhenProductIsCreatedHandler();

    eventDispatcher.register("ProductCreatedEvent", eventHandler);

    expect(
      eventDispatcher.getEventHandlers["ProductCreatedEvent"][0]
    ).toMatchObject(eventHandler);

    eventDispatcher.unregister("ProductCreatedEvent", eventHandler);

    expect(
      eventDispatcher.getEventHandlers["ProductCreatedEvent"]
    ).toBeDefined();
    expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"].length).toBe(
      0
    );
  });

  it("should unregister all event handlers", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendEmailWhenProductIsCreatedHandler();

    eventDispatcher.register("ProductCreatedEvent", eventHandler);

    expect(
      eventDispatcher.getEventHandlers["ProductCreatedEvent"][0]
    ).toMatchObject(eventHandler);

    eventDispatcher.unregisterAll();

    expect(
      eventDispatcher.getEventHandlers["ProductCreatedEvent"]
    ).toBeUndefined();
  });

  it("should notify all event handlers", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendEmailWhenProductIsCreatedHandler();
    const spyEventHandler = jest.spyOn(eventHandler, "handle");

    eventDispatcher.register("ProductCreatedEvent", eventHandler);

    expect(
      eventDispatcher.getEventHandlers["ProductCreatedEvent"][0]
    ).toMatchObject(eventHandler);

    const productCreatedEvent = new ProductCreatedEvent({
      name: "Product 1",
      description: "Product 1 description",
      price: 10.0,
    });

    // Quando o notify for executado o SendEmailWhenProductIsCreatedHandler.handle() deve ser chamado
    eventDispatcher.notify(productCreatedEvent);

    expect(spyEventHandler).toHaveBeenCalled();
  });

  it("customer event: should register an event handler", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler1 = new SendConsoleLogOneCustomerIsCreatedHandler();
    const eventHandler2 = new SendConsoleLogTwoCustomerIsCreatedHandler()

    eventDispatcher.register("CreateCustomerEvent", eventHandler1);
    eventDispatcher.register("CreateCustomerEvent", eventHandler2);

    expect(
      eventDispatcher.getEventHandlers["CreateCustomerEvent"]
    ).toBeDefined();
    expect(eventDispatcher.getEventHandlers["CreateCustomerEvent"].length).toBe(
      2
    );
    expect(
      eventDispatcher.getEventHandlers["CreateCustomerEvent"][0]
    ).toMatchObject(eventHandler1);
    expect(
      eventDispatcher.getEventHandlers["CreateCustomerEvent"][1]
    ).toMatchObject(eventHandler2);
  });

  it("customer event: should unregister customer an event handler", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler1 = new SendConsoleLogOneCustomerIsCreatedHandler();
    const eventHandler2 = new SendConsoleLogTwoCustomerIsCreatedHandler()

    eventDispatcher.register("CreateCustomerEvent", eventHandler1);
    eventDispatcher.register("CreateCustomerEvent", eventHandler2);

    expect(
      eventDispatcher.getEventHandlers["CreateCustomerEvent"][0]
    ).toMatchObject(eventHandler1);
    expect(
      eventDispatcher.getEventHandlers["CreateCustomerEvent"][1]
    ).toMatchObject(eventHandler2);

    eventDispatcher.unregister("CreateCustomerEvent", eventHandler1);
    eventDispatcher.unregister("CreateCustomerEvent", eventHandler2);

    expect(
      eventDispatcher.getEventHandlers["CreateCustomerEvent"]
    ).toBeDefined();
    expect(eventDispatcher.getEventHandlers["CreateCustomerEvent"].length).toBe(
      0
    );
  });

  it("customer event: should unregister all event handlers", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler1 = new SendConsoleLogOneCustomerIsCreatedHandler();
    const eventHandler2 = new SendConsoleLogTwoCustomerIsCreatedHandler();

    eventDispatcher.register("CreateCustomerEvent", eventHandler1);
    eventDispatcher.register("CreateCustomerEvent", eventHandler2);

    expect(
      eventDispatcher.getEventHandlers["CreateCustomerEvent"][0]
    ).toMatchObject(eventHandler1);
    expect(
      eventDispatcher.getEventHandlers["CreateCustomerEvent"][1]
    ).toMatchObject(eventHandler2);

    eventDispatcher.unregisterAll();

    expect(
      eventDispatcher.getEventHandlers["CreateCustomerEvent"]
    ).toBeUndefined();
  });

  it("customer event: should notify all event handlers", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler1 = new SendConsoleLogOneCustomerIsCreatedHandler();
    const eventHandler2 = new SendConsoleLogTwoCustomerIsCreatedHandler();
    const spyEventHandler1 = jest.spyOn(eventHandler1, "handle");
    const spyEventHandler2 = jest.spyOn(eventHandler2, "handle");

    eventDispatcher.register("CreateCustomerEvent", eventHandler1);
    eventDispatcher.register("CreateCustomerEvent", eventHandler2);

    expect(
      eventDispatcher.getEventHandlers["CreateCustomerEvent"][0]
    ).toMatchObject(eventHandler1);
    expect(
      eventDispatcher.getEventHandlers["CreateCustomerEvent"][1]
    ).toMatchObject(eventHandler2);

    const customerCreatedEvent = new CreateCustomerEvent({
      id: "123",
      name: "John"
    })

    eventDispatcher.notify(customerCreatedEvent);

    expect(spyEventHandler1).toHaveBeenCalled();
    expect(spyEventHandler2).toHaveBeenCalled();
  });

  it("customer event: should notify an change address event", () => {
    const eventDispatcher = new EventDispatcher();
    const changeAddressEventHandler = new SendConsoleLogCustomerChangeAddressHandler();
    const changeAddressSpyEventHandler = jest.spyOn(changeAddressEventHandler, "handle");
    
    eventDispatcher.register("UpdateCustomerEvent", changeAddressEventHandler);

    expect(
      eventDispatcher.getEventHandlers["UpdateCustomerEvent"][0]
    ).toMatchObject(changeAddressEventHandler);
    
    const customer = new Customer(
      "123",
      "John"
    );

    customer.changeAddress(new Address(
      "Avenida Central", 
      22, 
      "25100-100", 
      "Niteroi"));
    
    const changeAddressEvent = new UpdateCustomerEvent(customer);   

    eventDispatcher.notify(changeAddressEvent);

    expect(changeAddressSpyEventHandler).toHaveBeenCalled();
  });
});


