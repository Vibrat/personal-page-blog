import { Component, OnInit } from "@angular/core";
import { KeyValue } from "@angular/common";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { PasswordValidator } from "./validation";


export interface Input {
  username: string;
  display: boolean;
}

export type Output = boolean;

@Component({
  selector: `admin-dashboard-password`,
  templateUrl: "admin-dashboard-password.component.html",
  styleUrls: ["admin-dashboard-password.component.scss"]
})
export class AdminDashboardPasswordComponent implements OnInit {
  display: boolean;
  validateForm: FormGroup;

  submitForm(): void {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
  }

  validatorFilter(item: KeyValue<string, any>) {
    return item.value !== true
  }

  onCancel(event): boolean {
    return this.display = false; 
  }

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      username: [null],
      password: [null, [Validators.required, PasswordValidator]],
      passwordConfirm: [null, [Validators.required, PasswordValidator]]
    });
  }
}
