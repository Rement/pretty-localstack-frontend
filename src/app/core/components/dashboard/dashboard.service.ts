import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {HealthCheckResponse} from "../../../shared/models/healthcheckResponse.model";

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private http: HttpClient) { }

  getHealthCheck(): Observable<HealthCheckResponse> {
    return this.http.get<HealthCheckResponse>('/localstack/healthcheck');
  }
}
