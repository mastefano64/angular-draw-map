import Map from 'ol/Map';
import VectorLayer from "ol/layer/Vector";
import VectorSource from 'ol/source/Vector';
import Modify from 'ol/interaction/Modify';
import Draw from 'ol/interaction/Draw';
import Snap from 'ol/interaction/Snap';
import Feature from 'ol/Feature';
import GeometryType from 'ol/geom/GeometryType';
import { Geometry } from 'ol/geom';
import { Collection } from 'ol';

import { MenuStatus } from './menustatus';
import { FeatureGeometryStyle } from './feature-geometry-style';
import { Guid } from 'guid-typescript';

export class ManagerDrawModifyLayer  {
  map: Map;
  container: any;
  menustatus: MenuStatus;
  layerPoint: VectorLayer;
  layerStringline: VectorLayer;
  layerPolygon: VectorLayer;
  style: FeatureGeometryStyle;
  geometry: string;
  modifymode: boolean;
  currdraw: Feature | null;
  modify1: Modify;
  modify2: Modify;
  modify3: Modify;
  draw1: Draw;
  draw2: Draw;
  draw3: Draw;
  snap1: Snap;
  snap2: Snap;
  snap3: Snap;

  constructor(container: any, config: any) {
    this.container = container;
    this.map = config.map;
    this.menustatus = config.menustatus;
    this.layerPoint = config.layerPoint;
    this.layerStringline = config.layerStringline;
    this.layerPolygon = config.layerPolygon;
    this.style = new FeatureGeometryStyle();
    this.geometry = 'Point';
    this.modifymode = false;
    this.currdraw = null;
  }

  init(): void {
    this.modify1 = new Modify({
      source: this.layerPoint.getSource(),
      style: this.style.styleModifyCircle,
      pixelTolerance: 8
    });
    this.modify1.on('modifyend', event => {
      var feature = event.features;
      this.onMapModifyend(feature);
    });
    this.modify1.setActive(false);

    this.modify2 = new Modify({
      source: this.layerStringline.getSource(),
      style: this.style.styleModifyCircle,
      pixelTolerance: 8
    });
    this.modify2.on('modifyend', event => {
      var feature = event.features;
      this.onMapModifyend(feature);
    });
    this.modify2.setActive(false);

    this.modify3 = new Modify({
      source: this.layerPolygon.getSource(),
      style: this.style.styleModifyCircle,
      pixelTolerance: 8
    });
    this.modify3.on('modifyend', event => {
      var feature = event.features;
      this.onMapModifyend(feature);
    });
    this.modify3.setActive(false);

    // -------------------------

    this.draw1 = new Draw({
      source: this.layerPoint.getSource(),
      type: GeometryType.POINT
    });
    this.draw1.on('drawstart', event => {
      var feature = event.feature;
      this.currdraw = feature;
    });
    this.draw1.on('drawend', event => {
      var feature = event.feature;
      this.onMapDrawend(feature);
      this.currdraw = null;
    });
    this.draw1.setActive(false);

    this.draw2 = new Draw({
      source: this.layerStringline.getSource(),
      type: GeometryType.LINE_STRING
    });
    this.draw2.on('drawstart', event => {
      var feature = event.feature;
      this.currdraw = feature;
    });
    this.draw2.on('drawend', event => {
      var feature = event.feature;
      this.onMapDrawend(feature);
      this.currdraw = null;
    });
    this.draw2.setActive(false);

    this.draw3 = new Draw({
      source: this.layerPolygon.getSource(),
      type: GeometryType.POLYGON
    });
    this.draw2.on('drawstart', event => {
      var feature = event.feature;
      this.currdraw = feature;
    });
    this.draw3.on('drawend', event => {
      var feature = event.feature;
      this.onMapDrawend(feature);
      this.currdraw = null;
    });
    this.draw3.setActive(false);

    // -------------------------

    this.snap1 = new Snap({
      source: this.layerPoint.getSource(),
    });
    this.snap1.setActive(false);

    this.snap2 = new Snap({
      source: this.layerStringline.getSource(),
    });
    this.snap2.setActive(false);

    this.snap3 = new Snap({
      source: this.layerPolygon.getSource(),
    });
    this.snap3.setActive(false);

    this.map.addInteraction(this.modify1);
    this.map.addInteraction(this.modify2);
    this.map.addInteraction(this.modify3);
    this.map.addInteraction(this.draw1);
    this.map.addInteraction(this.draw2);
    this.map.addInteraction(this.draw3);
    this.map.addInteraction(this.snap1);
    this.map.addInteraction(this.snap2);
    this.map.addInteraction(this.snap3);
  }

  setDefaultGeometry(value: string): void {
    this.geometry = value;
  }

  setMenuOption(): void {
    this.setActiveMode1();
  }

  setGeometry(value: string): void {
    this.geometry = value;
    this.setActiveMode1();
  }

  setModifymode(value: boolean): void {
    this.modifymode = value;
    this.setActiveMode1();
  }

  setActiveMode1(): void {
    if (this.menustatus.createenabled === true || this.menustatus.editenabled === true) {
      if (this.modifymode === false) {
        if (this.geometry === 'Point') {
          // draw
          this.modify1.setActive(false);
          this.modify2.setActive(false);
          this.modify3.setActive(false);
          this.draw1.setActive(true);
          this.draw2.setActive(false);
          this.draw3.setActive(false);
          this.snap1.setActive(false);
          this.snap2.setActive(false);
          this.snap3.setActive(false);
        }
        if (this.geometry === 'LineString') {
          // draw
          this.modify1.setActive(false);
          this.modify2.setActive(false);
          this.modify3.setActive(false);
          this.draw1.setActive(false);
          this.draw2.setActive(true);
          this.draw3.setActive(false);
          this.snap1.setActive(false);
          this.snap2.setActive(false);
          this.snap3.setActive(false);
        }
        if (this.geometry === 'Polygon') {
          // draw
          this.modify1.setActive(false);
          this.modify2.setActive(false);
          this.modify3.setActive(false);
          this.draw1.setActive(false);
          this.draw2.setActive(false);
          this.draw3.setActive(true);
          this.snap1.setActive(false);
          this.snap2.setActive(false);
          this.snap3.setActive(false);
        }
      } else {
        if (this.geometry === 'Point') {
          // modify
          this.modify1.setActive(true);
          this.modify2.setActive(false);
          this.modify3.setActive(false);
          this.draw1.setActive(false);
          this.draw2.setActive(false);
          this.draw3.setActive(false);
          this.snap1.setActive(true);
          this.snap2.setActive(false);
          this.snap3.setActive(false);
        }
        if (this.geometry === 'LineString') {
          // modify
          this.modify1.setActive(false);
          this.modify2.setActive(true);
          this.modify3.setActive(false);
          this.draw1.setActive(false);
          this.draw2.setActive(false);
          this.draw3.setActive(false);
          this.snap1.setActive(false);
          this.snap2.setActive(true);
          this.snap3.setActive(false);
        }
        if (this.geometry === 'Polygon') {
          // modify
          this.modify1.setActive(false);
          this.modify2.setActive(false);
          this.modify3.setActive(true);
          this.draw1.setActive(false);
          this.draw2.setActive(false);
          this.draw3.setActive(false);
          this.snap1.setActive(false);
          this.snap2.setActive(false);
          this.snap3.setActive(true);
        }
      }
    } else {
      // operation-none
      this.modify1.setActive(false);
      this.modify2.setActive(false);
      this.modify3.setActive(false);
      this.draw1.setActive(false);
      this.draw2.setActive(false);
      this.draw3.setActive(false);
      this.snap1.setActive(false);
      this.snap2.setActive(false);
      this.snap3.setActive(false);
    }
  }

  // setActiveMode2(): void {
  //   if (this.menustatus.createenabled === true || this.menustatus.editenabled === true) {
  //     if (this.geometry === 'Point') {
  //       this.modify1.setActive(true);
  //       this.modify2.setActive(false);
  //       this.modify3.setActive(false);
  //       this.draw1.setActive(true);
  //       this.draw2.setActive(false);
  //       this.draw3.setActive(false);
  //       this.snap1.setActive(true);
  //       this.snap2.setActive(false);
  //       this.snap3.setActive(false);
  //     }
  //     if (this.geometry === 'LineString') {
  //       this.modify1.setActive(false);
  //       this.modify2.setActive(true);
  //       this.modify3.setActive(false);
  //       this.draw1.setActive(false);
  //       this.draw2.setActive(true);
  //       this.draw3.setActive(false);
  //       this.snap1.setActive(false);
  //       this.snap2.setActive(true);
  //       this.snap3.setActive(false);
  //     }
  //     if (this.geometry === 'Polygon') {
  //       this.modify1.setActive(false);
  //       this.modify2.setActive(false);
  //       this.modify3.setActive(true);
  //       this.draw1.setActive(false);
  //       this.draw2.setActive(false);
  //       this.draw3.setActive(true);
  //       this.snap1.setActive(false);
  //       this.snap2.setActive(false);
  //       this.snap3.setActive(true);
  //     }
  //   } else {
  //     this.modify1.setActive(false);
  //     this.modify2.setActive(false);
  //     this.modify3.setActive(false);
  //     this.draw1.setActive(false);
  //     this.draw2.setActive(false);
  //     this.draw3.setActive(false);
  //     this.snap1.setActive(false);
  //     this.snap2.setActive(false);
  //     this.snap3.setActive(false);
  //   }
  // }

  onMapDrawend(feature: Feature): void {
    const guid = this.createGuid();
    feature.setId(guid);
    this.container.onMapDrawend(feature);
  }

  onMapModifyend(features: Collection<Feature>): void {
    this.container.onMapModifyend(features);
  }

  clearDrawingFeature(): void {
    if (this.currdraw === null) {
      return;
    }
    const feature = this.currdraw;
    const g = feature.getGeometry();
    const type = g!.getType();
    if (type === GeometryType.POINT) {
     //(this.draw1 as any).abortDrawing_();
    }
    if (type === GeometryType.LINE_STRING) {
      (this.draw2 as any).abortDrawing_();
    }
    if (type === GeometryType.POLYGON) {
      (this.draw3 as any).abortDrawing_();
    }
  }

  createGuid(): string {
    const guid = Guid.create();
    return guid.toString();
  }
}
