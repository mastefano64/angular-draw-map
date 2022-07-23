import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { AppMaterialModule } from '../app.material.module';

import { SurfaceMapContainerComponent } from './surface-map-container/surface-map-container.component';
import { PanelLeftComponent } from './panel-left/panel-left.component';
import { LeftItemPointComponent } from './left-item-point/left-item-point.component';
import { LeftItemLineStringComponent } from './left-item-linestring/left-item-linestring.component';
import { LeftItemPolygonComponent } from './left-item-polygon/left-item-polygon.component';
import { SurfaceMapComponent } from './surface-map/surface-map.component';
import { SurfaceMapMenubarComponent } from './surface-map-menubar/surface-map-menubar.component';
import { DialogLoadFeaturesComponent } from './dialog-load-features/dialog-load-features.component';
import { DialogSaveFeaturesComponent } from './dialog-save-features/dialog-save-features.component';
import { DialogSummaryComponent } from './dialog-summary/dialog-summary.component';
import { DialogPointComponent } from './dialog-point/dialog-point.component';
import { DialogLineStringComponent } from './dialog-linestring/dialog-linestring.component';
import { DialogPolygonComponent } from './dialog-polygon/dialog-polygon.component';

@NgModule({
  declarations: [
    SurfaceMapContainerComponent,
    PanelLeftComponent,
    LeftItemPointComponent,
    LeftItemLineStringComponent,
    LeftItemPolygonComponent,
    SurfaceMapComponent,
    SurfaceMapMenubarComponent,
    DialogLoadFeaturesComponent,
    DialogSaveFeaturesComponent,
    DialogSummaryComponent,
    DialogPointComponent,
    DialogLineStringComponent,
    DialogPolygonComponent

  ],
  imports: [
    CommonModule,
    FormsModule,
    AppMaterialModule,
  ],
  exports: [
    SurfaceMapContainerComponent,
    PanelLeftComponent,
    LeftItemPointComponent,
    LeftItemLineStringComponent,
    LeftItemPolygonComponent,
    SurfaceMapComponent,
    SurfaceMapMenubarComponent,
    DialogLoadFeaturesComponent,
    DialogSummaryComponent,
    DialogPointComponent,
    DialogLineStringComponent,
    DialogPolygonComponent
  ],
  providers: []
})
export class MapDrawEditModule { }
