import Feature from 'ol/Feature';
import Style from 'ol/style/Style';
import Icon from 'ol/style/Icon';
import Circle from 'ol/style/Circle';
import RegularShape from 'ol/style/RegularShape';
import Text from 'ol/style/Text';
import Fill from 'ol/style/Fill';
import Stroke from 'ol/style/Stroke';

// https://openlayers.org/en/latest/examples/regularshape.html

export class FeatureGeometryStyle {
  stylePoint(item: any): Style {
    const style = new Style({
      image: new Circle({
        fill: new Fill({
          color: [0, 0, 255, 0.1],
        }),
        stroke: new Stroke({
          color: [0, 0, 255],
          width: 2.5
        }),
        radius: 6
      })
    });
    return style;
  }

  styleLineString(item: any): Style {
    const style = new Style({
      stroke: new Stroke({
        color: [0, 0, 255],
        width: 2.5
      }),
    });
    return style;
  }

  stylePolygon(item: any): Style {
    const style = new Style({
      fill: new Fill({
        color: [0, 0, 255, 0.1],
      }),
      stroke: new Stroke({
        color: [0, 0, 255],
        width: 2.5
      }),
    });
    return style;
  }

  styleModifyCircle(item: any): Style {
    const style = new Style({
      image: new Circle({
        fill: new Fill({
          color: [255, 0, 0, 0.1],
        }),
        stroke: new Stroke({
          color: [255, 0, 0],
          width: 4.5
        }),
        radius: 6
      })
    })
    return style;
  }

  // ----------------------------------------

  stylePonintOld(item: any): Style {
    const file = 'assets/device-gray.svg';
    const style = new Style({
      image: new Icon({
        anchor: [0.5, 0.5],
        scale: 1.3,
        src: file
      }),
    });
    return style;
  }

  stylePonintSelectedOld(item: any): Style {
    const file = 'assets/device-gray.svg';
    const style = new Style({
      image: new Icon({
        anchor: [0.5, 0.5],
        scale: 1.6,
        src: file
      }),
    });
    return style;
  }

}
