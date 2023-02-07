import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { MdbCollapseModule } from 'mdb-angular-ui-kit/collapse';
import { MdbDropdownModule } from 'mdb-angular-ui-kit/dropdown';
import { WebSocketAPI } from './services/WebSocketAPI';
import { WebSocketShareService } from './services/WebSocketShareService';


@NgModule({
  declarations: [
    HeaderComponent
  ],
  exports: [
    HeaderComponent
  ],
  imports: [
    CommonModule,
    MdbCollapseModule,
    MdbDropdownModule,
  ],
  providers: [
    WebSocketAPI,
    WebSocketShareService
  ]
})
export class SharedModule {}
