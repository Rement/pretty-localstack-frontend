import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SQSComponent } from './core/components/sqs/sqs.component';

const routes: Routes = [
  {path: '', redirectTo: 'sqs', pathMatch: 'full'},
  {path: 'sqs', component: SQSComponent, title: 'SQS'},
  {path: '**', redirectTo: 'sqs'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
