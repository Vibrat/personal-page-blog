import { Component } from "@angular/core";
import {
  FormGroup,
  FormBuilder,
  Validators,
  AbstractControl,
  AsyncValidatorFn,
  ValidationErrors
} from "@angular/forms";
import {
  AccountService,
  AccountExistResponse
} from "../../../../services/account.service";
import { Observable, of, timer } from "rxjs";
import {
  distinctUntilChanged,
  flatMap,
  takeLast,
  delay,
  map
} from "rxjs/operators";

import { userDelayDetection } from "../../../../config";

export function validateUsername(account: AccountService): AsyncValidatorFn {
  return (
    control: AbstractControl
  ): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> => {
    return <
      Promise<ValidationErrors | null> | Observable<ValidationErrors | null>
    >of(control.value).pipe(
      delay(userDelayDetection),
      takeLast(1),
      distinctUntilChanged(),
      flatMap((input: string) => account.checkAccount(input)),
      map((response: AccountExistResponse) => {
        return response["success"] ? { account: true } : null;
      })
    );
  };
}

@Component({
  selector: "admin-dashboard-new-account",
  templateUrl: "new-account.component.html",
  styleUrls: ["new-account.component.scss"]
})
export class NewAccountComponent {
  display: boolean;
  validateForm: FormGroup;

  constructor(private fb: FormBuilder, private _account: AccountService) {}

  submitForm(): void {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
  }

  onClick(): boolean {
    return (this.display = false);
  }

  genderChange(value: string): void {
    this.validateForm
      .get("note")!
      .setValue(value === "male" ? "Hi, man!" : "Hi, lady!");
  }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      username: [
        null,
        [Validators.required],
        [validateUsername(this._account)]
      ],
      password: [null, [Validators.required]],
      passwordConfirm: [null, [Validators.required]]
    });
  }
}
