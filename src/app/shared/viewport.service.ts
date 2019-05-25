import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { map } from "rxjs/operators";

@Injectable({
    providedIn: 'root'
})
export class ViewportService {
    breakpoint = 768;
    width$: Observable<number>;
    height$: Observable<number>;
    
    constructor() {
        this.width$ = of(window.innerWidth);
        this.height$ = of(window.innerHeight);

        window.addEventListener('resize', (e) => {
            this.width$ = of (window.innerWidth);
            this.height$ = of (window.innerHeight);
        });
    }

    public getViewportObserver() {
        return {
            'width$': this.width$,
            'height$': this.height$
        };
    }

    public getWidth(): number {
        return window.innerWidth;
    }

    public getHeight(): number {
        return window.innerHeight;
    }

    public onLgScreenObserver() {
        return this.width$.pipe(map(width => (width >= this.breakpoint)));
    }
}