import { Component, OnInit } from "@angular/core";
import { GridDisplayService } from "../../shared/grid-display.service";
import { BreadScrumbService } from "../../shared/breadscrumb.service";

@Component({
    selector: 'container-main',
    templateUrl: `main.component.html`,
    styleUrls: ['main.component.scss']
})
export class MainComponent implements OnInit {

    breadscrumb: string[];

    constructor(public grid: GridDisplayService, public _breadscrumb: BreadScrumbService) {
        this._breadscrumb.path.subscribe(data => {
            this.breadscrumb = data;
        })
    }

    ngOnInit() {}
}