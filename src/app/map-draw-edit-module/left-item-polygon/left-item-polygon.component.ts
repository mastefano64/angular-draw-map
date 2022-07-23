import { Component, Input, Output, EventEmitter, OnInit, OnDestroy  } from '@angular/core';

import { Feature } from 'ol';

import { PropPolygon } from '../geometry-template-prop';
import { LonLatPoint } from '../lonlat-point';

@Component({
  selector: 'app-left-item-polygon',
  templateUrl: './left-item-polygon.component.html',
  styleUrls: ['./left-item-polygon.component.scss']
})
export class LeftItemPolygonComponent implements OnInit, OnDestroy {
  @Input() listPolygon: PropPolygon[];
  @Output() centerpolygon = new EventEmitter<PropPolygon>();
  @Output() modifypolygon = new EventEmitter<PropPolygon>();
  @Output() deletepolygon = new EventEmitter<PropPolygon>();

  constructor() { }

  ngOnInit(): void {

  }

  onCenterItem(item: PropPolygon): void {
    this.centerpolygon.emit(item);
  }

  onModifyItem(item: PropPolygon): void {
    this.modifypolygon.emit(item);
  }

  onDeleteItem(item: PropPolygon): void {
    this.deletepolygon.emit(item);
  }

  ngOnDestroy(): void {

  }
}
