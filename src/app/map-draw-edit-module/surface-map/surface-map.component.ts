import { Component, HostListener, ViewChild, Output, EventEmitter, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { SurfaceMapMenubarComponent } from '../surface-map-menubar/surface-map-menubar.component';
import { MenuStatus } from '../menustatus';
import { ManagerSelectOverlayLayer } from '../manager-select-overlay-layer';
import { ManagerDrawModifyLayer } from '../manager-draw-modify-layer';
import { FeatureMetadata } from '../feature-metadata';
import { GeometryTemplateProp } from '../geometry-template-prop';
import { LonLatPoint } from '../lonlat-point';
import { SurfaceMapService } from '../_service/surface-map.service';
import { FeatureGeometryStyle } from '../feature-geometry-style';

// @types/ol is 4.6.2 - OpenLayers 4.6.2
// import * as proj from 'ol/proj';
// https://stackoverflow.com/questions/68473297/how-do-i-fix-typescript-errors-in-openlayers-6-6-1

// https://gis.stackexchange.com/questions/132480/get-center-of-geometry-in-openlayers-3

// https://stackoverflow.com/questions/32217753/openlayers-3-map-contextmenu
// https://github.com/jonataswalker/ol-contextmenu

import Map from 'ol/Map';
import OSM from 'ol/source/Osm';
import TileLayer from 'ol/layer/Tile';
import Cluster from 'ol/source/Cluster';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import Feature from 'ol/Feature';

import Modify from 'ol/interaction/Modify';
import Draw from 'ol/interaction/Draw';
import GeometryType from 'ol/geom/GeometryType';
import Style from 'ol/style/Style';
import Icon from 'ol/style/Icon';
import Circle from 'ol/style/Circle';
import RegularShape from 'ol/style/RegularShape';
import Text from 'ol/style/Text';
import Fill from 'ol/style/Fill';
import Stroke from 'ol/style/Stroke';
import Point from 'ol/geom/Point';
import LineString from 'ol/geom/LineString';
import Polygon from 'ol/geom/Polygon';
import Select from 'ol/interaction/Select';
import Overlay from 'ol/Overlay';
import View from 'ol/View';
import { Coordinate } from 'ol/coordinate';
import { Geometry } from 'ol/geom';
import { Collection } from 'ol';
import * as olExtent from 'ol/extent';
import * as proj from 'ol/proj';

// https://www.npmjs.com/package/ol-contextmenu
// https://stackoverflow.com/questions/68677496/why-d-ts-file-module-declaration-doesnt-work-in-angular-app

import ContextMenu from 'ol-contextmenu';

// const msg = { type: this.overlay, data: data};
// this.eventbus.sendMessage('DrawerPanel:ShowOverlayPanel', msg);

// https://openlayers.org/en/latest/examples/cluster.html
// https://stackoverflow.com/questions/26913549/how-to-select-all-features-in-cluster-layer-in-openlayers-3
// https://stackoverflow.com/questions/26544865/getting-features-from-clusters-in-openlayers
// https://github.com/openlayers/openlayers/issues/1988

// https://stackoverflow.com/questions/30888181/openlayers-3-simple-linestring-example
// https://gis.stackexchange.com/questions/298193/add-a-polygon-programmatically-in-openlayers-3

// // https://stackoverflow.com/questions/59453895/add-keyboard-event-to-openlayers-map

// @ViewChild('foo', { static: true }) foo: ElementRef;
// @ViewChild('menubar1') menubar1: ElementRef -- TemplateRef;
// @ViewChild('menubar1') menubar1:  SurfaceMapMenuComponent;
// @ViewChild(SurfaceMapMenuComponent) bmenu: SurfaceMapMenuComponentr;
// @ViewChild('container', { read: ViewContainerRef }) vcr1;

// All'oggetto Feature è stato atrribuito un guid ed è stata agginta una proprietà LonLat con le
// coordinate decimali. All'oggetto properties oltre alle proprietà è stato aggiunto l'id della
// Feature ed una referenza della Feature stessa. Nel servizio viene passata solo la proprietà.

@Component({
  selector: 'app-surface-map',
  templateUrl: './surface-map.component.html',
  styleUrls: ['./surface-map.component.scss']
})
export class SurfaceMapComponent implements OnInit, AfterViewInit, OnDestroy {
  // @ViewChild('menubar1') menubar1: SurfaceMapMenubarComponent;
  @ViewChild(SurfaceMapMenubarComponent) bmenu: SurfaceMapMenubarComponent;
  @Output() loadfeatures = new EventEmitter();
  @Output() savefeatures = new EventEmitter<any>();
  map!: Map;
  hidepanel = false;
  menustatus: MenuStatus;
  popupFeatureSelected: HTMLElement|undefined;
  layerselectmanager: ManagerSelectOverlayLayer;
  layerdrawmanager: ManagerDrawModifyLayer;
  layerPoint: VectorLayer;
  layerStringline: VectorLayer;
  layerPolygon: VectorLayer;
  style: FeatureGeometryStyle;

  destroy: Subject<boolean> = new Subject<boolean>();

  constructor(public mapservice: SurfaceMapService) {
    this.menustatus = new MenuStatus();
    this.style = new FeatureGeometryStyle();
  }

  ngOnInit(): void {
    this.mapservice.toload$
    .pipe(takeUntil(this.destroy)).subscribe(response => {
      this.loadPoiData(response);
    });

    this.mapservice.tomaps$
      .pipe(takeUntil(this.destroy)).subscribe(response => {
        if (response.cmd === 'center') {
          this.centerFeature(response.payload.feature);
        }
        if (response.cmd === 'delete') {
          this.deleteFeature(response.payload.feature);
        }
      });
  }

  // ---

  ngAfterViewInit(): void {
    const ele = document.getElementById('popupLayerSelected');
    this.popupFeatureSelected = (ele) ? ele : undefined;

    this.map = new Map({
      target: 'map',
      layers: [
        new TileLayer({
          source: new OSM()
        })
      ],
      view: new View({
        center: proj.fromLonLat([7.516667, 45.069967]),
        zoom: 12
      })
    });

    this.createLayerMap();
   // this.createContextMenu();

    this.map.on('click', (evt) => {
      //
      // ???
      //
    });

    document.addEventListener('keydown', this.callbackkeyboard );

    setTimeout(() => {
      this.map.updateSize();
    }, 1000);
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any): void {
    setTimeout(() => {
      this.map.updateSize();
    }, 150);
  }

  callbackkeyboard = (evt: any) => {
    if (evt.code === 'Delete') {
      if (this.menustatus.unselectenabled === false) {
        this.layerdrawmanager.clearDrawingFeature();
      }
    }
  }

  //

  createLayerMap(): void {
    // this.layerPosition = this.createLayer('position', 1300);
    // this.map.addLayer(this.layerPosition);

    this.layerPoint = this.createLayer('point', 1400);
    this.layerPoint.setStyle(this.style.stylePoint);
    this.map.addLayer(this.layerPoint);


    this.layerStringline = this.createLayer('stringline', 1200);
    this.layerStringline.setStyle(this.style.styleLineString);
    this.map.addLayer(this.layerStringline);

    this.layerPolygon = this.createLayer('poligon', 1000);
    this.layerPolygon.setStyle(this.style.stylePolygon);
    this.map.addLayer(this.layerPolygon);

    const layerConfig1 = {
      map: this.map,
      menustatus: this.menustatus,
      layerPoint: this.layerPoint,
      layerStringline: this.layerStringline,
      layerPolygon: this.layerPolygon,
      popupFeatureSelected: this.popupFeatureSelected
    };

    this.layerselectmanager = new ManagerSelectOverlayLayer(this, layerConfig1);
    this.layerselectmanager.init();

    const layerConfig2 = {
      map: this.map,
      menustatus: this.menustatus,
      layerPoint: this.layerPoint,
      layerStringline: this.layerStringline,
      layerPolygon: this.layerPolygon
    };

    this.layerdrawmanager = new ManagerDrawModifyLayer(this, layerConfig2);
    this.layerdrawmanager.init();
  }

  createContextMenu(): void {
    // var contextmenu = new ContextMenu();
    const contextmenu = new ContextMenu({
      width: 170,
      defaultItems: false, // defaultItems are Zoom In/Zoom Out
      // items: [
      //   {
      //     text: 'Center map here 1',
      //     classname: 'some-style-class', // add some CSS rules
      //     callback: this.marker
      //   },
      //   {
      //     text: 'Center map here 2',
      //     classname: 'some-style-class', // add some CSS rules
      //     callback: this.marker
      //   }
      // ]
    });
    contextmenu.on('open', () => {
      if (this.menustatus.createenabled === true ||
         this.menustatus.editenabled === true ) {
        const item = {
          text: 'Center map here 1',
          classname: 'some-style-class',
          callback: this.marker
        }
        contextmenu.push(item);
      }
    });
    this.map.addControl(contextmenu);
  }

  marker(): void {
    const b = 1;
  }

  //

  onMenuToggle(): void {
    this.hidepanel = !this.hidepanel;
    setTimeout(() => {
      this.map.updateSize();
    }, 150);
  }

  onLoadFeatures(): void {
    this.loadfeatures.emit();
  }

  loadPoiData(json: string): void {
    this.layerPoint.getSource().clear();
    this.layerStringline.getSource().clear();
    this.layerPolygon.getSource().clear();
    this.mapservice.resetData();

    const data = JSON.parse(json);
    this.mapservice.datasummarycreated = true;
    this.mapservice.summarydata = { ...data.summary };

    const points = [];
    for (const point of data.points) {
      const f = this.createPoint(point);
      this.mapservice.insertGeometry1(f);
      points.push(f);
    }
    this.layerPoint.getSource().addFeatures(points);

    const linestrings = [];
    for (const linestring of data.linestrings) {
      const f = this.createLineString(linestring);
      this.mapservice.insertGeometry1(f);
      linestrings.push(f);
    }
    this.layerStringline.getSource().addFeatures(linestrings);

    const polygons = [];
    for (const polygon of data.polygons) {
      const f = this.createPolygon(polygon);
      this.mapservice.insertGeometry1(f);
      polygons.push(f);
    }
    this.layerPolygon.getSource().addFeatures(polygons);
  }

  createPoint(point: any): Feature {
    const lonlat = point.lonlat[0] as LonLatPoint;
    const feature = new Feature(new Point([lonlat.lon, lonlat.lat]));
    feature.getGeometry()!.transform('EPSG:4326', 'EPSG:3857');
    const g = feature.getGeometry();
    feature.setId(point.id);
    (feature as any).lonlat = point.lonlat;
    const prop = {
      id: point.id,
      feature: feature,
      name: point.name,
      description: point.description
    }
    feature.setProperties(prop);
    return feature;
  }

  createLineString(point: any): Feature {
    const lonlat = this.convLonLatToCoordinate(point.lonlat, false);
    const feature = new Feature(new LineString(lonlat));
    feature.getGeometry()!.transform('EPSG:4326', 'EPSG:3857');
    const g = feature.getGeometry();
    feature.setId(point.id);
    (feature as any).lonlat = point.lonlat;
    const prop = {
      id: point.id,
      feature: feature,
      name: point.name,
      description: point.description
    }
    feature.setProperties(prop);
    return feature;
  }

  createPolygon(point: any): Feature {
    const lonlat = this.convLonLatToCoordinate(point.lonlat, true);
    const feature = new Feature(new Polygon(lonlat));
    feature.getGeometry()!.transform('EPSG:4326', 'EPSG:3857');
    const g = feature.getGeometry();
    feature.setId(point.id);
    (feature as any).lonlat = point.lonlat;
    const prop = {
      id: point.id,
      feature: feature,
      name: point.name,
      description: point.description
    }
    feature.setProperties(prop);
    return feature;
  }

  onChangeGeometry(value: string): void {
    this.layerdrawmanager.setGeometry(value);
  }

  onChangeModifymode(value: boolean): void {
    this.layerdrawmanager.setModifymode(value);
  }

  onChangeMenu(): void {
    if (this.menustatus.createenabled === true) {
      this.mapservice.openDialogSummary(true);
    }
    this.layerselectmanager.setMenuOption();
    this.layerdrawmanager.setMenuOption();
  }

  onMapDrawend(feature: Feature): void {
    const metadata = this.createFeatureMetadata(feature);
    this.mapservice.insertGeometry2(metadata);
    this.mapservice.ismodified = true;
  }

  onMapModifyend(features: Collection<Feature>): void {
    for (const feature of features.getArray()) {
      this.updateFeatureMetadata(feature);
    }
    this.mapservice.ismodified = true;
  }

  createFeatureMetadata(feature: Feature): FeatureMetadata {
    let lonlat: LonLatPoint[] = []; let prop: any;
    const g = feature.getGeometry();
    const type = g!.getType();
    const coords = this.getCoordFromFeature(feature);

    if (type === GeometryType.POINT) {
      const co = this.convCoordMeterToGrade(coords);
      lonlat.push(new LonLatPoint(co[0], co[1]));
      prop = GeometryTemplateProp.createPoint(feature);

    }

    if (type === GeometryType.LINE_STRING) {
      const result = coords as any;
      for (const c of result) {
        const co = this.convCoordMeterToGrade(c);
        lonlat.push(new LonLatPoint(co[0], co[1]));
      }
      prop = GeometryTemplateProp.createLineString(feature);
    }

    if (type === GeometryType.POLYGON) {
      const result = coords as any;
      for (const c of result[0]) {
        const co = this.convCoordMeterToGrade(c);
        lonlat.push(new LonLatPoint(co[0], co[1]));
      }
      prop = GeometryTemplateProp.createPolygon(feature);
    }

    (feature as any).lonlat = lonlat; // *
    feature.setProperties(prop);
    const metadata = new FeatureMetadata(type, coords, lonlat, prop);
    return metadata;
  }

  updateFeatureMetadata(feature: Feature): void {
    let lonlat: LonLatPoint[] = [];
    const g = feature.getGeometry();
    const type = g!.getType();
    const coords = this.getCoordFromFeature(feature);

    if (type === GeometryType.POINT) {
      const co = this.convCoordMeterToGrade(coords);
      lonlat.push(new LonLatPoint(co[0], co[1]));
    }

    if (type === GeometryType.LINE_STRING) {
      const result = coords as any;
      for (const c of result) {
        const co = this.convCoordMeterToGrade(c);
        lonlat.push(new LonLatPoint(co[0], co[1]));
      }
    }

    if (type === GeometryType.POLYGON) {
      const result = coords as any;
      for (const c of result[0]) {
        const co = this.convCoordMeterToGrade(c);
        lonlat.push(new LonLatPoint(co[0], co[1]));
      }
    }

    (feature as any).lonlat = lonlat; // *
  }

  deleteFeature(feature: Feature): void {
    const g = feature.getGeometry();
    const type = g!.getType();

    if (type === GeometryType.POINT) {
      this.layerPoint.getSource().removeFeature(feature);
    }

    if (type === GeometryType.LINE_STRING) {
      this.layerStringline.getSource().removeFeature(feature);
    }

    if (type === GeometryType.POLYGON) {
      this.layerPolygon.getSource().removeFeature(feature);
    }
  }

  onSaveFeatures(): void {
    const data = this.mapservice.createDataToSave();
    this.savefeatures.emit(data);
  }

  //

  centerMap(lat: number, lon: number): void {
    const coord = proj.fromLonLat([lon, lat]);
    this.map.getView().setCenter(coord);
  }

  zoomMap(zoom: number): void {
    this.map.getView().setZoom(zoom);
  }

  centerFeature(feature: Feature): void {
    const ext = feature.getGeometry()!.getExtent();
    const center = olExtent.getCenter(ext);
    this.map.getView().setCenter(center);
  }

  createLayer(name: string, zindex?: number): VectorLayer {
    const layer = new VectorLayer({
      source: new VectorSource()
    });
    (layer as any).myid = name;
    if (zindex) {
      layer.setZIndex(zindex);
    }
    return layer;
  }

  convLonLatToCoordinate(lonlat: LonLatPoint[], ispolygon: boolean): any {
    const coord = [];
    for (const p of lonlat) {
      coord.push([p.lon, p.lat]);
    }
    if (ispolygon == true)
      return [ coord ];
   else return coord;
  }

  convCoordMeterToGrade(coord: any, projfrom = 'EPSG:4326', projto = 'EPSG:3857'): Coordinate {
    return proj.transform(coord, projto, projfrom);
  }

  convCoordGradeToMeter(coord: any, projfrom = 'EPSG:4326', projto = 'EPSG:3857'): Coordinate {
    return proj.transform(coord, projfrom, projto);
  }

  centerOnFeature(feature: Feature): void {
    const coord1 = this.getCoordFromFeature(feature);
    const coord2 = this.convCoordMeterToGrade(coord1);
    this.centerMap(coord2[1], coord2[0]);
  }

  getCoordFromFeature(feature: Feature): Coordinate {
    const geom = feature.getGeometry() as any;
    const coord = geom.getCoordinates();
    return coord;
  }

  ngOnDestroy(): void {
    this.destroy.next(true);
    this.destroy.unsubscribe();
    document.removeEventListener('keydown', this.callbackkeyboard );
    document.getElementById('popupContainerLayerSelected')!.outerHTML = '';
    document.getElementById('map')!.innerHTML = '';
  }
}
