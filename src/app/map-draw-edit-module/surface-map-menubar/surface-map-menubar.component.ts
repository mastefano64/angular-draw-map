import { Component, Input, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';

import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { MatSelectChange } from '@angular/material/select';

import { GeometryItem } from '../geometry-item';
import { MenuStatus } from '../menustatus';

@Component({
  selector: 'app-surfacemap-menubar',
  templateUrl: './surface-map-menubar.component.html',
  styleUrls: ['./surface-map-menubar.component.scss']
})
export class SurfaceMapMenubarComponent implements OnInit, OnDestroy {
  @Input() ismodified = false;
  @Input() datasummarycreated = false;
  @Input() manustatus = new  MenuStatus();
  @Output() menutoggle = new EventEmitter();
  @Output() loadfestures = new EventEmitter();
  @Output() savefestures = new EventEmitter();
  @Output() menuchanged = new EventEmitter();
  @Output() geometrychange = new EventEmitter<string>();
  @Output() modifymodechange = new EventEmitter<boolean>();
  geometries : GeometryItem[] = [];
  geometry = 'Point';
  modifymode = false;

  constructor() {
    this.geometries.push(new GeometryItem('Point', 'Punto'));
    this.geometries.push(new GeometryItem('LineString', 'Linea'));
    this.geometries.push(new GeometryItem('Polygon', 'Poligono'));
  }

  ngOnInit(): void {

  }

  onTogglePanel(): void {
    this.menutoggle.emit();
  }

  onGeometryChange(event: MatSelectChange): void {
    this.geometrychange.emit(event.value);
  }

  onModeChange(event: MatSlideToggleChange): void {
    this.modifymodechange.emit(event.checked);
  }

  onLoadFeatures(): void {
    this.loadfestures.emit();
  }

  onSelectCreate() : void {
    if (this.datasummarycreated === true) {
      alert('Data summary già esistente!');
      return;
    }
    if (this.manustatus.createenabled === true) {
      return;
    }
    this.manustatus.createenabled = true;
    this.manustatus.editenabled = false;
    this.manustatus.unselectenabled = false;
    this.menuchanged.emit();
  }

  onSelectEdit() : void {
    if (this.datasummarycreated === false) {
      alert('Data summary non esistente!');
      return;
    }
    if (this.manustatus.editenabled === true) {
      return;
    }
    this.manustatus.createenabled = false;
    this.manustatus.editenabled = true;
    this.manustatus.unselectenabled = false;
    this.menuchanged.emit();
  }

  onUnselect() : void {
    if (this.manustatus.unselectenabled === true) {
      return;
    }
    this.geometry = 'Point';
    this.modifymode = false;
    this.manustatus.createenabled = false;
    this.manustatus.editenabled = false;
    this.manustatus.unselectenabled = true;
    this.geometrychange.emit(this.geometry);
    this.modifymodechange.emit(this.modifymode);
    this.menuchanged.emit();
  }

  onSaveFeatures() : void {
    this.savefestures.emit();
  }

  reset() : void {
    this.manustatus.createenabled = false;
    this.manustatus.editenabled = false;
    this.manustatus.unselectenabled = true;
  }

  ngOnDestroy(): void {

  }
}
