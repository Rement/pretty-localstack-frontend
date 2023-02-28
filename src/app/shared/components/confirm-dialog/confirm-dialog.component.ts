import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';

@Component({
  selector: 'confirm-dialog',
  templateUrl: 'confirm-dialog.component.html',
})
export class ConfirmDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              private _dialogRef: MatDialogRef<ConfirmDialogComponent>) {
  }

  confirm(): void {
    this._dialogRef.close('delete');
  }
}
