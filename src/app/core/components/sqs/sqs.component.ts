import { Component } from '@angular/core';
import { SqsQueueService } from '../../services/sqs-queue.service';
import { Observable } from 'rxjs';
import { MdbTabChange } from 'mdb-angular-ui-kit/tabs/tabs.component';
import { EventStatus } from '../../../shared/models/event-message.model';
import { MessageModel } from '../../../shared/models/message.model';
import { SqsMessageService } from '../../services/sqs-message.service';

@Component({
  selector: 'app-sqs',
  templateUrl: './sqs.component.html',
  styleUrls: ['./sqs.component.scss']
})
export class SQSComponent {

  public queueList$: Observable<string[]>;
  public activeQueue: string;
  public queueUrl: string;
  public queueAttributes!: any;
  public message: any;
  public sendStatus: EventStatus;
  public queueMessages: MessageModel[];

  constructor(private _sqsQueueService: SqsQueueService,
              private _sqsMessageService: SqsMessageService) {
    this.queueList$ = this._sqsQueueService.getQueueList();
    this.activeQueue = '';
    this.queueUrl = '';
    this.message = '';
    this.sendStatus = EventStatus.PENDING;
    this.queueMessages = [];
  }

  tabChanged(event: MdbTabChange): void {
    this.activeQueue = event.tab.title;
    this._sqsQueueService.getQueueInfo(this.queueUrl + this.activeQueue)
      .subscribe(info => this.queueAttributes = info.attributes)
    this.message = '';
    this.sendStatus = EventStatus.PENDING;
    this.queueMessages = [];
  }

  parseQueueName(queue: string) {
    this.queueUrl = queue.split('/').slice(0, 4).join('/') + '/';
    return queue.split('/')[ 4 ];
  }

  receiveMessages() {
    const fullQueueUrl: string = this.queueUrl + this.activeQueue;
    this._sqsMessageService.getMessages(fullQueueUrl)
      .subscribe((messages) => this.queueMessages.push(...messages));
  }

  sendMessage() {
    this._sqsMessageService.sendMessage(this.activeQueue, this.message)
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
