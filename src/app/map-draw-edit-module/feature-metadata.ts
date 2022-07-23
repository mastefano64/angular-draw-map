import { Coordinate } from "ol/coordinate";
import GeometryType from "ol/geom/GeometryType";

import { BaseProp } from "./geometry-template-prop";
import { LonLatPoint } from "./lonlat-point";

export class FeatureMetadata {

  constructor(public geom: GeometryType, public coord: Coordinate, public LonLatPoint:
           LonLatPoint[], public prop: BaseProp, public data?: any) { }

}
