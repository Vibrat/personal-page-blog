import { NgModule } from "@angular/core";
import { SharedPipes } from "./index";

@NgModule({
    declarations: [...SharedPipes],
    exports: [...SharedPipes]
})
export class SharedPipesModule {}