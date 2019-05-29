import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { HeaderComponent } from "./header/header.component";
import { MainComponent } from "./main/main.component";
import { FooterComponent } from "./footer/footer.component";
import { Items } from "./items";
import { NgZorroAntdModule } from "ng-zorro-antd";

import { routes } from "./containers.routes";
import { CanActivateBlog } from "./Blog.guard.service";
import { CanActivateCard } from "./card.guard.service";
import { ResolverCard } from "./card.resolve.service";
import { EngineModule as EventEffectModule } from "@open-e/oe-coordinator";

@NgModule({
    imports: [
        RouterModule.forChild(routes),
        NgZorroAntdModule,
        CommonModule,
        EventEffectModule
    ],
    providers: [CanActivateBlog, CanActivateCard, ResolverCard],
    declarations: [HeaderComponent, MainComponent, FooterComponent, ...Items],
    exports: [HeaderComponent, MainComponent, FooterComponent, ...Items, EventEffectModule]
})
export class ContainersModule {} 