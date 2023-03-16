import EventDispatcher from "../../@shared/event/event-dispatcher";
import Customer from "../entity/customer";
import Address from "../value-object/address";
import CustomerChangedAddressEvent from "./customer-changed-address.event";
import CustomerCreatedEvent from "./customer-created.event";
import CustomerCreatedHander from "./handler/customer-created.handler.event";
import ChangedAddressHandler from "./handler/envia-console-log-changed-address.handler";
import EnviaConsoleLog1Handler from "./handler/envia-console-log1.handler";
import EnviaConsoleLog2Handler from "./handler/envia-console-log2handler.ts";


describe("Domain events tests", () => {
  it("should register an customer event handler", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler1 = new EnviaConsoleLog1Handler();
    
    eventDispatcher.register("CustomerCreatedEvent", eventHandler1);
    
    const customer1 = new Customer("1", "Gabriel Silva");
    
    const customerCreatedEvent1 = new CustomerCreatedEvent(customer1);

    eventDispatcher.notify(customerCreatedEvent1);

    eventDispatcher.unregister("CustomerCreatedEvent",eventHandler1)
    
    const eventHandler2 = new EnviaConsoleLog2Handler();

    eventDispatcher.register("CustomerCreatedEvent", eventHandler2);
      
    const customer2 = new Customer("2", "Fernanda");

    const customerCreatedEvent2 = new CustomerCreatedEvent(customer2);

    eventDispatcher.notify(customerCreatedEvent2);

    expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"]).toBeDefined();
    expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"].length).toBe(1);
    expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"][0]).toMatchObject(eventHandler2);

  });

  it("should register an customer and changed Address handler", () => {
    const eventDispatcher = new EventDispatcher();
    const customerCreatedHander = new CustomerCreatedHander();
    
    eventDispatcher.register("CustomerCreatedEvent", customerCreatedHander);
    
    const addressFrist = new Address("Street 1", 1, "Zipcode 1", "City 1");
    
    const customer1 = new Customer("1", "Gabriel Silva");
    
    customer1.changeAddress(addressFrist);

    const customerCreatedEvent = new CustomerCreatedEvent(customer1);

    eventDispatcher.notify(customerCreatedEvent);

    const addressSecond = new Address("Street 2", 1, "Zipcode 2", "City 2");

    customer1.changeAddress(addressSecond);

    const eventHandler2 = new ChangedAddressHandler();

    eventDispatcher.register("CustomerChangedAddressEvent", eventHandler2);

    const customerChangedAddressEvent = new CustomerChangedAddressEvent(customer1);

    eventDispatcher.notify(customerChangedAddressEvent);

    expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"]).toBeDefined();
    expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"].length).toBe(1);
    expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"][0]).toMatchObject(eventHandler2);
    

  });


  // it("should unregister an event handler", () => {
  //   const eventDispatcher = new EventDispatcher();
  //   const eventHandler = new SendEmailWhenProductIsCreatedHandler();

  //   eventDispatcher.register("ProductCreatedEvent", eventHandler);

  //   expect(
  //     eventDispatcher.getEventHandlers["ProductCreatedEvent"][0]
  //   ).toMatchObject(eventHandler);

  //   eventDispatcher.unregister("ProductCreatedEvent", eventHandler);

  //   expect(
  //     eventDispatcher.getEventHandlers["ProductCreatedEvent"]
  //   ).toBeDefined();
  //   expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"].length).toBe(
  //     0
  //   );
  // });

  // it("should unregister all event handlers", () => {
  //   const eventDispatcher = new EventDispatcher();
  //   const eventHandler = new SendEmailWhenProductIsCreatedHandler();

  //   eventDispatcher.register("ProductCreatedEvent", eventHandler);

  //   expect(
  //     eventDispatcher.getEventHandlers["ProductCreatedEvent"][0]
  //   ).toMatchObject(eventHandler);

  //   eventDispatcher.unregisterAll();

  //   expect(
  //     eventDispatcher.getEventHandlers["ProductCreatedEvent"]
  //   ).toBeUndefined();
  // });

  // it("should notify all event handlers", () => {
  //   const eventDispatcher = new EventDispatcher();
  //   const eventHandler = new SendEmailWhenProductIsCreatedHandler();
  //   const spyEventHandler = jest.spyOn(eventHandler, "handle");

  //   eventDispatcher.register("ProductCreatedEvent", eventHandler);

  //   expect(
  //     eventDispatcher.getEventHandlers["ProductCreatedEvent"][0]
  //   ).toMatchObject(eventHandler);

  //   const productCreatedEvent = new ProductCreatedEvent({
  //     name: "Product 1",
  //     description: "Product 1 description",
  //     price: 10.0,
  //   });

  //   // Quando o notify for executado o SendEmailWhenProductIsCreatedHandler.handle() deve ser chamado
  //   eventDispatcher.notify(productCreatedEvent);

  //   expect(spyEventHandler).toHaveBeenCalled();
  // });
});
