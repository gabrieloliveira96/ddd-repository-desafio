import EventHandlerInterface from "../../../@shared/event/event-handler.interface";
import CustomerCreatedEvent from "../customer-created.event";

export default class CustomerCreatedHander
  implements EventHandlerInterface<CustomerCreatedEvent>
{
  handle(event: CustomerCreatedEvent): void {
    console.log(`Customer created successfully: id = ${event.eventData.id}, name = ${event.eventData.name}, address = ${event.eventData.Address} `); 
  }
}