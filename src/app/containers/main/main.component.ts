import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { GridDisplayService } from "../../shared/grid-display.service";

@Component({
    selector: 'container-main',
    templateUrl: `main.component.html`,
    styleUrls: ['main.component.scss']
})
export class MainComponent implements OnInit {

    public category$: Observable<boolean>;

    constructor(public grid: GridDisplayService) {}

    ngOnInit() {  this.category$ = this.grid.getProperty('category'); }
}