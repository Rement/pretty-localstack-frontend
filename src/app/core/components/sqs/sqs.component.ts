import { Component } from '@angular/core';
import { SqsQueueService } from '../../services/sqs-queue.service';
import { Observable } from 'rxjs';
import { SqsMessageService } from '../../services/sqs-message.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatOptionSelectionChange } from '@angular/material/core';
import { MessageModel } from '../../../shared/models/message.model';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../../shared/components/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-sqs',
  templateUrl: './sqs.component.html',
  styleUrls: ['./sqs.component.scss']
})
export class SQSComponent {

  public queueList$: Observable<string[]>;
  public newQueueName: string;
  public messageToSend: string;
  public selectedQueue: string;
  public queueAttributes!: any;
  public queueMessages: MessageModel[];

  constructor(private _sqsQueueService: SqsQueueService,
              private _sqsMessageService: SqsMessageService,
              private _snackBar: MatSnackBar,
              private _dialog: MatDialog) {
    this.queueList$ = this.getQueueList();
    this.newQueueName = '';
    this.messageToSend = '';
    this.selectedQueue = '';
    this.queueMessages = [];
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
    const openDialog: MatDialogRef<any> = this._dialog.open(ConfirmDialogComponent, {
      data: {
        queueUrl: queueUrl,
        queueName: this.parseQueueName(queueUrl)
      }
    });

    openDialog.afterClosed().subscribe((result) => {
      if (result === 'delete') {
        this._sqsQueueService.deleteQueue(queueUrl).subscribe(() => {
          this.selectedQueue = '';
          this.queueList$ = this.getQueueList();
          this.openSnackBar('Queue \'' + this.parseQueueName(queueUrl) + '\' was deleted');
        });
      }
    });
  }

  sendMessage() {
    this._sqsMessageService.sendMessage(this.selectedQueue, this.messageToSend)
      .subscribe((result) => {
        if (result.sdkHttpMetadata.httpStatusCode === 200) {
          this.messageToSend = '';
          this.openSnackBar('Message was successfully sent')
        } else {
          this.openSnackBar('Something went wrong during sending')
        }
      });
  }

  public retrieveQueueAttributes(event: MatOptionSelectionChange) {
    if (!event.isUserInput) {
      return;
    }
    const queueUrl: string = event.source.value;
    this._sqsQueueService.getQueueInfo(queueUrl)
      .subscribe(info => {
        this.messageToSend = '';
        this.queueAttributes = info.attributes;
        this.queueMessages = [];
      })
  }

  public retrieveMessages() {
    this._sqsMessageService.getMessages(this.selectedQueue)
      .subscribe((messages) => {
        console.log(messages);
        this.queueMessages.push(...messages)
      });
  }

  public deleteMessage(itemIndex: number, message: MessageModel) {
    this._sqsMessageService.deleteMessage(this.selectedQueue, message.receiptHandle).subscribe(() => {
      this.queueMessages.splice(itemIndex, 1);
    })
  }

  private openSnackBar(message: string) {
    this._snackBar.open(message, '', {
      duration: 3000
    });
  }

  private getQueueList(): Observable<string[]> {
    return this._sqsQueueService.getQueueList();
  }
}
