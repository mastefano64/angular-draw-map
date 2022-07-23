import Map from 'ol/Map';
import VectorLayer from "ol/layer/Vector";
import VectorSource from 'ol/source/Vector';
import Select from 'ol/interaction/Select';
import Feature from 'ol/Feature';
import GeometryType from 'ol/geom/GeometryType';
import { Geometry } from 'ol/geom';
import { Collection, Overlay } from 'ol';
import * as olExtent from 'ol/extent';
import * as proj from 'ol/proj';

import { MenuStatus } from './menustatus';
import { Guid } from 'guid-typescript';
import { Coordinate } from 'ol/coordinate';

export class ManagerSelectOverlayLayer {
  map: Map;
  container: any;
  menustatus: MenuStatus;
  layerPoint: VectorLayer;
  layerStringline: VectorLayer;
  layerPolygon: VectorLayer;
  popupFeatureSelected: HTMLElement;
  overlay: Overlay;
  select: Select;
  geometry: string;

  constructor(container: any, config: any) {
    this.container = container;
    this.map = config.map;
    this.menustatus = config.menustatus;
    this.layerPoint = config.layerPoint;
    this.layerStringline = config.layerStringline;
    this.layerPolygon = config.layerPolygon;
    this.popupFeatureSelected = config.popupFeatureSelected;
  }

  init(): void {
    this.overlay = new Overlay({
      element: this.popupFeatureSelected
    });
    this.map.addOverlay(this.overlay);

    this.select = new Select({
      layers: [
        this.layerPoint,
        this.layerStringline,
        this.layerPolygon
      ]
    });
    this.select.on('select', (event: any) => {
      const selected = event.selected[0];
      if (selected) {
        const name = (this.select.getLayer(selected) as any).myid;
        const props = selected.getProperties();
        this.overlay.setPosition(this.createPopup(selected, name, props));
      } else {
        this.overlay.setPosition(undefined);
      }
    })
    this.map.addInteraction(this.select);
  }

  setMenuOption(): void {
    this.overlay.setPosition(undefined);
    if (this.menustatus.createenabled === true || this.menustatus.editenabled === true) {
      this.select.setActive(false);
    } else {
      this.select.setActive(true);
    }
  }

  createPopup(feature: Feature, name: string, props: any): Coordinate {
    let loc = undefined;
    if (name === 'point') {
      const temp = this.getPointTemplPopup(props);
      this.popupFeatureSelected.innerHTML = temp;
    }
    if (name === 'stringline') {
      const temp = this.getStringLineTemplPopup(props);
      this.popupFeatureSelected.innerHTML = temp;
    }
    if (name === 'polygon') {
      const temp = this.getPolygonTemplPopup(props);
      this.popupFeatureSelected.innerHTML = temp;
    }

    const ele = document.getElementById('btnClosePopup');
    if (ele) {
      ele.onclick = () => { this.closePopup() };
    }

    const ext = feature.getGeometry()!.getExtent();
    const center = olExtent.getCenter(ext);
    return center;
  }

  getPointTemplPopup(props: any): string {
    const temp = `
      <div>
       <div>${props.name}</div>
       <div>${props.description}</div>
      <div>
    `;
    return temp;
  }

  getStringLineTemplPopup(props: any): string {
    const temp = `
      <div>
       <div>${props.name}</div>
       <div>${props.description}</div>
      <div>
    `;
    return temp;
  }

  getPolygonTemplPopup(props: any): string {
    const temp = `
      <div>
       <div>${props.name}</div>
       <div>${props.description}</div>
      <div>
    `;
    return temp;
  }

  closePopup(): void {
    this.overlay.setPosition(undefined);
    this.popupFeatureSelected.innerHTML = '';
  }

  createGuid(): string {
    const guid = Guid.create();
    return guid.toString();
  }
}
