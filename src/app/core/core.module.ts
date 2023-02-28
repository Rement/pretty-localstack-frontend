import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SQSComponent } from './components/sqs/sqs.component';
import { FormsModule } from '@angular/forms';
import { TextareaAutosizeDirective } from '../shared/directives/oversize-text-area.directive';


@NgModule({
  declarations: [
    SQSComponent,
    TextareaAutosizeDirective
  ],
  imports: [
    CommonModule,
    FormsModule,
  ]
})
export class CoreModule { }
