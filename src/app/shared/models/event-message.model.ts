export class EventMessage<T> {
  private readonly _eventType: EventType;
  private readonly _eventStatus: EventStatus;
  private readonly _eventMessage: T


  constructor(eventType: EventType, eventStatus: EventStatus, eventMessage: T) {
    this._eventType = eventType;
    this._eventStatus = eventStatus;
    this._eventMessage = eventMessage;
  }


  get eventType(): EventType {
    return this._eventType;
  }

  get eventStatus(): EventStatus {
    return this._eventStatus;
  }

  get eventMessage(): T {
    return this._eventMessage;
  }
}

export enum EventType {
  WS,
  SERVICE
}

export enum EventStatus {
  SUCCESS,
  ERROR
}
