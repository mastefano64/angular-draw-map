import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

import { MatDialogConfig, MatDialog } from '@angular/material/dialog';

import Feature from 'ol/Feature';
import GeometryType from 'ol/geom/GeometryType';

import { DialogSummaryComponent } from '../dialog-summary/dialog-summary.component';
import { DialogLineStringComponent } from '../dialog-linestring/dialog-linestring.component';
import { DialogPointComponent } from '../dialog-point/dialog-point.component';
import { DialogPolygonComponent } from '../dialog-polygon/dialog-polygon.component';
import { BaseProp, PropPoint, PropLineString, PropPolygon, SummaryData } from '../geometry-template-prop';
import { FeatureMetadata } from '../feature-metadata';

@Injectable({
  providedIn: 'root',
})
export class SurfaceMapService {
  summarydata: SummaryData;
  datasummarycreated = false;
  ismodified = false;

  private toloadSubject = new Subject<any>();
  public toload$ = this.toloadSubject.asObservable();

  private tomapsSubject = new Subject<any>();
  public tomaps$ = this.tomapsSubject.asObservable();

  private tosideSubject = new Subject<any>();
  public toside$ = this.tosideSubject.asObservable();

  private tolistPointSubject = new BehaviorSubject<any>([]);
  public tolistPoint$ = this.tolistPointSubject.asObservable();
  private listPoint: PropPoint[] = [];

  private tolistLineStringSubject = new BehaviorSubject<any>([]);
  public tolistLineString$ = this.tolistLineStringSubject.asObservable();
  private listLineString: PropLineString[] = [];

  private tolistPolygonSubject = new BehaviorSubject<any>([]);
  public tolistPolygon$ = this.tolistPolygonSubject.asObservable();
  private listPolygon: PropPolygon[] = [];

  constructor(private dialog: MatDialog) {
    this.summarydata = new SummaryData();
  }

  openDialogSummary(create: boolean): void {
    if (create === true) {
      this.summarydata = new SummaryData();
    }
    this.showModalSummary();
  }

  loadPoiData(json: string): void {
    this.toloadSubject.next(json);
  }

  insertGeometry1(feature: Feature): void {
    const prop = feature.getProperties();
    const g = feature.getGeometry();
    if (g!.getType() === GeometryType.POINT) {
      this.listPoint.push(prop as PropPoint);
      const param = { list: this.listPoint, chagetabs: false };
      this.tolistPointSubject.next(param);
    }
    if (g!.getType() === GeometryType.LINE_STRING) {
      this.listLineString.push(prop as PropLineString);
      const param = { list: this.listLineString, chagetabs: false };
      this.tolistLineStringSubject.next(param);
    }
    if (g!.getType() === GeometryType.POLYGON) {
      this.listPolygon.push(prop as PropPolygon);
      const param = { list: this.listPolygon, chagetabs: false };
      this.tolistPolygonSubject.next(param);
    }
  }

  insertGeometry2(metadata: FeatureMetadata): void {
    if (metadata.geom === GeometryType.POINT) {
      this.listPoint.push(metadata.prop as PropPoint);
      const param = { list: this.listPoint, chagetabs: true };
      this.tolistPointSubject.next(param);
      this.showModalPoint(metadata.prop);
    }
    if (metadata.geom === GeometryType.LINE_STRING) {
      this.listLineString.push(metadata.prop as PropLineString);
      const param = { list: this.listLineString, chagetabs: true };
      this.tolistLineStringSubject.next(param);
      this.showModalLineString(metadata.prop);
    }
    if (metadata.geom === GeometryType.POLYGON) {
      this.listPolygon.push(metadata.prop as PropPolygon);
      const param = { list: this.listPolygon, chagetabs: true };
      this.tolistPolygonSubject.next(param);
      this.showModalPolygon(metadata.prop);
    }
  }

  centerFeature(item1: PropPoint): void {
    const g = item1.feature.getGeometry();
    const type = g!.getType();
    if (type === GeometryType.POINT) {
      const args = {cmd: 'center', payload: item1!};
      this.tomapsSubject.next(args);
    }
    if (type === GeometryType.LINE_STRING) {
      const args = {cmd: 'center', payload: item1!};
      this.tomapsSubject.next(args);
    }
    if (type === GeometryType.POLYGON) {
      const args = {cmd: 'center', payload: item1!};
      this.tomapsSubject.next(args);
    }
  }

  deleteFeature(item1: PropPoint): void {
    const g = item1.feature.getGeometry();
    const type = g!.getType();
    if (type === GeometryType.POINT) {
      const item2 = this.listPoint.find(x => x.id === item1.id);
      const pos = this.listPoint.indexOf(item2!);
      this.listPoint.splice(pos, 1);
      const args = {cmd: 'delete', payload: item1!};
      this.tomapsSubject.next(args);
    }
    if (type === GeometryType.LINE_STRING) {
      const item2 = this.listLineString.find(x => x.id === item1.id);
      const pos = this.listLineString.indexOf(item2!);
      this.listLineString.splice(pos, 1);
      const args = {cmd: 'delete', payload: item1!};
      this.tomapsSubject.next(args);
    }
    if (type === GeometryType.POLYGON) {
      const item2 = this.listPolygon.find(x => x.id === item1.id);
      const pos = this.listPolygon.indexOf(item2!);
      this.listPolygon.splice(pos, 1);
      const args = {cmd: 'delete', payload: item1!};
      this.tomapsSubject.next(args);
    }
    this.ismodified = true;
  }

  showModalSummary() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '600px';
    dialogConfig.height = '550px';
    dialogConfig.data = this.summarydata;
    let dialogRef = this.dialog.open(DialogSummaryComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(data => {
      if (data === "ok") {
        this.datasummarycreated = true;
        this.ismodified = true;
      }
      if (data === "no") {

      }
    });
  }

  showModalPoint(prop: BaseProp) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '600px';
    dialogConfig.height = '550px';
    dialogConfig.data = prop;
    let dialogRef = this.dialog.open(DialogPointComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(data => {
      if (data === "ok") {
        this.ismodified = true;
      }
      if (data === "no") {

      }
    });
  }

  showModalLineString(prop: BaseProp) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '600px';
    dialogConfig.height = '550px';
    dialogConfig.data = prop;
    let dialogRef = this.dialog.open(DialogLineStringComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(data => {
      if (data === "ok") {
        this.ismodified = true;
      }
      if (data === "no") {

      }
    });
  }

  showModalPolygon(prop: BaseProp) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '600px';
    dialogConfig.height = '550px';
    dialogConfig.data = prop;
    let dialogRef = this.dialog.open(DialogPolygonComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(data => {
      if (data === "ok") {
        this.ismodified = true;
      }
      if (data === "no") {

      }
    });
  }

  createDataToSave(): any {
    const summary = { ...this.summarydata }
    const points = [];
    for (const point1 of this.listPoint) {
      const point2 = {
        id: point1.id,
        lonlat: (point1.feature as any).lonlat,
        name: point1.name,
        description: point1.description
      }
      points.push(point2);
    }
    const linestrings = [];
    for (const linestring1 of this.listLineString) {
      const linestring2 = {
        id: linestring1.id,
        lonlat: (linestring1.feature as any).lonlat,
        name: linestring1.name,
        description: linestring1.description
      }
      linestrings.push(linestring2);
    }
    const polygons = [];
    for (const polygon1 of this.listPolygon) {
      const polygon2 = {
        id: polygon1.id,
        lonlat: (polygon1.feature as any).lonlat,
        name: polygon1.name,
        description: polygon1.description
      }
      polygons.push(polygon2);
    }
    const data = {
      summary: summary,
      points: points,
      linestrings: linestrings,
      polygons: polygons,
    }
    return data;
  }

  resetData(): any {
    this.summarydata = new SummaryData();
    this.datasummarycreated = false;
    this.ismodified = false;
    this.listPoint = [];
    this.listLineString = [];
    this.listPolygon = [];
  }
}
