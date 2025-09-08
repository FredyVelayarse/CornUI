import { NgModule, LOCALE_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';


// search module
import { NgPipesModule } from 'ngx-pipes';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { LayoutsModule } from "./layouts/layouts.module";

// Auth
import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { environment } from 'src/app/environment/environment';


// Language
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import localeEs from '@angular/common/locales/es';
import { registerLocaleData } from '@angular/common';
// Store
import { rootReducer } from './store';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { DataService } from './service/data.service';
import { UserService } from './service/user/user.service';
import { FileService } from './service/file/file.service';
import { FormatService } from './service/format/format.service';
import { ClienteService } from './service/cliente/cliente.service';
import { VarietyService } from './service/variety/variety.service';
import { CornService } from './service/corn/corn.service';
import { HuskService } from './service/husk/husk.service';
import { SeedService } from './service/seed/seed.service';
import { ImagenService } from './service/imagen/imagen.service';
import { ScriptService } from './service/script.service';
import { LogService } from './service/log.service';
import { AuthInterceptor } from './service/auth/auth.interceptor';
import { LocalitationService } from './service/localitation/localitation.service';




export function createTranslateLoader(http: HttpClient): any {
  return new TranslateHttpLoader(http, 'assets/i18n/', '.json');
}

registerLocaleData(localeEs, 'es');

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    TranslateModule.forRoot({
      defaultLanguage: 'en',
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    }),
    BrowserAnimationsModule,
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    LayoutsModule,
    StoreModule.forRoot(rootReducer),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      logOnly: environment.production, // Restrict extension to log-only mode
    }),
    EffectsModule.forRoot([]),

    NgPipesModule,
    
  ],
  providers: [
    DataService,
    UserService,
    ClienteService,
    VarietyService,
    CornService,
    HuskService,
    SeedService,
    ImagenService,
    FileService,
    FormatService,
    ScriptService,
    LocalitationService,
    LogService, {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    { provide: LOCALE_ID, useValue: 'es' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
