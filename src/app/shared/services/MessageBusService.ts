import { ErrorHandler, Injectable } from '@angular/core';
import { filter, Observable, Subject } from 'rxjs';
import { EventMessage, EventStatus, EventType } from '../models/event-message.model';

@Injectable({
  providedIn: 'root'
})
export class MessageBusService {
  private errorHandler: ErrorHandler;
  private eventStream: Subject<EventMessage<any>>;

  constructor(errorHandler: ErrorHandler) {
    this.errorHandler = errorHandler;
    this.eventStream = new Subject();
  }

  public observe(type: EventType): Observable<EventMessage<any>> {
    return this.eventStream.pipe(filter(eventMessage => eventMessage.eventType === type));
  }

  public emit(type: EventType, message: any): void {
    const eventMessage = this.messageWrapper(type, EventStatus.SUCCESS, message);
    this.eventStream.next(eventMessage);
  }

  public emitError(type: EventType, error: any) {
    const eventMessage = this.messageWrapper(type, EventStatus.ERROR, error);
    this.eventStream.next(eventMessage);
  }

  private messageWrapper(eventType: EventType, eventStatus: EventStatus, eventMessage: any): EventMessage<any> {
    return new EventMessage(eventType, eventStatus, eventMessage);
  }

}
