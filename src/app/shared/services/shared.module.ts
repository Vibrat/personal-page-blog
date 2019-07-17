import { NgModule, ModuleWithProviders } from "@angular/core";
import { SingletonServices } from "./";
 
@NgModule()
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [
       ...SingletonServices
      ]
    };
  }
}
