import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import { Injectable } from '@angular/core';
import { WebSocketShareService } from './WebSocketShareService';

@Injectable()
export class WebSocketAPI {
  webSocketEndPoint: string = 'http://localhost:22378/ws';
  stompClient!: Stomp.Client;

  constructor(private websocketShare: WebSocketShareService){
  }
  _connect(topic: string) {
    console.log("Initialize WebSocket Connection");
    let ws = new SockJS(this.webSocketEndPoint);
    this.stompClient = Stomp.over(ws);
    this.stompClient.connect({}, () => {
      this.stompClient.subscribe(topic, (sdkEvent: any) => {
        this.onMessageReceived(sdkEvent);
      });
    });
  };

  onMessageReceived(message: any) {
    this.websocketShare.onNewValueReceive(message.body);
  }
}
