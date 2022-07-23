import { Component, Inject, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { PropPolygon } from '../geometry-template-prop';
import { Utility } from '../utility';
import { Guid } from 'guid-typescript';
import { cloneDeep } from 'lodash-es';

@Component({
  selector: 'app-dialog-polygon',
  templateUrl: './dialog-polygon.component.html',
  styleUrls: ['./dialog-polygon.component.scss']
})
export class DialogPolygonComponent implements OnInit, OnDestroy {
  form: PropPolygon;

  constructor(private dialogRef: MatDialogRef<DialogPolygonComponent>, @Inject(MAT_DIALOG_DATA) private data: PropPolygon) {
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
