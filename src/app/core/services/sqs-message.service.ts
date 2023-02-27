import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MessageModel } from '../../shared/models/message.model';
import { SendMessageResponseModel } from '../../shared/models/send-message-response.model';
import { MessageRequest } from '../../shared/models/MessageRequest';
import { DeleteMessageRequestModel } from '../../shared/models/delete-message-request.model';

@Injectable({
  providedIn: 'root'
})
export class SqsMessageService {

  public sqsBaseUrl: string;

  constructor(private http: HttpClient) {
    this.sqsBaseUrl = '/sqs/message';
  }

  getMessages(queueUrl: string): Observable<MessageModel[]> {
    const encodedUrl: string = encodeURIComponent(queueUrl);
    let params = new HttpParams();
    params = params.append('queryUrl', encodedUrl);
    return this.http.get<any>(this.sqsBaseUrl, {params: params})
  }

  sendMessage(queueUrl: string, message: string): Observable<SendMessageResponseModel> {
    const messageRequest: MessageRequest = new MessageRequest(message, queueUrl);
    return this.http.post<any>(this.sqsBaseUrl, messageRequest);
  }

  deleteMessage(queueUrl: string, receiptHandle: string): Observable<any> {
    const encodedUrl: string = encodeURIComponent(queueUrl);
    let params = new HttpParams();
    params = params.append('queueUrl', encodedUrl);
    params = params.append('receiptHandle', receiptHandle);
    return this.http.delete<any>(this.sqsBaseUrl, {params: params});
  }

}
