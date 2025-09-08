import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  NgbToastModule, NgbProgressbarModule,
  NgbAlertModule,
  NgbCarouselModule,
  NgbModalModule,
  NgbTooltipModule,
  NgbPopoverModule,
  NgbPaginationModule,
  NgbNavModule,
  NgbAccordionModule,
  NgbCollapseModule
} from '@ng-bootstrap/ng-bootstrap';
import { Select2Module } from 'ng-select2-component';
import { FlatpickrModule } from 'angularx-flatpickr';
import { CountUpModule } from 'ngx-countup';
import { NgApexchartsModule } from 'ng-apexcharts';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { SimplebarAngularModule } from 'simplebar-angular';
import { DatePipe } from '@angular/common';
// Swiper Slider
import { SlickCarouselModule } from 'ngx-slick-carousel';

import { LightboxModule } from 'ngx-lightbox';

// Load Icons
import { defineElement } from "@lordicon/element";
import lottie from 'lottie-web';

// Feather Icon
import { FeatherModule } from 'angular-feather';
import { allIcons } from 'angular-feather/icons';

// Pages Routing
import { PagesRoutingModule } from "./pages-routing.module";
import { StarterComponent } from './starter/starter.component';
import { UserComponent } from './user/user.component';
import { UserDetailComponent } from './user/detail-user/user-detail.component';
import { UserConfigComponent } from './user/config-user/user-config.component';
import { AccessDeniedComponent } from './access-denied/access-denied.component';
import { VarietyComponent } from './variety/variable.component';
import { DetailVarietyComponent } from './variety/detail-variety/detail-variety.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { WidgetModule } from 'src/app/shared/widget/widget.module';
import { QRCodeComponent } from 'angularx-qrcode';
import { NgxMasonryModule } from 'ngx-masonry';
import { NgSelectModule } from '@ng-select/ng-select';
import { UiSwitchModule } from 'ngx-ui-switch';
import { ColorPickerModule } from 'ngx-color-picker';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { CdkStepperModule } from '@angular/cdk/stepper';
import { NgStepperModule } from 'angular-ng-stepper';
import { NgxSliderModule } from 'ngx-slider-v2';
import { NgxMaskDirective, NgxMaskPipe } from 'ngx-mask';
import { DropzoneModule } from 'ngx-dropzone-wrapper';
import { DataTablesModule } from 'angular-datatables';
import { FullCalendarModule } from '@fullcalendar/angular';
import { NgxExtendedPdfViewerModule, pdfDefaultOptions } from 'ngx-extended-pdf-viewer';
import { DispersionChartCornComponent } from './variety/dispersion-chart-corn/dispersion-chart-corn.component';



@NgModule({
  declarations: [
    StarterComponent,
    UserComponent,
    UserDetailComponent,
    UserConfigComponent,
    AccessDeniedComponent,
    VarietyComponent,
    DetailVarietyComponent,
    DispersionChartCornComponent

  ],
  imports: [
    CommonModule,
    FormsModule,
    NgbToastModule,
    NgbProgressbarModule,
    FlatpickrModule.forRoot(),
    CountUpModule,
    FeatherModule.pick(allIcons),
    NgApexchartsModule,
    LeafletModule,
    NgbDropdownModule,
    SimplebarAngularModule,
    PagesRoutingModule,
    SharedModule,
    WidgetModule,
    SlickCarouselModule,
    LightboxModule,
    FullCalendarModule,
    Select2Module,
    QRCodeComponent,
    /*IU*/
    NgbAlertModule,
    NgbCarouselModule,
    NgbModalModule,
    NgbTooltipModule,
    NgbPopoverModule,
    NgbPaginationModule,
    NgbNavModule,
    NgbAccordionModule,
    NgbCollapseModule,
    NgbToastModule,
    NgxMasonryModule,
    NgxExtendedPdfViewerModule,
    ReactiveFormsModule,
    NgSelectModule,
    UiSwitchModule,
    ColorPickerModule,
    NgxMaskDirective,
    NgxMaskPipe,
    NgxSliderModule,
    CdkStepperModule,
    NgStepperModule,
    CKEditorModule,
    AutocompleteLibModule,
    DropzoneModule,

    DataTablesModule
  ],
  providers: [DatePipe,
    {
      provide: pdfDefaultOptions,
      useValue: {
        assetsFolder: 'assets/viewer' // Ruta correcta a tus recursos
      }
    }
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PagesModule {
  constructor() {
    defineElement(lottie.loadAnimation);
  }
}
