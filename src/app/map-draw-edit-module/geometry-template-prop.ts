import { Feature } from "ol";

import { LonLatPoint } from "./lonlat-point";

export class GeometryTemplateProp {

  static createPoint(feature: Feature): PropPoint {
    return new PropPoint(feature);
  }

  static createLineString(feature: Feature): PropLineString {
    return new PropLineString(feature);
  }

  static createPolygon(feature: Feature): PropPolygon {
    return new PropPolygon(feature);
  }

}

// ----------------------

export class SummaryData {
  name: string;
  description: string;

  constructor() { }
}


export class BaseProp {
  id: string;
  feature: Feature;

  constructor(feature: Feature) {
    this.id = feature.getId() as string;
    this.feature = feature;
  }
}

export class PropPoint extends BaseProp {
  name: string;
  description: string;

  constructor(feature: Feature) {
    super(feature);
  }
}

export class PropLineString extends BaseProp {
  name: string;
  description: string;

  constructor(feature: Feature) {
    super(feature);
  }
}

export class PropPolygon extends BaseProp {
  name: string;
  description: string;

  constructor(feature: Feature) {
    super(feature);
  }
}
