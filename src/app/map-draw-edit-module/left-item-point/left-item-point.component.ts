import { Component, Input, Output, EventEmitter, OnInit, OnDestroy  } from '@angular/core';

import { Feature } from 'ol';

import { PropPoint } from '../geometry-template-prop';
import { LonLatPoint } from '../lonlat-point';

@Component({
  selector: 'app-left-item-point',
  templateUrl: './left-item-point.component.html',
  styleUrls: ['./left-item-point.component.scss']
})
export class LeftItemPointComponent implements OnInit, OnDestroy {
  @Input() listPoint: PropPoint[];
  @Output() centerpoint = new EventEmitter<PropPoint>();
  @Output() modifypoint = new EventEmitter<PropPoint>();
  @Output() deletepoint = new EventEmitter<PropPoint>();

  constructor() { }

  ngOnInit(): void {

  }

  getFeaturePointLonLat(item: PropPoint): LonLatPoint {
    return (item.feature as any).lonlat[0];
  }

  onCenterItem(item: PropPoint): void {
    this.centerpoint.emit(item);
  }

  onModifyItem(item: PropPoint): void {
    this.modifypoint.emit(item);
  }

  onDeleteItem(item: PropPoint): void {
    this.deletepoint.emit(item);
  }

  ngOnDestroy(): void {

  }
}
