import {
  AsyncValidatorFn,
  AbstractControl,
  ValidationErrors
} from "@angular/forms";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

export function validateDuplicateGroup(
  api$: Observable<any>
): AsyncValidatorFn {
  return (
    control: AbstractControl
  ): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> => {
    return api$.pipe(
      map(response => {
        return response ? { group: true } : null;
      })
    );
  };
}
