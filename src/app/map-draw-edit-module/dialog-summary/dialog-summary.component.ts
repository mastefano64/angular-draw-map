import { Component, Inject, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { SummaryData } from '../geometry-template-prop';
import { Utility } from '../utility';
import { Guid } from 'guid-typescript';
import { cloneDeep } from 'lodash-es';

@Component({
  selector: 'app-dialog-summary',
  templateUrl: './dialog-summary.component.html',
  styleUrls: ['./dialog-summary.component.scss']
})
export class DialogSummaryComponent implements OnInit, OnDestroy {
  form: SummaryData;

  constructor(private dialogRef: MatDialogRef<DialogSummaryComponent>, @Inject(MAT_DIALOG_DATA) private data: SummaryData) {
    this.form = cloneDeep(this.data);
  }

  ngOnInit(): void {

  }

  onSearch(form: NgForm) {
    if (form.invalid === true) {
      return;
    }
    this.data.name = Utility.toString(form.value.name);
    this.data.description = Utility.toString(form.value.description);
    this.dialogRef.close("ok");
  }

  onClose() {
    this.dialogRef.close("no");
  }

  ngOnDestroy(): void {

  }
}
