import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { ActivatedRoute } from "@angular/router"; 

@Component({
    selector: `item-card-grid`,
    template: `
            <div nz-row class="custom-grid">
                <ng-container *ngFor="let card of cards$ | async" >
                    <item-card [card]="card" nz-col nzSpan="6"></item-card>
                </ng-container>
            </div>`,
    styleUrls: ['card.grid.component.scss']
})
export class GridCardComponent implements OnInit {
    public cards$: Observable<any>;

    constructor(private route: ActivatedRoute) {}

    ngOnInit() {
        this.cards$ = this.route.data.pipe(map(data => data['cards']));
    }
} 