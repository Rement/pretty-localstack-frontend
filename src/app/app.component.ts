import { Component } from '@angular/core';
import { WebSocketAPI } from './shared/services/WebSocketAPI';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  private _healthTopic: string = '/health'

  constructor(private _webSocketAPI: WebSocketAPI,
              private _matIconRegistry: MatIconRegistry,
              private _domSanitizer: DomSanitizer) {
    this._matIconRegistry.addSvgIcon(
      `localstackui`,
      this._domSanitizer.bypassSecurityTrustResourceUrl('/../assets/icons/localstackui-main-logo.svg')
    );
    this._webSocketAPI._connect(this._healthTopic);
  }
}
