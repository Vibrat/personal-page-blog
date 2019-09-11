import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { KeyValue } from "@angular/common";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { PasswordValidator, validatePasswordConfirm } from "./validation";
import { of } from "rxjs";

export interface Credentials {
  username: string;
  "new-password": string;
}

@Component({
  selector: `admin-dashboard-password`,
  templateUrl: "admin-dashboard-password.component.html",
  styleUrls: ["admin-dashboard-password.component.scss"]
})
export class AdminDashboardPasswordComponent implements OnInit {
  validateForm: FormGroup;

  @Input() display: boolean;
  @Input() username: string;
  @Output() credentials: EventEmitter<Credentials> = new EventEmitter();

  submitForm(): void {
    if (this.validateForm.valid) {
      let output: Credentials = {
        username: this.validateForm.value["username"],
        "new-password": this.validateForm.value["password"]
      };

      this.credentials.emit(output);
    }
  }

  validatorFilter(item: KeyValue<string, any>) {
    return item.value !== true;
  }

  onCancel(event): boolean {
    return (this.display = false);
  }

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      username: [this.username],
      password: [null, [Validators.required, PasswordValidator]],
      passwordConfirm: [null, [Validators.required, PasswordValidator]]
    });
    this.validateForm
      .get("passwordConfirm")
      .setAsyncValidators(
        validatePasswordConfirm(of(this.validateForm.get("password")))
      );
  }
}
