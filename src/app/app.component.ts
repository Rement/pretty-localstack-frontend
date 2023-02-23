import { Component } from '@angular/core';
import { WebSocketAPI } from './shared/services/WebSocketAPI';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent{
  private _healthTopic: string = '/health'

  constructor(private _webSocketAPI: WebSocketAPI) {
    this._webSocketAPI._connect(this._healthTopic);
  }
}
