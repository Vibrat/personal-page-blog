import { NgModule } from "@angular/core";
import { HeaderComponent } from "./header/header.component";
import { MainComponent } from "./main/main.component";
import { FooterComponent } from "./footer/footer.component";
import { Items } from "./items";
import { NgZorroAntdModule } from "ng-zorro-antd";

@NgModule({
    imports: [NgZorroAntdModule],
    declarations: [HeaderComponent, MainComponent, FooterComponent, ...Items],
    exports: [HeaderComponent, MainComponent, FooterComponent, ...Items]
})
export class ContainersModule {} 