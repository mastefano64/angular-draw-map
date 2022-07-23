import { Component, Inject, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { PropPoint } from '../geometry-template-prop';
import { Utility } from '../utility';

@Component({
  selector: 'app-dialog-save-features',
  templateUrl: './dialog-save-features.component.html',
  styleUrls: ['./dialog-save-features.component.scss']
})
export class DialogSaveFeaturesComponent implements OnInit, OnDestroy {
  json: string;

  constructor(private dialogRef: MatDialogRef<DialogSaveFeaturesComponent>,
            @Inject(MAT_DIALOG_DATA) private data: string) {
    this.json = data;
  }

  ngOnInit(): void {

  }

  onSearch(form: NgForm) {
    this.dialogRef.close("ok");
  }

  onClose() {
    this.dialogRef.close("no");
  }

  ngOnDestroy(): void {

  }
}
