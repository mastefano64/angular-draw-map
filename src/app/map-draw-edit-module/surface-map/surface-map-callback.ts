import Feature from 'ol/Feature';

export interface ISurfaceMapCallBack {
  onMapDrawend(feature: Feature): void;

  onMapModifyend(feature: Feature): void;
}
