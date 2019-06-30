import { NgModule, ModuleWithProviders } from "@angular/core";
import { GridDisplayService } from "./grid-display.service";
import { BreadScrumbService } from "./breadscrumb.service";
import { ViewportService } from "./viewport.service";

@NgModule({})
export class SharedModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: SharedModule,
            providers: [GridDisplayService, ViewportService, BreadScrumbService]
        }
    }
}