import { Component, Inject, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { PropPoint } from '../geometry-template-prop';
import { Utility } from '../utility';
import { Guid } from 'guid-typescript';
import { cloneDeep } from 'lodash-es';

@Component({
  selector: 'app-dialog-point',
  templateUrl: './dialog-point.component.html',
  styleUrls: ['./dialog-point.component.scss']
})
export class DialogPointComponent implements OnInit, OnDestroy {
  form: PropPoint;

  constructor(private dialogRef: MatDialogRef<DialogPointComponent>, @Inject(MAT_DIALOG_DATA) private data: PropPoint) {
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
    this.data.feature.setProperties(this.data);
    this.dialogRef.close("ok");
  }

  onClose() {
    this.dialogRef.close("no");
  }

  ngOnDestroy(): void {

  }
}
