import { BehaviorSubject, of, Observable } from "rxjs";
import {
  filter,
  tap,
  catchError,
  distinctUntilChanged,
  flatMap,
  debounceTime
} from "rxjs/operators";

import { userDelayDetection } from "../../config";

export class DashboardApiAdapter {
  parentSubject$: BehaviorSubject<any> = new BehaviorSubject({
    observer: of(undefined),
    callback: () => {},
    error: () => {}
  });
  observerStore: Observable<any>[] = [];

  constructor() {}

  /**
   * Build new Observable
   */
  public build(key: string) {
    this.observerStore[key] = this.parentSubject$.pipe(
      debounceTime(userDelayDetection),
      distinctUntilChanged(),
      flatMap(({ observer, callback, error }) => {
        return observer.pipe(
          filter(response => {
            let isSuccess = response["success"];
            if (!isSuccess) {
              throw new Error("Failed to call API");
            }
            return isSuccess;
          }),
          tap(_ => {
            callback(_);
          }),
          catchError(_ => {
            error(_);
            return of("");
          })
        );
      })
    );

    return this.observerStore[key];
  }

  /**
   * Emit value
   *
   */
  public emit({ observer, callback, error }) {
    this.parentSubject$.next({ observer, callback, error });
  }

  /**
   * Subscribe to all Observer
   *
   */
  public subscribe() {
    for (let observer of this.observerStore) {
      observer.subscribe();
    }
  }
}
