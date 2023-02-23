import { Component, OnInit } from '@angular/core';
import { MessageBusService } from '../../services/MessageBusService';
import { EventType } from '../../models/event-message.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public isExpandedProperty: string;
  public isAllWorks: boolean;

  private _serviceEventListener$: Observable<any>;

  constructor(private _messageBusService: MessageBusService) {
    this.isExpandedProperty = 'isExpanded';
    this.isAllWorks = true;
    this._serviceEventListener$ = this._messageBusService.observe(EventType.SERVICE);
  }

  ngOnInit(): void {
    this._serviceEventListener$.subscribe(value => {
      this.isAllWorks = value._eventMessage;
    });
  }
  switchSideBarStatus() {
    const isExpanded = localStorage.getItem(this.isExpandedProperty);
    if (isExpanded === 'true') {
      localStorage.setItem(this.isExpandedProperty, 'false');
    } else {
      localStorage.setItem(this.isExpandedProperty, 'true');
    }
    this._messageBusService.emit(EventType.SERVICE, null);
  }
}
