import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { MatDialogConfig, MatDialog } from '@angular/material/dialog';

import { DialogLoadFeaturesComponent } from '../dialog-load-features/dialog-load-features.component';
import { DialogSaveFeaturesComponent } from '../dialog-save-features/dialog-save-features.component';
import { SurfaceMapService } from '../_service/surface-map.service';
import { TestData } from '../z-test-data';

@Component({
  selector: 'app-surface-map-container',
  templateUrl: './surface-map-container.component.html',
  styleUrls: ['./surface-map-container.component.scss']
})
export class SurfaceMapContainerComponent implements OnInit, OnDestroy {
  sub: Subscription | undefined;

  constructor(private dialog: MatDialog, private mapservice: SurfaceMapService) { }

  ngOnInit(): void {

  }

  onLoadFeatures(): void {
    if (this.mapservice.ismodified === true) {
      if (confirm('Esistono modifiche non salvate, coninuare?') === false) {
        return;
      }
    }
    this.showLoadFeatures();
  }

  onSaveFeatures(data: any): void {
    if (this.mapservice.ismodified === false) {
      alert('Non esistono modifiche da salvare');
      return;
    }
    const json = JSON.stringify(data, null, 2);
    this.showSaveFeatures(json);
  }

  showLoadFeatures() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '600px';
    dialogConfig.height = '550px';
    dialogConfig.data = '';
    let dialogRef = this.dialog.open(DialogLoadFeaturesComponent, dialogConfig);
    this.sub = dialogRef.componentInstance.openfile.subscribe(file => {
      if (file === 'f1') {
        const json = TestData.createTest1();
        this.mapservice.loadPoiData(json);
        dialogRef.close();
      }
      if (file === 'f2') {
        const json = TestData.createTest2();
        this.mapservice.loadPoiData(json);
        dialogRef.close();
      }
      if (file === 'f3') {
        const json = TestData.createTest3();
        this.mapservice.loadPoiData(json);
        dialogRef.close();
      }
    });
    //
    dialogRef.afterClosed().subscribe(data => {
      if (data === "ok") {

      }
      if (data === "no") {

      }
    });
  }

  showSaveFeatures(json: string) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '600px';
    dialogConfig.height = '550px';
    dialogConfig.data = json;
    let dialogRef = this.dialog.open(DialogSaveFeaturesComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(data => {
      if (data === "ok") {

      }
      if (data === "no") {

      }
    });
  }

  ngOnDestroy(): void {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }
}
