import {Component, OnInit} from '@angular/core';
import {DashboardService} from "./dashboard.service";
import {HealthCheckResponse} from "../../../shared/models/healthcheckResponse.model";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit{

  serviceStatuses!: HealthCheckResponse;

  constructor(private _dashboardService: DashboardService) {
  }
  ngOnInit(): void {
    this._dashboardService.getHealthCheck().subscribe(value => this.serviceStatuses = value);
  }

}
