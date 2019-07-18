import { NgModule, APP_INITIALIZER } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { NgZorroAntdModule, NZ_I18N, en_US } from 'ng-zorro-antd';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';

import { SharedPipesModule } from "./shared/pipes/shared-pipes.module";
import { SharedModule } from "./shared/services/shared.module";
import { ContainersModule } from "./containers/containers.module";
import { AdminCanLoadService } from "./admin-canload.service";
import { EngineModule as EventEffectModule } from "@open-e/oe-coordinator";

// AppConfig 
import { AppConfig, configReducer } from "./_init/app-config.service";

registerLocaleData(en);

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgZorroAntdModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ContainersModule,
    SharedPipesModule,
    SharedModule,
    EventEffectModule
  ],
  providers: [
    { provide: NZ_I18N, useValue: en_US },
    AdminCanLoadService,
    AppConfig,
    {
      provide: APP_INITIALIZER,
      useFactory: configReducer,
      deps: [AppConfig],
      multi: true
    }
  ],
  exports: [EventEffectModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
