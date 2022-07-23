import { Component, Input, Output, EventEmitter, OnInit, OnDestroy  } from '@angular/core';

import { Feature } from 'ol';

import { PropLineString } from '../geometry-template-prop';
import { LonLatPoint } from '../lonlat-point';

@Component({
  selector: 'app-left-item-linestring',
  templateUrl: './left-item-linestring.component.html',
  styleUrls: ['./left-item-linestring.component.scss']
})
export class LeftItemLineStringComponent implements OnInit, OnDestroy {
  @Input() listLineString: PropLineString[];
  @Output() centerlinestring = new EventEmitter<PropLineString>();
  @Output() modifylinestring = new EventEmitter<PropLineString>();
  @Output() deletelinestring = new EventEmitter<PropLineString>();

  constructor() { }

  ngOnInit(): void {

  }

  onCenterItem(item: PropLineString): void {
    this.centerlinestring.emit(item);
  }

  onModifyItem(item: PropLineString): void {
    this.modifylinestring.emit(item);
  }

  onDeleteItem(item: PropLineString): void {
    this.deletelinestring.emit(item);
  }

  ngOnDestroy(): void {

  }
}
