import { AfterViewInit, Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { animate, style, transition, trigger } from '@angular/animations';
import { MessageBusService } from '../../services/MessageBusService';
import { EventMessage, EventStatus, EventType } from '../../models/event-message.model';
import { Observable } from 'rxjs';
import { HealthCheckResponse } from '../../models/healthcheck-response.model';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss'],
  animations: [
    trigger('slidein', [
      transition(':enter', [
        style({ transform: 'translateX(-100%)' }),
        animate(250, style({ transform: 'translateX(0)' }))
      ]),
      transition(':leave', [
        animate(250, style({ transform: 'translateX(-100%)' }))
      ])
    ])
  ]
})
export class SideNavComponent implements OnInit {

  public isExpanded: boolean;
  public isExpandedProperty: string;
  public isServerUp?: boolean;
  public isSQSUp: boolean;
  public lastUpdateTime: Date;

  private _serviceEventListener$: Observable<any>;
  private _wsEventListener$: Observable<EventMessage<string>>;

  constructor(private _messageBusService: MessageBusService) {
    this.isExpandedProperty = 'isExpanded';
    this.isExpanded = false;
    this.isSQSUp = true;
    this._serviceEventListener$ = this._messageBusService.observe(EventType.SERVICE);
    this._wsEventListener$ = this._messageBusService.observe(EventType.WS);
    this.lastUpdateTime = new Date();
  }

  ngOnInit(): void {
    this.getExpandedStatusFromLocalstorage();
    this._serviceEventListener$.subscribe(() => {
      this.getExpandedStatusFromLocalstorage();
    });
    this._wsEventListener$.subscribe((eventMessage) => {
      const oldStatus = this.isSQSUp && this.isServerUp;
      this.parseWSEvent(eventMessage);
      const newStatus = this.isSQSUp && this.isServerUp;
      if (oldStatus !== newStatus) {
        this._messageBusService.emit(EventType.HEALTH, newStatus);
      }
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

  private getExpandedStatusFromLocalstorage(): void {
    this.isExpanded = localStorage.getItem(this.isExpandedProperty) === 'true';
  }


}
