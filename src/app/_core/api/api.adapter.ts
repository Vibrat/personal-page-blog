import { BehaviorSubject, of, Observable } from "rxjs";
import {
  tap,
  map,
  catchError,
  distinctUntilChanged,
  flatMap,
  debounceTime
} from "rxjs/operators";

export interface AdapterSubject {
  observer: Observable<any>;
  callback: (response: AdapterResponse | AdapterResponses) => unknown;
  error: (response: any) => unknown;
}

export interface AdapterResponses {
  success: AdapterResponse[];
  failure: AdapterResponse[];
}

export interface AdapterResponse {
  success: boolean;
  message?: string;
  [key: string]: any;
}

export class ApiAdapter {
  parentSubject$: BehaviorSubject<AdapterSubject> = new BehaviorSubject({
    observer: of(undefined),
    callback: () => {},
    error: () => {}
  });
  observerStore: Observable<any>[] = [];

  constructor() {}


  /**
   * Build a Engine for processing events
   *
   * @param string key identifiers
   * @param neverThrowError choose how to handle Error
   *  - true => will never throw errors, instead push in into response
   *  - false => throw errors and stop current chains
   */
  public build(
    key: string,
    neverThrowError: boolean = false,
    options = {
      userDelayDetection: 0
    }
  ) {
    this.observerStore[key] = this.parentSubject$.pipe(
      debounceTime(options.userDelayDetection),
      distinctUntilChanged(),
      flatMap(({ observer, callback, error }) => {
        return observer.pipe(
          map((response: any) => {
            let isNotChain = response.constructor !== Array;
            let apiLoop = [];
            let apiResponses = {
              success: [],
              failure: []
            };

            // Format data to be processed in array
            if (isNotChain) {
              apiLoop.push(response);
            } else {
              apiLoop = response;
            }

            // Validate values
            for (let data of apiLoop) {
              let isSuccess = data["success"];
              apiResponses[isSuccess ? "success" : "failure"].push(data);

              if (!isSuccess && !neverThrowError) {
                throw new Error("Failed to call API");
              }
            }

            // Return values
            return isNotChain ? response : apiResponses;
          }),
          tap((response: AdapterResponse | AdapterResponses) => {
            callback(response);
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
  public emit({ observer, callback, error }: AdapterSubject) {
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
