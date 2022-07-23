import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { Feature } from 'ol';

import { SurfaceMapService } from '../_service/surface-map.service';
import {  PropPoint, PropLineString, PropPolygon } from '../geometry-template-prop';
import { LonLatPoint } from '../lonlat-point';

@Component({
  selector: 'app-panel-left',
  templateUrl: './panel-left.component.html',
  styleUrls: ['./panel-left.component.scss']
})
export class PanelLeftComponent implements OnInit, AfterViewInit, OnDestroy {
  listPoint: PropPoint[];
  listLineString: PropLineString[];
  listPolygon: PropPolygon[];
  loaded = false;
  tabindex = 0;

  destroy: Subject<boolean> = new Subject<boolean>();

  constructor(private mapservice: SurfaceMapService) { }

  ngOnInit(): void {
    this.mapservice.tolistPoint$
      .pipe(takeUntil(this.destroy)).subscribe(response => {
        this.listPoint = response.list;
        if (response.chagetabs === true && this.loaded === true) {
          this.tabindex = 0;
        }
    });
    this.mapservice.tolistLineString$
      .pipe(takeUntil(this.destroy)).subscribe(response => {
        this.listLineString = response.list;
        if (response.chagetabs === true && this.loaded === true) {
          this.tabindex = 1;
        }
    });
    this.mapservice.tolistPolygon$
      .pipe(takeUntil(this.destroy)).subscribe(response => {
        this.listPolygon = response.list;
        if (response.chagetabs === true && this.loaded === true) {
          this.tabindex = 2;
        }
    });
  }

  ngAfterViewInit(): void {
    this.loaded = true;
  }

  // -----------

  get datasummarycreated(): boolean {
    return this.mapservice.datasummarycreated;
  }

  onOpenDialogSummary(): void {
    this.mapservice.openDialogSummary(false);
  }

  onCenterPointItem(item: PropPoint): void {
    this.mapservice.centerFeature(item);
  }

  onModifyPointItem(item: PropPoint): void {
    this.mapservice.showModalPoint(item);
  }

  onDeletePointItem(item: PropPoint): void {
    this.mapservice.deleteFeature(item);
  }

  // -----------

  onCenterLineStringItem(item: PropPoint): void {
    this.mapservice.centerFeature(item);
  }

  onModifyLineStringItem(item: PropLineString): void {
    this.mapservice.showModalLineString(item);
  }

  onDeleteLineStringItem(item: PropLineString): void {
    this.mapservice.deleteFeature(item);
  }

  // -----------

  onCenterPolygonItem(item: PropPoint): void {
    this.mapservice.centerFeature(item);
  }

  onModifyPolygonItem(item: PropPolygon): void {
    this.mapservice.showModalPolygon(item);
  }

  onDeletePolygonItem(item: PropPolygon): void {
    this.mapservice.deleteFeature(item);
  }

  // -----------

  ngOnDestroy(): void {
    this.destroy.next(true);
    this.destroy.unsubscribe();
  }
}
