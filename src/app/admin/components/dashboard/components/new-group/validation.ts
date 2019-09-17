import {
  AsyncValidatorFn,
  AbstractControl,
  ValidationErrors
} from "@angular/forms";
import { Observable, of } from "rxjs";
import { map, takeLast, distinctUntilChanged, flatMap, delay } from "rxjs/operators";

export function validateDuplicateGroup(
  apifunc: Function, delayDetection = 200
): AsyncValidatorFn {
  return (
    control: AbstractControl
  ): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> => {
    return of(control.value).pipe(
      delay(delayDetection),
      takeLast(1),
      distinctUntilChanged(),
      flatMap(input => apifunc(input)),
      map((response: any) => response.success ? { group: true } : null)
    ); 
  }
}
