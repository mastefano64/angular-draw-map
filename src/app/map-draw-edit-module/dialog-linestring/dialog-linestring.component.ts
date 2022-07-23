import { Component, Inject, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { PropLineString } from '../geometry-template-prop';
import { Utility } from '../utility';
import { Guid } from 'guid-typescript';
import { cloneDeep } from 'lodash-es';

@Component({
  selector: 'app-dialog-linestring',
  templateUrl: './dialog-linestring.component.html',
  styleUrls: ['./dialog-linestring.component.scss']
})
export class DialogLineStringComponent implements OnInit, OnDestroy {
  form: PropLineString;

  constructor(private dialogRef: MatDialogRef<DialogLineStringComponent>, @Inject(MAT_DIALOG_DATA) private data: PropLineString) {
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
