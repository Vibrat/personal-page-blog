import { Injectable } from "@angular/core";
import { Resolve } from "@angular/router";
import { Observable } from "rxjs";
import {
  NavigationService,
  GetNavigationByTokenResponse
} from "../../../services/navigation.service";

@Injectable()
export class SideBarResolver implements Resolve<any> {
  constructor(private nav: NavigationService) {}

  resolve() {
    return <Observable<GetNavigationByTokenResponse>>(
      this.nav.getNavigationByToken()
    );
  }
}
