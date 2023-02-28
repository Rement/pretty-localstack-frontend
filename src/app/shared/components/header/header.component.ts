import { Component, OnInit } from '@angular/core';
import { MessageBusService } from '../../services/MessageBusService';
import { EventMessage, EventStatus, EventType } from '../../models/event-message.model';
import { Observable } from 'rxjs';
import { HealthCheckResponse } from '../../models/healthcheck-response.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public isServerUp?: boolean;
  public isSQSUp?: boolean;
  public lastUpdateTime: Date;

  private _wsEventListener$: Observable<EventMessage<string>>;

  constructor(private _messageBusService: MessageBusService) {
    this._wsEventListener$ = this._messageBusService.observe(EventType.WS);
    this.lastUpdateTime = new Date();
  }

  ngOnInit(): void {
    this._wsEventListener$.subscribe((eventMessage) => {
      this.parseWSEvent(eventMessage);
    });
  }

  private parseWSEvent(eventMessage: EventMessage<string>): void {
    if (eventMessage.eventStatus === EventStatus.ERROR) {
      this.isServerUp = false;
      return;
    }
    this.isServerUp = true;
    const parsedEvent: HealthCheckResponse = JSON.parse(eventMessage.eventMessage);
    this.lastUpdateTime = parsedEvent.effectiveDateTime;
    if (parsedEvent.services == null) {
      this.isSQSUp = false;
    } else {
      this.isSQSUp = parsedEvent.services.sqs === 'available' || parsedEvent.services.sqs === 'running';
    }
  }
}
