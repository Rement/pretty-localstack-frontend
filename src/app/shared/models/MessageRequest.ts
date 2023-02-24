export class MessageRequest {


  private message: string
  private queueName: string


  constructor(message: string, queueName: string) {
    this.message = message;
    this.queueName = queueName;
  }


}
