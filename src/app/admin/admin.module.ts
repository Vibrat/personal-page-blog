import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { FormsModule, ReactiveFormsModule  } from "@angular/forms";
import { CommonModule } from "@angular/common";

import { NgZorroAntdModule, NZ_I18N, en_US } from 'ng-zorro-antd';
import { routes } from "./admin.route";

import { DumpComponents } from "./components";
import { Pages } from "./containers";
import { PageLoginComponent } from "./containers/page-login/page-login.component";
import { GridDisplayService } from "../shared/grid-display.service";
import { AuthService } from "./services";

import { AdminActivateService } from "./admin-activate.service";
import { AdminLoginActivateService } from "./admin-login-activate.service";

import { DashboardResolverService } from "./data/dasboard.resolver";

import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';

registerLocaleData(en);

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule.forChild(routes),
        NgZorroAntdModule
    ],
    declarations: [DumpComponents, Pages],
    bootstrap: [PageLoginComponent],
    providers: [
        { provide: NZ_I18N, useValue: en_US },
        AuthService,
        AdminActivateService,
        AdminLoginActivateService,
        DashboardResolverService
    ],
})
export class AdminModule {
    constructor(public grid: GridDisplayService, public auth: AuthService) {
        this.grid.display$.subscribe(data => console.log(data));
    }
}