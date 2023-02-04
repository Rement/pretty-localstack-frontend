import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private http: HttpClient) { }

  getHealthCheck(): Observable<Map<String, String>> {
    return this.http.get<Map<String, String>>('/localstack/healthcheck');
  }
}
