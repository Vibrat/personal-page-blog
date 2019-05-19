import { Injectable } from "@angular/core";
import { CanLoad, Route, UrlSegment } from "@angular/router";
import { GridDisplayService } from "./shared/grid-display.service";

@Injectable()
export class AdminCanLoadService implements CanLoad {
    
    constructor(private grid: GridDisplayService) {}

    canLoad(route: Route, url: UrlSegment[]) {
        if (route.path == 'admin') {
            this.grid.update('category', false);
        }
        return true;
    }
}