import {
    AbstractControl,
    AsyncValidatorFn,
    ValidationErrors
} from "@angular/forms";
import {
    AccountService,
    AccountExistResponse
} from "../../../../services/account.service";
import { Observable, of } from "rxjs";
import {
  distinctUntilChanged,
  flatMap,
  takeLast,
  delay,
  map
} from "rxjs/operators";

import { AppConfig } from "~/app/_init/app-config.service";

/**
 * Validation for username
 * 
 * @param account 
 */
export function validateUsername(account: AccountService): AsyncValidatorFn {
    return (
      control: AbstractControl
    ): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> => {
      return <
        Promise<ValidationErrors | null> | Observable<ValidationErrors | null>
      >of(control.value).pipe(
        delay(AppConfig.get('userDelayDetection')),
        takeLast(1),
        distinctUntilChanged(),
        flatMap((input: string) => account.checkAccount(input)),
        map((response: AccountExistResponse) => {
          return response["success"] ? { account: true } : null;
        })
      );
    };
}

/**
 * Validation for password-confirm
 * 
 */
export function validatePasswordConfirm(password$: Observable<AbstractControl>): AsyncValidatorFn {
    return (control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> => {
        return  <
        Promise<ValidationErrors | null> | Observable<ValidationErrors | null>
      >password$.pipe(
            delay(AppConfig.get('userDelayDetection')),
            takeLast(1),
            distinctUntilChanged(),
            map((password: AbstractControl) => {
                return (password.value != control.value) ? { passwordConfirm: true } : null
            })
        );
    };
}