import { Component, Inject, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { PropPoint } from '../geometry-template-prop';
import { Utility } from '../utility';

@Component({
  selector: 'app-dialog-load-features',
  templateUrl: './dialog-load-features.component.html',
  styleUrls: ['./dialog-load-features.component.scss']
})
export class DialogLoadFeaturesComponent implements OnInit, OnDestroy {
  @Output() openfile = new EventEmitter<any>();
  files: any = [];

  constructor(private dialogRef: MatDialogRef<DialogLoadFeaturesComponent>,
                 @Inject(MAT_DIALOG_DATA) private data: any) {
    this.files.push(
      { name: 'File 1', file: 'f1' }
    );
    this.files.push(
      { name: 'File 2', file: 'f2' }
    );
    this.files.push(
      { name: 'File 3', file: 'f3' }
    );
  }

  ngOnInit(): void {

  }

  onOpenFile(f: any): void {
    this.openfile.emit(f.file);
  }

  ngOnDestroy(): void {

  }
}
