import { Component, OnInit } from '@angular/core';
import { SqsService } from '../../services/sqs.service';
import { Observable } from 'rxjs';
import { MdbTabChange } from 'mdb-angular-ui-kit/tabs/tabs.component';
import { EventStatus } from '../../../shared/models/event-message.model';
import { MessageModel } from '../../../shared/models/message.model';

@Component({
  selector: 'app-sqs',
  templateUrl: './sqs.component.html',
  styleUrls: ['./sqs.component.scss']
})
export class SQSComponent implements OnInit {

  public queueList$: Observable<string[]>;
  public activeQueue: string;
  public queueUrl: string;
  public queueAttributes!: any;
  public message: any;
  public sendStatus: EventStatus;
  public queueMessages: MessageModel[];

  constructor(private _sqsService: SqsService) {
    this.queueList$ = this._sqsService.getQueueList();
    this.activeQueue = '';
    this.queueUrl = 'http://localhost:4566/000000000000/';
    this.message = '';
    this.sendStatus = EventStatus.PENDING;
    this.queueMessages = [];
  }

  ngOnInit(): void {
  }

  tabChanged(event: MdbTabChange): void {
    this.activeQueue = event.tab.title;
    this._sqsService.getQueueInfo(this.queueUrl + this.activeQueue)
      .subscribe(info => this.queueAttributes = info.attributes)
    this.message = '';
    this.sendStatus = EventStatus.PENDING;
    this.queueMessages = [];
  }

  parseQueueName(queue: string) {
    return queue.split('/')[ 4 ];
  }

  receiveMessages() {
    const fullQueueUrl: string = this.queueUrl + this.activeQueue;
    this._sqsService.getMessages(fullQueueUrl)
      .subscribe((messages) => this.queueMessages.push(...messages));
  }

  sendMessage() {
    this._sqsService.sendMessage(this.activeQueue, this.message)
      .subscribe((result) => {
        if (result.sdkHttpMetadata.httpStatusCode === 200) {
          this.message = '';
          this.sendStatus = EventStatus.SUCCESS;
        } else {
          this.sendStatus = EventStatus.ERROR;
        }
      });
  }

  cleanStatus(event: string) {
    if (event.length === 1) {
      this.sendStatus = EventStatus.PENDING;
    }
  }
}
