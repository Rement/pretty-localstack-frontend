import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import { Injectable } from '@angular/core';
import { MessageBusService } from './MessageBusService';
import { EventType } from '../models/event-message.model';

@Injectable({
  providedIn: 'root'
})
export class WebSocketAPI {
  webSocketEndPoint: string = 'http://localhost:22378/ws';
  stompClient!: Stomp.Client;

  constructor(private _messageBusService: MessageBusService) {
  }

  _connect(topic: string) {
    let ws = new SockJS(this.webSocketEndPoint);
    this.stompClient = Stomp.over(ws);
    this.stompClient.debug = () => {};
    this.stompClient.connect({}, (frame) => {
      this.stompClient.subscribe(topic, (sdkEvent: any) => {
        this._messageBusService.emit(EventType.WS, sdkEvent.body)
      });
    }, (error) => this._messageBusService.emitError(EventType.WS, error));
  };
}
