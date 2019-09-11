import {
    FormControl,
    AbstractControl,
    AsyncValidatorFn,
    ValidationErrors
} from "@angular/forms";
import { Observable } from "rxjs";
import {
  distinctUntilChanged,
  takeLast,
  delay,
  map
} from "rxjs/operators";

import { userDelayDetection } from "../../../../config";

export function PasswordValidator(control: FormControl) {
    let regex = new RegExp("[\\\s]");
    if (regex.test(control.value)) {
        return { password: 'should not contain `\\` or `space`' }
    } else {
        return null;
    }
}

export function validatePasswordConfirm(password$: Observable<AbstractControl>): AsyncValidatorFn {
    return (control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> => {
        return  <
        Promise<ValidationErrors | null> | Observable<ValidationErrors | null>
      >password$.pipe(
            delay(userDelayDetection),
            takeLast(1),
            distinctUntilChanged(),
            map((password: AbstractControl) => {
                return (password.value != control.value) ? { passwordConfirm: true } : null
            })
        );
    };
}