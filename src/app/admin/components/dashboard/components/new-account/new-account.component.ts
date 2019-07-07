import { Component } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { of } from "rxjs";
import { AccountService } from "../../../../services/account.service";
import { validateUsername, validatePasswordConfirm } from "./validation";

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
    console.log(this.validateForm.value);
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
    this.validateForm
      .get("passwordConfirm")
      .setAsyncValidators(
        validatePasswordConfirm(of(this.validateForm.get('password')))
      );
  }
}
