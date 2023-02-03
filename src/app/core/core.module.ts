import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { SQSComponent } from './components/sqs/sqs.component';



@NgModule({
  declarations: [
    DashboardComponent,
    SQSComponent
  ],
  imports: [
    CommonModule
  ]
})
export class CoreModule { }
