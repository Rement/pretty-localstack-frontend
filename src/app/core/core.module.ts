import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SQSComponent } from './components/sqs/sqs.component';
import { MdbTabsModule } from 'mdb-angular-ui-kit/tabs';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { FormsModule } from '@angular/forms';
import { TextareaAutosizeDirective } from '../shared/directives/oversize-text-area.directive';


@NgModule({
  declarations: [
    SQSComponent,
    TextareaAutosizeDirective
  ],
  imports: [
    CommonModule,
    MdbTabsModule,
    MdbFormsModule,
    FormsModule,
  ]
})
export class CoreModule { }
