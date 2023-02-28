import { Component, OnInit } from '@angular/core';
import { SqsQueueService } from '../../services/sqs-queue.service';
import { Observable } from 'rxjs';
import { SqsMessageService } from '../../services/sqs-message.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-sqs',
  templateUrl: './sqs.component.html',
  styleUrls: ['./sqs.component.scss']
})
export class SQSComponent implements OnInit {

  public queueList$: Observable<string[]>;
  public newQueueName: string;
  public deleteCandidate: string;

  /*  public activeQueue: string;
    public queueUrl: string;
    public queueAttributes!: any;
    public message: any;
    public sendStatus: EventStatus;
    public queueMessages: MessageModel[];
    public newQueueName: string;
    panelOpenState = false;*/

  constructor(private _sqsQueueService: SqsQueueService,
              private _sqsMessageService: SqsMessageService,
              private _snackBar: MatSnackBar) {
    this.queueList$ = this.getQueueList();
    this.newQueueName = '';
    this.deleteCandidate = '';
    /*this.activeQueue = '';
    this.queueUrl = '';
    this.message = '';
    this.sendStatus = EventStatus.PENDING;
    this.queueMessages = [];
    this.newQueueName = '';*/
  }


  ngOnInit(): void {
  }

  parseQueueName(queue: string) {
    return queue.split('/')[ 4 ];
  }

  createQueue(queueName: string): void {
    this._sqsQueueService.createQueue(queueName).subscribe(() => {
      this.queueList$ = this.getQueueList();
      this.newQueueName = '';
      this.openSnackBar('Queue \'' + queueName + '\' was created');
    });
  }

  deleteQueue(queueUrl: string): void {
    this._sqsQueueService.deleteQueue(queueUrl).subscribe(() => {
      this.deleteCandidate = '';
      this.queueList$ = this.getQueueList();
      this.openSnackBar('Queue \'' + this.parseQueueName(queueUrl) + '\' was deleted');
    });
  }


  /*tabChanged(event: any): void {
    this.activeQueue = event.tab.title;
    this._sqsQueueService.getQueueInfo(this.queueUrl + this.activeQueue)
      .subscribe(info => this.queueAttributes = info.attributes)
    this.message = '';
    this.sendStatus = EventStatus.PENDING;
    this.queueMessages = [];
  }

  */

  /*receiveMessages() {
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
  }*/

  /*cleanStatus(event: string) {
    if (event.length === 1) {
      this.sendStatus = EventStatus.PENDING;
    }
  }

  deleteMessage(queueName: string, receiptHandler: string) {
    this._sqsMessageService.deleteMessage(this.queueUrl + queueName, receiptHandler)
      .subscribe(() => {
        this.receiveMessages();
      })
  }*/

  private openSnackBar(message: string) {
    this._snackBar.open(message, '', {
      duration: 3000
    });
  }

  private getQueueList(): Observable<string[]> {
    return this._sqsQueueService.getQueueList();
  }
}
