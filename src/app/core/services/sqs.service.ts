import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { QueueInfo } from '../../shared/models/queue-info.model';
import { MessageRequest } from '../../shared/models/MessageRequest';
import { SendMessageResponseModel } from '../../shared/models/send-message-response.model';
import { MessageModel } from '../../shared/models/message.model';

@Injectable({
  providedIn: 'root'
})
export class SqsService {

  public sqsBaseUrl: string;

  constructor(private http: HttpClient) {
    this.sqsBaseUrl = '/sqs';
  }

  getQueueList(): Observable<string[]> {
    return this.http.get<string[]>(this.sqsBaseUrl + `/queues`);
  }

  getQueueInfo(queueUrl: string): Observable<QueueInfo> {
    const encodedUrl: string = encodeURIComponent(queueUrl);
    let params = new HttpParams();
    params = params.append('queryUrl', encodedUrl);
    return this.http.get<any>(this.sqsBaseUrl + `/queue`, {params: params})
  }

  getMessages(queueUrl: string): Observable<MessageModel[]> {
    const encodedUrl: string = encodeURIComponent(queueUrl);
    let params = new HttpParams();
    params = params.append('queryUrl', encodedUrl);
    return this.http.get<any>(this.sqsBaseUrl + `/receive`, {params: params})
  }

  sendMessage(queueUrl: string, message: string): Observable<SendMessageResponseModel> {
    const messageRequest: MessageRequest = new MessageRequest(message, queueUrl);
    return this.http.post<any>(this.sqsBaseUrl + `/send`, messageRequest);
  }

}
