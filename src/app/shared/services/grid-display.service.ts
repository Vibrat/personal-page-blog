import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { map } from "rxjs/operators";

@Injectable({
    providedIn: 'root'
})
export class GridDisplayService  {
    public display$: Observable<object> = of ({
        category: true
    });
  
    public update(key, value) {
        this.display$ = this.display$.pipe(
            map(data => Object.assign(data, {
                [key]: value
            })));
    }

    public getProperty(name?: string) {
        
        if (!name) {
            return this.display$;
        } 

        try {
            return this.display$.pipe(map(data => data[name]));
        } catch(error) {
            return null;
        }
        
    }
}