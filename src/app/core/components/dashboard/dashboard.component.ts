import { Component, OnInit } from '@angular/core';
import { HealthCheckResponse } from '../../../shared/models/healthcheckResponse.model';
import { WebSocketShareService } from '../../../shared/services/WebSocketShareService';
import { WebSocketAPI } from '../../../shared/services/WebSocketAPI';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit{

  dashBoardResponse!: HealthCheckResponse;
  dashBoardTopic: string = '/dashboard'

  constructor(private websocketService: WebSocketShareService,
              private webSocketAPI: WebSocketAPI) {

  }
  ngOnInit(): void {
    this.webSocketAPI._connect(this.dashBoardTopic);
    this.onNewValueReceive();
  }

  onNewValueReceive() {
    this.websocketService.getNewValue().subscribe(resp => {
      this.dashBoardResponse = resp;
    });
  }
}
