import { Component } from "@angular/core";
import { ViewportService } from "../../../../../shared/services/viewport.service";

@Component({
    selector: 'search-action',
    templateUrl: 'search.action.component.html',
    styleUrls: ['search.action.component.scss']
})
export class SearchActionComponent {
    constructor(public viewport: ViewportService) {}
}