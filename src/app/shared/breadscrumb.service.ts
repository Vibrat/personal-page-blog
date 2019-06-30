import { Injectable } from "@angular/core";
import { Location } from "@angular/common";
import { Router, NavigationStart } from "@angular/router";
import { Observable } from "rxjs";
import { filter, map } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class BreadScrumbService {
  private _paths: string[];
  private _path$: Observable<string[]>;

  constructor(private _location: Location, private _router: Router) {
    this.startListening();
  }

  /**
   * building observer for url change
   * 
   */
  startListening() {
    this._path$ = this._router.events.pipe(
      filter(event => event instanceof NavigationStart),
      map((event: NavigationStart) => this.updateUrl(event))
    );
  }

  /**
   * Rebuild url into array
   * 
   * @important Navigation event can take undefined
   */
  updateUrl(event: NavigationStart) {
    if (event) {
      this._paths = event.url.split("/").filter(value => value != "");
    } else {
      this._paths = this._location
        .path()
        .split("/")
        .filter(value => value != "");
    }

    this._paths.unshift("Home");
    return this._paths;
  }

  get path(): Observable<string[]> {
    return this._path$;
  }

  get fullPath(): string {
    return this._paths.join("/");
  }
}
