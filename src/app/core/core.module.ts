import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SQSComponent } from './components/sqs/sqs.component';
import { FormsModule } from '@angular/forms';
import { TextareaAutosizeDirective } from '../shared/directives/oversize-text-area.directive';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatListModule } from '@angular/material/list';
import { MatTooltipModule } from '@angular/material/tooltip';


@NgModule({
  declarations: [
    SQSComponent,
    TextareaAutosizeDirective
  ],
  imports: [
    CommonModule,
    FormsModule,
    MatExpansionModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatSnackBarModule,
    MatListModule,
    MatTooltipModule
  ]
})
export class CoreModule { }
