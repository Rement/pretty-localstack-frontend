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

  constructor(private http: HttpClient) {
  }

  getQueueList(): Observable<string[]> {
    return this.http.get<string[]>(`/queues`);
  }

  getQueueInfo(queueUrl: string): Observable<QueueInfo> {
    return this.http.post<any>(`/queue`, queueUrl)
  }

  getMessages(queueUrl: string): Observable<MessageModel[]> {
    return this.http.post<any>(`/receive`, queueUrl)
  }

  sendMessage(queueUrl: string, message: string): Observable<SendMessageResponseModel> {
    const messageRequest: MessageRequest = new MessageRequest(message, queueUrl);
    return this.http.post<any>(`/send`, messageRequest);
  }



}
