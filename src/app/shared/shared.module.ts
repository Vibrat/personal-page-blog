import { NgModule, ModuleWithProviders } from "@angular/core";
import { GridDisplayService } from "./grid-display.service";

@NgModule({})
export class SharedModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: SharedModule,
            providers: [GridDisplayService]
        }
    }
}